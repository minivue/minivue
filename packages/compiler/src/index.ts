import { existsSync, mkdirSync, promises, writeFileSync } from "fs";
import { dirname, basename, relative, join } from "path";
import { parse as swcParse, print as swcPrint, type SpreadElement, type Property } from "@swc/core";
import type { Plugin } from "esbuild";
import { parse, compileScript } from "@vue/compiler-sfc";
import { type AttributeNode, type DirectiveNode, type TemplateChildNode, NodeTypes } from "@vue/compiler-core";
import crypto from "crypto";

type AstProp = SpreadElement | Property

// 标签映射
const tagMap: Record<string, string> = {
  div: "view",
  span: "text",
  p: "text",
  h1: "view",
  h2: "view",
  h3: "view",
  h4: "view",
  h5: "view",
  h6: "view",
  ul: "view",
  li: "view",
  template: "block",
};

function hash(str: string) {
  return crypto.createHash('md5').update(str).digest('hex').slice(0, 8)
}


// 处理标签转换
function transformTag(tag: string): string {
  return tagMap[tag] || tag;
}

// 解析 v-for 表达式
function parseVFor(expression: string) {
  const match = expression.match(/^\(?(.+?)(?:,\s*(.+?))?\)?\s+in\s+(.+)$/);
  if (match) {
    const [, item, index, list] = match;
    return { item, index: index || "index", list };
  }
  return null;
}

// 检查是否有组件引用
function checkHasComponentReferences(property: AstProp, importedComponents: Map<string, string>) {
  if (property.type === 'KeyValueProperty' && property.value.type === 'Identifier' && importedComponents.has(property.value.value)) {
    return false
  } else if (property.type === 'Identifier' && importedComponents.has(property.value)) {
    return false
  }
  return true
}

// 处理属性转换
function transformAttributes(attrs: (AttributeNode | DirectiveNode)[]): string {
  const newAttrs: Record<string, string> = {};
  attrs.forEach((attr) => {
    if (attr.type === NodeTypes.ATTRIBUTE) {
      const key = attr.name;
      const value = attr.value?.content || "";
      newAttrs[key] = value;
    } else {
      const exp = attr.exp;
      const key = attr.rawName || "";
      if (exp) {
        if (exp.type === NodeTypes.SIMPLE_EXPRESSION) {
          const value = exp.content;
          if (key === ":key") {
            // 处理 :key 转换为 wx:key
            newAttrs["wx:key"] = value.split(".").pop() || "";
          } else if (key.startsWith(":")) {
            // 数据绑定 (:属性)
            newAttrs[key.slice(1)] = `{{${value}}}`;
          } else if (key.startsWith("@")) {
            const eventName = key.slice(1).replace("click", "tap"); // 移除 @
            newAttrs[`bind:${eventName}`] = value;
          } else if (key === "v-for") {
            const vForData = parseVFor(value);
            if (vForData) {
              newAttrs["wx:for"] = `{{${vForData.list}}}`;
              newAttrs["wx:for-item"] = vForData.item;
              newAttrs["wx:for-index"] = vForData.index;
            }
          } else if (key === "v-if") {
            newAttrs["wx:if"] = `{{${value}}}`;
          } else if (key === "v-else-if") {
            newAttrs["wx:elif"] = `{{${value}}}`;
          } else {
            newAttrs[key] = value;
          }
        } else {
          console.log("UNKNOWN:", attr);
        }
      } else if (key === "v-else") {
        newAttrs["wx:else"] = "";
      } else {
        console.log("UNKNOWN:", attr);
      }
    }
  });
  return Object.entries(newAttrs)
    .map(([key, value]) => (value ? `${key}="${value}"` : key))
    .join(" ");
}

// vue的模板转换为wxml
function templateToWxml(nodes: TemplateChildNode[]): string {
  let result = "";
  nodes.forEach((node) => {
    const type = node.type;
    if (type === NodeTypes.ELEMENT) {
      // 表示 HTML 元素节点
      const tag = transformTag(node.tag);
      const attrs = transformAttributes(node.props);
      result += `<${tag} ${attrs}>`;
      result += templateToWxml(node.children);
      result += `</${tag}>`;
    } else if (
      type === NodeTypes.INTERPOLATION ||
      type === NodeTypes.COMPOUND_EXPRESSION
    ) {
      // 表示插值表达式（动态数据绑定）
      result += node.loc.source;
    } else if (type === NodeTypes.TEXT) {
      // 表示纯文本节点
      result += node.content;
    } else if (type === NodeTypes.COMMENT) {
      // 表示注释节点
      // result += `<!--${node.content}-->`
    } else {
      console.log("UNKNOWN:", node);
    }
  });
  return result;
}

// 删除组件的导入和引用
async function removeComponentImportsAndReferences(source: string, componentLibs: string[] = []) {
  // 解析代码为 AST
  const ast = await swcParse(source, { syntax: 'typescript' })

  // 收集导入的组件名称
  const importedComponents = new Set<string>()

  const importedComponentMap = new Map<string, string>()

  // 删除组件的引用代码
  const removeComponentReferences = (properties: AstProp[]) => {
    properties.forEach((property) => {
      if (property.type === 'KeyValueProperty' &&
        property.key.type === 'Identifier' &&
        property.key.value === 'components' &&
        property.value.type === 'ObjectExpression') {

        // 删除 components 中的组件
        property.value.properties = property.value.properties.filter(property => checkHasComponentReferences(property, importedComponentMap))
      } else if (property.type === 'MethodProperty' &&
        property.key.type === 'Identifier' &&
        property.key.value === 'setup' &&
        property.body
      ) {
        // 删除 setup 函数参数中的expose: __expose的调用
        property.params.forEach((param) => {
          if (param.type === 'Parameter' && param.pat.type === 'ObjectPattern') {
            param.pat.properties = param.pat.properties.filter((property) => {
              if (property.type === 'KeyValuePatternProperty' && property.key.type === 'Identifier' && property.key.value === 'expose') {
                return false
              }
              return true
            })
          }
        })
        property.body.stmts = property.body.stmts.filter((stmt) => {
          // 删除 setup 函数中的 __expose() 调用
          if (stmt.type === 'ExpressionStatement' &&
            stmt.expression.type == 'CallExpression' &&
            stmt.expression.callee.type === 'Identifier' &&
            stmt.expression.callee.value === '__expose'
          ) {
            return false
          }
          // 删除 __isScriptSetup 的定义
          if (stmt.type === 'ExpressionStatement' &&
            stmt.expression.type == 'CallExpression' &&
            stmt.expression.arguments.some(item => item.expression.type === 'StringLiteral' && item.expression.value === '__isScriptSetup')
          ) {
            return false
          }
          if (stmt.type === 'VariableDeclaration') {
            // 删除组件的引用
            stmt.declarations.forEach((declaration) => {
              if (declaration.type === 'VariableDeclarator' &&
                declaration.init &&
                declaration.init.type === 'ObjectExpression'
              ) {
                declaration.init.properties = declaration.init.properties.filter(property => checkHasComponentReferences(property, importedComponentMap))
              }
            })
          } else if (stmt.type === 'ReturnStatement' && stmt.argument) {
            if (stmt.argument.type === 'ObjectExpression') {
              // 删除 setup 返回对象中的组件
              stmt.argument.properties = stmt.argument.properties.filter(property => checkHasComponentReferences(property, importedComponentMap))
            }
          }
          return true
        })
      }
    })
  }

  // 第一步：删除 import 语句并收集导入的组件名称
  ast.body = ast.body.filter(node => {
    // 检查是否导入 Vue 组件
    if (node.type === 'ImportDeclaration') {
      const path = node.source.value
      if (path.endsWith('.vue') || componentLibs.includes(path)) {
        const name = basename(path, '.vue')
        const componentPath = `${path.replace('@', '').replace(/\.vue$/, '')}/${name}`
        // 提取导入的组件名称
        node.specifiers.forEach(specifier => {
          const key = specifier.local.value
          importedComponentMap.set(key, componentPath)
          importedComponents.add(key)
        })
        return false // 从源码中删除
      } else if (node.source.value === 'vue') {
        // 待优化
        node.source.value = '@minivue/core'
        node.source.raw = `'@minivue/core'`
      }
    }
    return true // 保留其他节点
  })

  // 第二步：删除组件的引用代码
  ast.body.forEach(node => {
    if (node.type === 'ExportDefaultExpression') {
      if (node.expression.type === 'ObjectExpression') {
        removeComponentReferences(node.expression.properties)
      } else if (node.expression.type === 'CallExpression') {
        node.expression.arguments.forEach(argument => {
          if (argument.expression.type === 'ObjectExpression') {
            removeComponentReferences(argument.expression.properties)
          }
        })
      }
    }
  })

  // 将修改后的 AST 转换回代码
  const { code } = await swcPrint(ast)
  return {
    code,
    importedComponentMap
  }
}

// vue转换小程序插件
export default function plugin(): Plugin {
  const cache = new Map<string, string>();
  return {
    name: "vue",
    setup(build) {
      build.initialOptions.charset = "utf8";
      build.onLoad({ filter: /[^/]\.vue$/ }, async ({ path }) => {
        const source = await promises.readFile(path, "utf8");
        const fileName = basename(path, ".vue");
        const isApp = fileName === "app";
        const fileOutputDir = join(
          "dist",
          dirname(relative("", path)),
          isApp ? "" : fileName
        );
        const { descriptor } = parse(source);
        const { template, styles, script, scriptSetup, customBlocks } =
          descriptor;
        const cacheStyleKey = `${path}?style`;
        const cacheConfigKey = `${path}?config`;
        const cacheTemplateKey = `${path}?template`;
        const cacheStyle = cache.get(cacheStyleKey);
        const cacheConfig = cache.get(cacheConfigKey);
        const cacheTemplate = cache.get(cacheTemplateKey);

        // 创建目录
        if (!existsSync(fileOutputDir)) {
          mkdirSync(fileOutputDir, { recursive: true });
        }

        if (template && !isApp) {
          const templateContent = template.ast
            ? templateToWxml(template.ast.children)
            : ""; // template.content
          if (cacheTemplate !== templateContent) {
            writeFileSync(
              join(fileOutputDir, `${fileName}.wxml`),
              templateContent
            );
            cache.set(cacheTemplateKey, templateContent);
          }
        }

        if (styles.length > 0) {
          const cssCode = styles.reduce(
            (str, { content }) => str + content,
            ""
          );
          if (cacheStyle !== cssCode) {
            writeFileSync(join(fileOutputDir, `${fileName}.wxss`), cssCode);
            cache.set(cacheStyleKey, cssCode);
          }
        }

        const id = hash(path) // 生成唯一 ID
        let scriptContent = (script || scriptSetup)?.content || "";
        if (scriptContent) {
          const result = compileScript(descriptor, { id, isProd: true, sourceMap: false, hoistStatic: false });
          scriptContent = result.content
        }
        const { code, importedComponentMap } = await removeComponentImportsAndReferences(scriptContent);

        let isComponent = false;
        customBlocks.forEach(({ type, content }) => {
          const json = JSON.parse(content)
          isComponent = !!json.component
          const usingComponents: Record<string, string> = {}
          for (const [key, value] of importedComponentMap) {
            usingComponents[key] = value
          }
          json.usingComponents = usingComponents

          content = JSON.stringify(json, null, 2)

          if (type === "config" && cacheConfig !== content) {
            writeFileSync(join(fileOutputDir, `${fileName}.json`), content);
            cache.set(cacheConfigKey, content);
          }
        });

        // 代码转换
        let contents = code.replace("export default ", "")

        if (!isComponent) {
          contents = contents.replace("defineComponent", "definePage")
        }
   
        return {
          contents,
          loader: "ts",
        };
      });
    },
  };
}