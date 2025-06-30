import { dirname, basename, relative, join } from 'path'
import { type Plugin } from 'esbuild'
import { parse } from '@vue/compiler-sfc'
import { compile } from './script'
import { writeWxml } from './wxml'
import { writeWxss } from './wxss'
import { writeJson } from './json'
import { parseFile, getCompilerOptions, getComponents, getLibraryCompponents } from './utils'

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
      const libCompponents = await getLibraryCompponents(components)
      build.initialOptions.charset = 'utf8'
      build.onLoad({ filter: /[^/]\.vue$/ }, async ({ path }) => {
        const { wxs, content } = await parseFile(path)
        const fileName = basename(path, '.vue')
        const isApp = fileName === 'app'
        const fileOutputDir = join('dist', dirname(relative('', path)), isApp ? '' : fileName)
        const { descriptor } = parse(content)
        const { template, styles, customBlocks } = descriptor
        const eventNames: string[] = []

        const isComponent = customBlocks.some(({ content, type }) => {
          if (type === 'config') {
            const json = JSON.parse(content)
            return !!json.component
          }
          return false
        })

        writeWxml({ template, fileOutputDir, fileName, eventNames, wxs, isComponent })
        writeWxss({ styles, fileOutputDir, fileName, components, isApp })
        const { contents, importedComponentMap } = await compile({
          descriptor,
          path,
          componentLibs: components.map((component) => component.libraryName),
          libCompponents,
          eventNames,
          isApp,
          isComponent,
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
