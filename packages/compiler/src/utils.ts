import crypto from 'crypto'
import { existsSync, createReadStream } from 'fs'
import { createInterface } from 'readline'
import { dirname } from 'path'
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
  content += `<script lang="ts">\n`
  content += `import { defineComponent as _defineComponent } from '@minivue/core'\n`
  content += `_defineComponent({})\n`
  content += `</script>\n`
  return content
}

export async function readFile(filePath: string) {
  const fileStream = createReadStream(filePath)
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })
  let content = ''
  let isWxs = false
  let hasScript = false

  for await (const line of rl) {
    const isScriptStart = line.startsWith('<script')
    const isScriptEnd = line.startsWith('</script>')
    const isWxsStart = isScriptStart && line.includes('type="wxs"')
    const isEmptySetupScript = line === '<script setup lang="ts"></script>'
    if (isEmptySetupScript) {
      content = setDefaultScript(content)
      continue
    }
    if (isScriptEnd) {
      isWxs = false
      continue
    }
    if (isWxs || isWxsStart) {
      isWxs = true
      continue
    }
    hasScript = hasScript || isScriptStart
    content += line + '\n'
  }
  if (!hasScript) {
    content = setDefaultScript(content)
  }

  console.log(filePath)
  console.log(content)
  console.log('\n\n')
  return content
}
