import crypto from 'crypto'
import { existsSync } from 'fs'
import { dirname } from 'path'
import { writeFile as _writeFile, mkdir, readFile as _readFile } from 'fs/promises'
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

export async function readFile(path: string) {
  let source = await _readFile(path, 'utf8')
  if (!source.includes('<script')) {
    source += `
    <script lang="ts">
    import { defineComponent as _defineComponent } from '@minivue/core'
    _defineComponent({})
    </script>
    `
  }
  return source
}
