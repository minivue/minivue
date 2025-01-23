import { SFCStyleBlock } from '@vue/compiler-sfc'
import { writeFile } from './utils'
import { join } from 'path'

// 缓存上一次生成的内容，以便在下一次写入文件时检查是否需要更新
const cache = new Map<string, string>()

export function writeWxss(styles: SFCStyleBlock[], fileOutputDir: string, fileName: string) {
  const cacheContent = cache.get(fileOutputDir)
  if (styles.length > 0) {
    const cssCode = styles.reduce((str, { content }) => str + content, '')
    if (cacheContent !== cssCode) {
      writeFile(join(fileOutputDir, `${fileName}.wxss`), cssCode)
      cache.set(fileOutputDir, cssCode)
    }
  }
}
