import { SFCBlock } from '@vue/compiler-sfc'
import { camelToDash, writeFile, resolveTsConfigPaths } from './utils'
import { join, basename } from 'path'
import { CompilerOptions } from 'typescript'

// 缓存上一次生成的内容，以便在下一次写入文件时检查是否需要更新
const cache = new Map<string, string>()

interface Component {
  libraryName: string
  prefix?: string
}
interface WriteJsonParams {
  /** 自定义块列表。 */
  customBlocks: SFCBlock[]
  /** 文件输出目录。 */
  fileOutputDir: string
  /** 文件名。 */
  fileName: string
  /** 导入的组件映射。 */
  importedComponentMap: Map<string, string>
  /** 导入的组件库列表 */
  components: Component[]
  /** ts编译选项 */
  compilerOptions?: CompilerOptions
}

/**
 * 将 配置块 写入json文件。
 *
 * @param customBlocks - 自定义块列表。
 * @param fileOutputDir - 文件输出目录。
 * @param fileName - 文件名。
 * @param importedComponentMap - 导入的组件映射。
 */
export function writeJson({
  customBlocks,
  fileOutputDir,
  fileName,
  components,
  importedComponentMap,
  compilerOptions,
}: WriteJsonParams) {
  const jsonBlock = customBlocks.find(({ type }) => type === 'config')
  const cacheConfig = cache.get(fileOutputDir)
  const { content = '{}' } = jsonBlock || {}
  if (cacheConfig === content) {
    return
  }
  const json = JSON.parse(content)
  const usingComponents: Record<string, string> = {}
  for (const [key, value] of importedComponentMap) {
    const componentTagName = camelToDash(key)
    const componentLib = components.find((item) => item.libraryName === value)
    if (componentLib) {
      const componentName = componentTagName.replace(componentLib.prefix || '', '').replace(/-/, '')
      usingComponents[componentTagName] = `${value}/${componentName}/${componentName}`
    } else if (compilerOptions) {
      const [path] = resolveTsConfigPaths(value, compilerOptions.baseUrl, compilerOptions.paths)
      const name = basename(path, '.vue')
      usingComponents[componentTagName] = `${path.replace(/\.vue$/, '')}/${name}`
    } else {
      usingComponents[componentTagName] = value
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
