import { dirname, basename, relative, join } from 'path'
import { type Plugin } from 'esbuild'
import { parse } from '@vue/compiler-sfc'
import { compile } from './script'
import { writeWxml } from './wxml'
import { writeWxss } from './wxss'
import { writeJson } from './json'
import { parseFile, readCompilerOptions } from './utils'

interface PluginOptions {
  // 组件库列表，用于自动导入组件
  components?: string[]
}

// vue转换小程序插件
export default function plugin(options: PluginOptions = {}): Plugin {
  return {
    name: 'vue',
    async setup(build) {
      const compilerOptions = await readCompilerOptions()
      build.initialOptions.charset = 'utf8'
      // build.onResolve({ filter: /^@minivue\/ui$/ }, (args) => {
      //   console.log('Resolving:', args)
      //   // 返回自定义的解析结果
      //   return {
      //     path: '/Users/feiyue/minivue/apps/playground/test.vue', // 自定义路径
      //     namespace: 'file', // 自定义命名空间
      //   }
      // })
      build.onLoad({ filter: /[^/]\.vue$/ }, async (args) => {
        console.log(args)

        const { path } = args
        const { wxs, content } = await parseFile(path)
        const fileName = basename(path, '.vue')
        const isApp = fileName === 'app'
        const fileOutputDir = join('dist', dirname(relative('', path)), isApp ? '' : fileName)
        const { descriptor } = parse(content)
        const { template, styles, customBlocks } = descriptor
        const { components = ['@minivue/ui'] } = options
        const eventNames: string[] = []
        writeWxml(template, fileOutputDir, fileName, eventNames, wxs)
        writeWxss(styles, fileOutputDir, fileName)
        const { contents, importedComponentMap } = await compile(
          descriptor,
          path,
          components,
          eventNames,
          isApp,
        )
        writeJson(customBlocks, fileOutputDir, fileName, importedComponentMap, compilerOptions)

        return {
          contents,
          loader: 'ts',
        }
      })
    },
  }
}
