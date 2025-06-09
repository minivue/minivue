import os from 'os'
import crypto from 'crypto'
import {
  transform,
  parse,
  print,
  ExpressionStatement,
  VariableDeclaration,
  AssignmentPatternProperty,
} from '@swc/core'
import { existsSync, createReadStream } from 'fs'
import { createInterface } from 'readline'
import { dirname, join, resolve, relative } from 'path'
import { writeFile as _writeFile, mkdir, readFile } from 'fs/promises'
import { CompilerOptions } from 'typescript'

interface Component {
  libraryName: string
  prefix?: string
}

interface PackageJson {
  components?: Component[]
}

/**
 * 从给定的字符串生成一个8字符的MD5哈希值。
 *
 * @param str - 要哈希的输入字符串。
 * @returns 输入字符串的MD5哈希值的前8个字符。
 */
export function hash(str: string) {
  return crypto.createHash('md5').update(str).digest('hex').slice(0, 8)
}

/**
 * 将内容写入文件。
 *
 * @param fileOutputDir - 要写入的文件路径。
 * @param content - 要写入的内容。
 */
export async function writeFile(fileOutputDir: string, content: string) {
  const dirPath = dirname(fileOutputDir)
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true })
  }
  await _writeFile(fileOutputDir, content)
}

/**
 * 将驼峰命名转换为短横线命名。
 * @param str 要转换的字符串。
 * @returns 转换后的字符串。
 */
export function camelToDash(str: string) {
  return str
    .replace(/[A-Z]/g, function (match) {
      return '-' + match.toLowerCase()
    })
    .replace(/^-/, '')
}

function setDefaultScript(content: string) {
  content += `<script lang="ts">${os.EOL}`
  content += `import { defineComponent as _defineComponent } from '@minivue/core'${os.EOL}`
  content += `_defineComponent({})${os.EOL}`
  content += `</script>${os.EOL}`
  return content
}

async function convertESMtoCommonJS(code: string) {
  const ast = await parse(code)
  let module = ''
  ast.body = ast.body.map((node) => {
    if (node.type === 'ExportDeclaration') {
      const declaration = node.declaration
      if (declaration.type === 'VariableDeclaration') {
        const declarator = declaration.declarations[0]
        const init = declarator.init
        if (declarator.id.type === 'Identifier') {
          module = declarator.id.value
        }
        if (init) {
          return {
            type: 'ExpressionStatement',
            span: { start: 0, end: 0, ctxt: 0 },
            expression: {
              type: 'AssignmentExpression',
              span: { start: 0, end: 0, ctxt: 0 },
              operator: '=',
              left: {
                type: 'MemberExpression',
                span: { start: 0, end: 0, ctxt: 0 },
                object: {
                  type: 'Identifier',
                  span: { start: 0, end: 0, ctxt: 0 },
                  ctxt: 1,
                  value: 'module',
                  optional: false,
                },
                property: {
                  type: 'Identifier',
                  value: 'exports',
                  span: { start: 0, end: 0, ctxt: 0 },
                  optional: false,
                },
              },
              right: init,
            },
          } as ExpressionStatement
        }
      }
    } else if (node.type === 'ImportDeclaration') {
      const source = node.source
      const { value } = source
      source.value = `${value}.wxs`
      source.raw = `'${value}.wxs'`
      // 默认导入
      if (node.specifiers.length === 1 && node.specifiers[0].type === 'ImportDefaultSpecifier') {
        return {
          type: 'VariableDeclaration',
          span: {
            start: 0,
            end: 0,
          },
          ctxt: 0,
          kind: 'var',
          declare: false,
          declarations: [
            {
              type: 'VariableDeclarator',
              span: {
                start: 0,
                end: 0,
              },
              id: node.specifiers[0].local,
              init: {
                type: 'CallExpression',
                span: {
                  start: 0,
                  end: 0,
                  ctxt: 0,
                },
                // @ts-ignore
                ctxt: 0,
                callee: {
                  type: 'Identifier',
                  span: {
                    start: 0,
                    end: 0,
                  },
                  ctxt: 1,
                  value: 'require',
                  optional: false,
                },
                arguments: [{ spread: null, expression: source }],
              },
              definite: false,
            },
          ],
        } as VariableDeclaration
      }
      // 命名导入
      else if (node.specifiers.some((s) => s.type === 'ImportSpecifier')) {
        const properties = node.specifiers.map<AssignmentPatternProperty>((specifier) => ({
          type: 'AssignmentPatternProperty',
          span: {
            start: 0,
            end: 0,
            ctxt: 0,
          },
          key: specifier.local,
          value: undefined,
        }))

        return {
          type: 'VariableDeclaration',
          span: {
            start: 0,
            end: 0,
          },
          ctxt: 0,
          kind: 'var',
          declare: false,
          declarations: [
            {
              type: 'VariableDeclarator',
              span: {
                start: 0,
                end: 0,
              },
              id: {
                type: 'ObjectPattern',
                span: {
                  start: 0,
                  end: 0,
                  ctxt: 0,
                },
                properties,
                optional: false,
              },
              init: {
                type: 'CallExpression',
                span: {
                  start: 0,
                  end: 0,
                  ctxt: 0,
                },
                // @ts-ignore
                ctxt: 0,
                callee: {
                  type: 'Identifier',
                  span: {
                    start: 0,
                    end: 0,
                    ctxt: 0,
                  },
                  ctxt: 0,
                  value: 'require',
                  optional: false,
                },
                arguments: [{ spread: null, expression: source }],
                typeArguments: null,
              },
              definite: false,
            },
          ],
        } as VariableDeclaration
      }
      // 命名空间导入
      else if (
        node.specifiers.length === 1 &&
        node.specifiers[0].type === 'ImportNamespaceSpecifier'
      ) {
        return {
          type: 'VariableDeclaration',
          span: {
            start: 0,
            end: 0,
          },
          ctxt: 0,
          kind: 'var',
          declare: false,
          declarations: [
            {
              type: 'VariableDeclarator',
              span: {
                start: 0,
                end: 0,
              },
              id: node.specifiers[0].local,
              init: {
                type: 'CallExpression',
                span: {
                  start: 0,
                  end: 0,
                  ctxt: 0,
                },
                // @ts-ignore
                ctxt: 0,
                callee: {
                  type: 'Identifier',
                  span: {
                    start: 0,
                    end: 0,
                  },
                  ctxt: 0,
                  value: 'require',
                  optional: false,
                },
                arguments: [{ spread: null, expression: source }],
              },
              definite: false,
            },
          ],
        } as VariableDeclaration
      }
    }
    return node
  })
  const output = await print(ast, { minify: true })
  if (module) {
    return `<wxs module="${module}">${output.code}</wxs>`
  }
  return ''
}

async function transformToWxs(code: string) {
  if (!code) {
    return ''
  }
  const result = await transform(code, {
    jsc: {
      parser: {
        syntax: 'typescript',
      },
      target: 'es5',
      minify: {
        compress: true,
        mangle: false,
      },
    },
  })
  return convertESMtoCommonJS(result.code)
}

export async function parseFile(filePath: string) {
  const fileStream = createReadStream(filePath, { encoding: 'utf-8' })
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })
  let content = ''
  let isWxs = false
  let hasScript = false
  let wxsSource = ''
  for await (const line of rl) {
    const isScriptStart = line.startsWith('<script')
    const isScriptEnd = line.startsWith('</script>')
    const isWxsStart = isScriptStart && line.includes('type="wxs"')
    const isEmptySetupScript = line === '<script setup lang="ts"></script>'
    if (isEmptySetupScript) {
      hasScript = true
      content = setDefaultScript(content)
      continue
    }
    if (isScriptEnd) {
      isWxs = false
    }
    if (isWxs || isWxsStart) {
      if (isWxs) {
        wxsSource += `${line}${os.EOL}`
      }
      isWxs = true
      continue
    }
    hasScript = hasScript || isScriptStart
    content += `${line}${os.EOL}`
  }

  if (!hasScript) {
    content = setDefaultScript(content)
  }

  // <script type="wxs" lang="ts">
  // function onScroll(e: any) {
  //   console.log(e)
  // }

  // export const _ = {
  //   onScroll,
  // }
  // </script>
  const wxs = await transformToWxs(wxsSource)

  rl.close()
  fileStream.close()
  return {
    content,
    wxs,
  }
}

async function getProjectPackageJson() {
  const packageJsonPath = join(process.cwd(), 'package.json')
  const content = await readFile(packageJsonPath, 'utf-8')
  return JSON.parse(content) as PackageJson
}

export async function getComponents() {
  const packageJson = await getProjectPackageJson()
  return packageJson.components || []
}

export async function getCompilerOptions(): Promise<CompilerOptions | undefined> {
  const path = join(process.cwd(), 'tsconfig.json')
  const content = await readFile(path, 'utf-8')
  if (content) {
    const tsConfig = JSON.parse(content)
    return tsConfig.compilerOptions
  }
}

/**
 * 解析 TypeScript paths 配置的模块路径
 * @param {string} importPath - 导入的模块路径（例如 "@utils/helpers"）
 * @param {string} baseUrl - tsconfig.json 中的 baseUrl（例如 "./src"）
 * @param {Record<string, string[]>} paths - tsconfig.json 中的 paths 配置（例如 {"@utils/*": ["utils/*"]})
 * @returns {string[]} - 解析后的可能物理路径数组
 */
export function resolveTsConfigPaths(
  importPath: string,
  baseUrl = '',
  paths: Record<string, string[]> = {},
): string[] {
  // 规范化 baseUrl，确保以 "/" 结尾
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '') + '/'
  // 遍历 paths 配置，寻找匹配的模式
  for (const [pattern, targetPaths] of Object.entries(paths)) {
    // 将模式中的 "*" 替换为正则表达式中的匹配组
    const regexPattern = new RegExp('^' + pattern.replace('*', '(.*)') + '$')
    const match = importPath.match(regexPattern)

    if (match) {
      // 提取通配符部分（例如 "helpers"）
      const wildcardPart = match[1]
      // 对每个目标路径进行解析
      const resolvedPaths = targetPaths.map((targetPath) => {
        // 将目标路径中的 "*" 替换为通配符部分
        const resolvedPath = targetPath.replace('*', wildcardPart)
        const fullPath = resolve(normalizedBaseUrl, resolvedPath)
        // 拼接 baseUrl 和目标路径
        return '/' + relative(process.cwd(), fullPath)
      })

      return resolvedPaths
    }
  }

  // 如果没有匹配的模式，返回原始路径（相对于 baseUrl）
  return [normalizedBaseUrl + importPath]
}
