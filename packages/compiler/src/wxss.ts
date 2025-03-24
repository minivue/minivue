import { SFCStyleBlock } from '@vue/compiler-sfc'
import { writeFile } from './utils'
import { join } from 'path'

interface Component {
  libraryName: string
  styleLibraryName?: string
  themes?: string[]
  prefix?: string
}

interface WriteWxssParams {
  isApp: boolean
  styles: SFCStyleBlock[]
  fileOutputDir: string
  fileName: string
  /** 导入的组件库列表 */
  components: Component[]
}

// 缓存上一次生成的内容，以便在下一次写入文件时检查是否需要更新
const cache = new Map<string, string>()

export function writeWxss({
  styles,
  fileOutputDir,
  isApp,
  fileName,
  components = [],
}: WriteWxssParams) {
  const cacheContent = cache.get(fileOutputDir)
  const cssCode = styles.reduce((str, { content }) => str + content, '')
  let importStyle = ''
  if (isApp) {
    components.forEach(({ styleLibraryName, themes = ['default'] }) => {
      if (styleLibraryName) {
        themes.forEach((theme) => {
          importStyle += `@import 'miniprogram_npm/${styleLibraryName}/${theme}.wxss';\n`
        })
      }
    })
  }
  const wxssCode = importStyle + cssCode
  if (cacheContent !== wxssCode) {
    writeFile(join(fileOutputDir, `${fileName}.wxss`), wxssCode)
    cache.set(fileOutputDir, wxssCode)
  }
}
