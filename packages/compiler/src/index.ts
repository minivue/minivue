import { dirname, basename, relative, join } from 'path'
import { type Plugin } from 'esbuild'
import { parse } from '@vue/compiler-sfc'
import { compile } from './script'
import { writeWxml } from './wxml'
import { writeWxss } from './wxss'
import { writeJson } from './json'
import { readFile } from './utils'

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
        const { wxs, content } = await readFile(path)
        const fileName = basename(path, '.vue')
        const isApp = fileName === 'app'
        const fileOutputDir = join('dist', dirname(relative('', path)), isApp ? '' : fileName)
        if (wxs) {
          console.log(wxs)
          // const result = ts.transpileModule(wxs, {
          //   compilerOptions: {
          //     module: ts.ModuleKind.CommonJS,
          //     target: ts.ScriptTarget.ES5,
          //     esModuleInterop: false,
          //     removeComments: true,
          //   },
          // })
          // console.log(result)
          // const rs = await transform(wxs, {
          //   module: {
          //     type: 'commonjs',
          //   },
          //   jsc: {
          //     parser: {
          //       syntax: 'typescript',
          //       tsx: false,
          //     },
          //     target: 'es5',
          //     loose: true,
          //   },
          // })
          // console.log(rs.code)
        }
        const { descriptor } = parse(content)
        const { template, styles, customBlocks } = descriptor
        const { components } = options
        const eventNames: string[] = []
        writeWxml(template, fileOutputDir, fileName, eventNames)
        writeWxss(styles, fileOutputDir, fileName)
        const { contents, importedComponentMap } = await compile(
          descriptor,
          path,
          components,
          eventNames,
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
