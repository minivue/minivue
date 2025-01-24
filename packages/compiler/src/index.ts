import { readFile } from 'fs/promises'
import { dirname, basename, relative, join } from 'path'
import type { Plugin } from 'esbuild'
import { parse } from '@vue/compiler-sfc'
import { compile } from './script'
import { writeWxml } from './wxml'
import { writeWxss } from './wxss'
import { writeJson } from './json'

interface PluginOptions {
  // 组件库列表，用于自动导入组件
  components?: string[]
}

// vue转换小程序插件
export default function plugin(options: PluginOptions = {}): Plugin {
  return {
    name: 'vue',
    setup(build) {
      build.initialOptions.charset = 'utf8'
      build.onLoad({ filter: /[^/]\.vue$/ }, async ({ path }) => {
        const source = await readFile(path, 'utf8')
        const fileName = basename(path, '.vue')
        const isApp = fileName === 'app'
        const fileOutputDir = join('dist', dirname(relative('', path)), isApp ? '' : fileName)
        const { descriptor } = parse(source)
        const { template, styles, customBlocks } = descriptor
        const { components } = options

        writeWxml(template, fileOutputDir, fileName)
        writeWxss(styles, fileOutputDir, fileName)
        const { contents, importedComponentMap } = await compile(
          descriptor,
          path,
          components,
          isApp,
        )
        writeJson(customBlocks, fileOutputDir, fileName, importedComponentMap)

        return {
          contents,
          loader: 'ts',
        }
      })
    },
  }
}
