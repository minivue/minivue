import crypto from 'crypto'
import { existsSync } from 'fs'
import { writeFile as _writeFile, mkdir } from 'fs/promises'
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
  if (!existsSync(fileOutputDir)) {
    await mkdir(fileOutputDir, { recursive: true })
  }
  await _writeFile(fileOutputDir, content)
}
