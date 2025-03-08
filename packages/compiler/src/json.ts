import { SFCBlock } from '@vue/compiler-sfc'
import { camelToDash, writeFile, resolveTsConfigPaths } from './utils'
import { join, basename } from 'path'
import { CompilerOptions } from 'typescript'

// 缓存上一次生成的内容，以便在下一次写入文件时检查是否需要更新
const cache = new Map<string, string>()

/**
 * 将 配置块 写入json文件。
 *
 * @param customBlocks - 自定义块列表。
 * @param fileOutputDir - 文件输出目录。
 * @param fileName - 文件名。
 * @param importedComponentMap - 导入的组件映射。
 */
export function writeJson(
  customBlocks: SFCBlock[],
  fileOutputDir: string,
  fileName: string,
  importedComponentMap: Map<string, string>,
  compilerOptions?: CompilerOptions,
) {
  // console.log(compilerOptions)
  const jsonBlock = customBlocks.find(({ type }) => type === 'config')
  const cacheConfig = cache.get(fileOutputDir)
  const { content = '{}' } = jsonBlock || {}
  if (cacheConfig === content) {
    return
  }
  const json = JSON.parse(content)
  const usingComponents: Record<string, string> = {}
  for (const [key, value] of importedComponentMap) {
    if (compilerOptions) {
      const [path] = resolveTsConfigPaths(value, compilerOptions.baseUrl, compilerOptions.paths)
      const name = basename(path, '.vue')
      usingComponents[camelToDash(key)] = `${path.replace(/\.vue$/, '')}/${name}`
    } else {
      usingComponents[camelToDash(key)] = value
    }
  }
  const hasKeys = Object.keys(usingComponents).length > 0
  if (hasKeys) {
    json.usingComponents = usingComponents
  }
  const newContent = JSON.stringify(json)
  writeFile(join(fileOutputDir, `${fileName}.json`), newContent)
  cache.set(fileOutputDir, newContent)
}
