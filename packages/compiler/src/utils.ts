import os from 'os'
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
  content += `<script lang="ts">${os.EOL}`
  content += `import { defineComponent as _defineComponent } from '@minivue/core'${os.EOL}`
  content += `_defineComponent({})${os.EOL}`
  content += `</script>${os.EOL}`
  return content
}

export async function readFile(filePath: string) {
  const fileStream = createReadStream(filePath, { encoding: 'utf-8' })
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })
  let content = ''
  let isWxs = false
  let hasScript = false
  let wxs = ''
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
        wxs += `${line}${os.EOL}`
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

  rl.close()
  fileStream.close()
  return {
    content,
    wxs,
  }
}
