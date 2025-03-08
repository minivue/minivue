import { parse, print, type SpreadElement, type Property } from '@swc/core'

type AstProp = SpreadElement | Property

const MINIVUE_PACKAGE_NAME = '@minivue/core'

/**
 * 检查是否有组件引用
 * @param property ast属性
 * @param importedComponents 导入的组件map
 * @param innerFunctions 内部函数名称列表
 * @returns 是否有组件引用
 */
function checkHasComponentReferences(
  property: AstProp,
  importedComponents: Map<string, string>,
  innerFunctions: string[] = [],
) {
  if (
    property.type === 'KeyValueProperty' &&
    property.value.type === 'Identifier' &&
    (importedComponents.has(property.value.value) || innerFunctions.includes(property.value.value))
  ) {
    return false
  } else if (
    property.type === 'Identifier' &&
    (importedComponents.has(property.value) || innerFunctions.includes(property.value))
  ) {
    return false
  }
  return true
}

/**
 * 删除组件的引用代码和非事件函数的导出（非事件函数不需要return）
 * @param properties ast属性列表
 * @param importedComponentMap 导入的组件map
 * @param eventNames 事件名称数组
 */
function removeComponentReferences(
  properties: AstProp[],
  importedComponentMap: Map<string, string>,
  eventNames: string[] = [],
) {
  const innerFunctions: string[] = [] // 内部函数名称列表，用于从return中删除
  properties = properties.filter((property) => {
    // 删除emits
    if (
      property.type === 'KeyValueProperty' &&
      property.key.type === 'Identifier' &&
      property.key.value === 'emits'
    ) {
      return false
    }
    if (
      property.type === 'KeyValueProperty' &&
      property.key.type === 'Identifier' &&
      property.key.value === 'components' &&
      property.value.type === 'ObjectExpression'
    ) {
      // 删除 components 中的组件
      // 例如:
      // components: {
      //   Button,
      // }
      property.value.properties = property.value.properties.filter((property) =>
        checkHasComponentReferences(property, importedComponentMap),
      )
    } else if (
      property.type === 'MethodProperty' &&
      property.key.type === 'Identifier' &&
      property.key.value === 'setup' &&
      property.body
    ) {
      // 删除 setup 函数参数中的expose: __expose的调用（因为在编译setup时会自动注入，小程序不需要）
      property.params.forEach((param) => {
        if (param.type === 'Parameter' && param.pat.type === 'ObjectPattern') {
          param.pat.properties = param.pat.properties.filter((property) => {
            if (
              property.type === 'KeyValuePatternProperty' &&
              property.key.type === 'Identifier' &&
              property.key.value === 'expose'
            ) {
              return false
            }
            return true
          })
        }
      })
      property.body.stmts = property.body.stmts.filter((stmt) => {
        // 找出内部函数的定义
        if (stmt.type === 'VariableDeclaration') {
          stmt.declarations.forEach((declaration) => {
            if (
              declaration.type === 'VariableDeclarator' &&
              declaration.id.type === 'Identifier' &&
              (declaration.init?.type === 'ArrowFunctionExpression' ||
                declaration.init?.type === 'FunctionExpression')
            ) {
              if (!eventNames.includes(declaration.id.value)) {
                innerFunctions.push(declaration.id.value)
              }
            }
          })
        }
        if (stmt.type === 'FunctionDeclaration') {
          if (!eventNames.includes(stmt.identifier.value)) {
            innerFunctions.push(stmt.identifier.value)
          }
        }

        // 删除 setup 函数中的 __expose() 调用（因为在编译setup时会自动注入，小程序不需要）
        if (
          stmt.type === 'ExpressionStatement' &&
          stmt.expression.type == 'CallExpression' &&
          stmt.expression.callee.type === 'Identifier' &&
          stmt.expression.callee.value === '__expose'
        ) {
          return false
        }
        // 删除 __isScriptSetup 的定义（因为在编译setup时会自动注入，小程序不需要）
        if (
          stmt.type === 'ExpressionStatement' &&
          stmt.expression.type == 'CallExpression' &&
          stmt.expression.arguments.some(
            (item) =>
              item.expression.type === 'StringLiteral' &&
              item.expression.value === '__isScriptSetup',
          )
        ) {
          return false
        }
        if (stmt.type === 'VariableDeclaration') {
          // 删除组件的引用
          stmt.declarations.forEach((declaration) => {
            if (
              declaration.type === 'VariableDeclarator' &&
              declaration.init &&
              declaration.init.type === 'ObjectExpression'
            ) {
              declaration.init.properties = declaration.init.properties.filter((property) =>
                checkHasComponentReferences(property, importedComponentMap, innerFunctions),
              )
            }
          })
        } else if (stmt.type === 'ReturnStatement' && stmt.argument) {
          if (stmt.argument.type === 'ObjectExpression') {
            // 删除 setup 返回对象中的组件应用
            // 例如: return { Button }
            stmt.argument.properties = stmt.argument.properties.filter((property) =>
              checkHasComponentReferences(property, importedComponentMap, innerFunctions),
            )
          }
        }
        return true
      })
    }
    return true
  })
  return properties
}

/**
 * 删除组件的导入和引用,并且进行一些代码删除和替换
 * @param source 源代码
 * @param componentLibs 组件库列表(例如: ['vant'])
 * @param eventNames 事件名称列表
 * @returns
 */
export async function transformCode(
  type: 'App' | 'Component' | 'Page',
  source: string,
  componentLibs: string[] = [],
  eventNames: string[] = [],
) {
  // 解析代码为 AST
  const ast = await parse(source, { syntax: 'typescript' })

  // 收集导入的组件名称
  const importedComponents = new Set<string>()

  // 导入的组件名称和路径的映射
  const importedComponentMap = new Map<string, string>()

  // 第一步：删除 import 语句并收集导入的组件名称
  ast.body = ast.body.filter((node) => {
    // 处理导入的 Vue 组件
    if (node.type === 'ImportDeclaration') {
      const path = node.source.value
      // 处理 defineComponent 为 '@minivue/core' 对应的方法
      node.specifiers.forEach((specifier) => {
        if (
          specifier.type === 'ImportSpecifier' &&
          specifier.imported?.value === 'defineComponent'
        ) {
          specifier.imported.value = `define${type}`
        }
      })
      // 如果是 Vue 组件或者在组件库中
      if (path.endsWith('.vue') || componentLibs.includes(path)) {
        // const name = basename(path, '.vue')
        // const componentPath = `${path.replace('@', '').replace(/\.vue$/, '')}/${name}`

        // 提取导入的组件名称
        node.specifiers.forEach((specifier) => {
          const key = specifier.local.value
          importedComponentMap.set(key, path)
          importedComponents.add(key)
        })
        return false // 从源码中删除
      } else if (node.source.value === 'vue') {
        // vue 换成@minivue/core
        node.source.value = MINIVUE_PACKAGE_NAME
        node.source.raw = `'${MINIVUE_PACKAGE_NAME}'`
      }
    }
    return true // 保留其他节点
  })

  // 第二步：删除组件的引用代码
  ast.body.forEach((node) => {
    if (node.type === 'ExportDefaultExpression') {
      if (node.expression.type === 'ObjectExpression') {
        node.expression.properties = removeComponentReferences(
          node.expression.properties,
          importedComponentMap,
        )
      } else if (node.expression.type === 'CallExpression') {
        node.expression.arguments.forEach((argument) => {
          if (argument.expression.type === 'ObjectExpression') {
            argument.expression.properties = removeComponentReferences(
              argument.expression.properties,
              importedComponentMap,
              eventNames,
            )
          }
        })
      }
    }
  })

  const exportDefaultExpression = ast.body.find((node) => node.type === 'ExportDefaultExpression')
  if (exportDefaultExpression) {
    // @ts-ignore
    exportDefaultExpression.type = 'ExpressionStatement' // 删除 export default
  }

  // 将修改后的 AST 转换回代码
  const { code } = await print(ast)
  return {
    code,
    importedComponentMap,
  }
}
