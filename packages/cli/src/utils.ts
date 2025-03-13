import { readFileSync } from 'fs'
import { basename, join, relative } from 'path'
import { Options } from 'tsup'
import fg from 'fast-glob'
import minivue from '@minivue/compiler'

interface Component {
  libraryName: string
  styleLibraryName?: string
  themes?: string[]
  prefix?: string
}

interface PackageJson {
  components?: Component[]
  exports?: Record<string, string>
}

function getProjectPackageJson(projectPath?: string) {
  const packageJsonPath = join(projectPath || process.cwd(), 'package.json')
  const content = readFileSync(packageJsonPath, 'utf8')
  return JSON.parse(content) as PackageJson
}

function getCssEntrys() {
  const files = fg.sync('**/*.{wxss,css}', {
    ignore: ['node_modules', 'dist'],
  })
  return files
}

function getEntryPoints() {
  const files = fg.sync('**/*.vue', {
    ignore: ['node_modules', 'dist'],
  })
  const entryPoints = Object.fromEntries(
    files.map((item) => {
      const fileName = basename(item, '.vue')
      const key = join(item.replace('.vue', ''), fileName)
      return [key.replace('app/app', 'app'), item]
    }),
  )
  return entryPoints
}

function getComponentPath(nodeModulesPath: string, libraryName: string) {
  const packagePath = join(nodeModulesPath, libraryName)
  const packageJson = getProjectPackageJson(packagePath)
  const exports = packageJson.exports || {}
  const componentsPath = exports['./components']
  if (componentsPath) {
    return join(packagePath, componentsPath)
  }
}

function getComponentsEntryPoints() {
  const packageJson = getProjectPackageJson()
  const components = packageJson.components || []
  const componentFiles: { libName: string; path: string; relativePath: string }[] = []
  const nodeModulesPath = join(process.cwd(), 'node_modules')
  const themeFiles: { libName: string; path: string; relativePath: string }[] = []
  components.forEach(({ libraryName, styleLibraryName, themes = ['default'] }) => {
    const componentsPath = getComponentPath(nodeModulesPath, libraryName)
    if (styleLibraryName) {
      themes.forEach((item) => {
        const themePath = join(nodeModulesPath, styleLibraryName, `${item}.css`)
        themeFiles.push({
          libName: styleLibraryName,
          path: themePath,
          relativePath: relative(nodeModulesPath, themePath),
        })
      })
    }
    if (componentsPath) {
      const files = fg.sync(join(componentsPath, '**/*.{js,wxml,wxss,json}'))
      files.forEach((item) => {
        componentFiles.push({
          libName: libraryName,
          path: item,
          relativePath: relative(componentsPath, item),
        })
      })
    }
  })
  const themePoints = Object.fromEntries(
    themeFiles.map(({ path, relativePath }) => {
      const key = join('miniprogram_npm', relativePath).replace('.css', '')
      return [key, path]
    }),
  )
  const componentJsPoints = Object.fromEntries(
    componentFiles
      .filter((item) => item.path.endsWith('.js'))
      .map(({ libName, path, relativePath }) => {
        const key = join('miniprogram_npm', libName, relativePath).replace('.js', '')
        return [key, path]
      }),
  )
  const componentWxmlPoints = Object.fromEntries(
    componentFiles
      .filter((item) => item.path.endsWith('.wxml'))
      .map(({ libName, path, relativePath }) => {
        const key = join('miniprogram_npm', libName, relativePath).replace('.wxml', '')
        return [key, path]
      }),
  )
  const componentWxssPoints = Object.fromEntries(
    componentFiles
      .filter((item) => item.path.endsWith('.wxss'))
      .map(({ libName, path, relativePath }) => {
        const key = join('miniprogram_npm', libName, relativePath).replace('.wxss', '')
        return [key, path]
      }),
  )
  const componentJsonPoints = Object.fromEntries(
    componentFiles
      .filter((item) => item.path.endsWith('.json'))
      .map(({ libName, path, relativePath }) => {
        const key = join('miniprogram_npm', libName, relativePath).replace('.json', '')
        return [key, path]
      }),
  )
  return {
    themePoints,
    componentJsPoints,
    componentWxmlPoints,
    componentWxssPoints,
    componentJsonPoints,
  }
}

// 自定义 CSS 插件
// const customCssPlugin = {
//   name: 'custom-css',
//   setup(build: PluginBuild) {
//     build.onLoad({ filter: /\.css$/ }, async (args) => {
//       const css = readFileSync(args.path, 'utf8')
//       // console.log(css)
//       return {
//         contents: css,
//         loader: 'css',
//       }
//     })
//   },
// }

export function getBuildOptions(isLib: boolean): Options[] {
  const cssEntrys = getCssEntrys()
  const entryPoints = getEntryPoints()
  const {
    themePoints,
    componentJsPoints,
    componentJsonPoints,
    componentWxmlPoints,
    componentWxssPoints,
  } = getComponentsEntryPoints()
  const options: Options[] = [
    {
      entry: cssEntrys,
      silent: true,
      loader: {
        '.css': 'copy',
        '.wxss': 'copy',
      },
      esbuildOptions(options) {
        options.outExtension = {
          '.css': '.wxss',
        }
      },
    },
    {
      entry: themePoints,
      minify: true,
      silent: true,
      esbuildOptions(options) {
        options.outExtension = {
          '.css': '.wxss',
        }
      },
      // plugins: [customCssPlugin],
    },
    {
      entry: componentJsonPoints,
      silent: true,
      loader: {
        '.json': 'copy',
      },
    },
    {
      entry: componentWxmlPoints,
      silent: true,
      loader: {
        '.wxml': 'copy',
      },
    },
    {
      entry: componentWxssPoints,
      silent: true,
      loader: {
        '.wxss': 'copy',
      },
    },
    {
      entry: {
        ...entryPoints,
        ...componentJsPoints,
      },
      bundle: true,
      silent: true,
      format: isLib ? 'esm' : 'cjs',
      sourcemap: false,
      target: 'es2018',
      minify: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      splitting: true,
      treeshake: 'smallest',
      noExternal: isLib ? [] : [/./],
      replaceNodeEnv: true,
      legacyOutput: false,
      outExtension() {
        return {
          js: '.js',
        }
      },
      esbuildPlugins: [minivue()],
      esbuildOptions(options) {
        options.charset = 'utf8'
        options.chunkNames = '[dir]/[name]-[hash]'
      },
      plugins: [
        {
          name: 'dynamic-import',
          renderChunk(code, chunk) {
            if (chunk.imports?.some((i) => i.kind === 'dynamic-import')) {
              code = code.replace(/import\(/g, 'require.async(')
            }
            return {
              code,
              map: chunk.map,
            }
          },
        },
      ],
    },
  ]
  return options.filter((item) => item.entry && Object.keys(item.entry).length > 0)
}
