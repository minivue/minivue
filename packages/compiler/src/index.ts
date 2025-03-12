import { dirname, basename, relative, join } from 'path'
import { type Plugin } from 'esbuild'
import { parse } from '@vue/compiler-sfc'
import { compile } from './script'
import { writeWxml } from './wxml'
import { writeWxss } from './wxss'
import { writeJson } from './json'
import { parseFile, getCompilerOptions, getComponents } from './utils'

interface Component {
  libraryName: string
  prefix: string
}

interface PluginOptions {
  // 组件库列表，用于自动导入组件
  components?: Component[]
}

// vue转换小程序插件
export default function plugin(options: PluginOptions = {}): Plugin {
  return {
    name: 'vue',
    async setup(build) {
      const components = options.components || (await getComponents())
      const compilerOptions = await getCompilerOptions()
      build.initialOptions.charset = 'utf8'
      build.onLoad({ filter: /[^/]\.vue$/ }, async ({ path }) => {
        const { wxs, content } = await parseFile(path)
        const fileName = basename(path, '.vue')
        const isApp = fileName === 'app'
        const fileOutputDir = join('dist', dirname(relative('', path)), isApp ? '' : fileName)
        const { descriptor } = parse(content)
        const { template, styles, customBlocks } = descriptor
        const eventNames: string[] = []
        writeWxml({ template, fileOutputDir, fileName, eventNames, wxs })
        writeWxss({ styles, fileOutputDir, fileName, components, isApp })
        const { contents, importedComponentMap } = await compile({
          descriptor,
          path,
          componentLibs: components.map((component) => component.libraryName),
          eventNames,
          isApp,
        })
        writeJson({
          customBlocks,
          fileOutputDir,
          fileName,
          importedComponentMap,
          components,
          compilerOptions,
        })
        return {
          contents,
          loader: 'ts',
        }
      })
    },
  }
}
