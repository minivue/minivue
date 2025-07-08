import { readFileSync } from 'fs'
import { basename, extname, join, relative } from 'path'
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

function getEntryPoints(pattern: string) {
  const files = fg.sync(pattern, {
    ignore: ['node_modules', 'dist', 'package.json', 'project.config.json', 'tsconfig.json'],
  })
  const entryPoints = Object.fromEntries(
    files.map((path) => {
      const ext = extname(path)
      const fileName = basename(path, ext)
      if (path.includes('/')) {
        const key = join(path.replace(ext, ''), fileName)
        return [key, path]
      }
      return [fileName, path]
    }),
  )
  return entryPoints
}

function getApiEntryPoints() {
  return getEntryPoints('index.ts')
}

function getComponentEntryPoints() {
  return getEntryPoints('**/*.{vue,json}')
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

export function getBuildOptions(isLib: boolean, watch = false): Options[] {
  const cssEntrys = getCssEntrys()
  const apiEntryPoints = getApiEntryPoints()
  const componentEntryPoints = getComponentEntryPoints()

  const {
    themePoints,
    componentJsPoints,
    componentJsonPoints,
    componentWxmlPoints,
    componentWxssPoints,
  } = getComponentsEntryPoints()
  const cssOptions: Options = {
    entry: cssEntrys,
    silent: true,
    watch,
    loader: {
      '.css': 'copy',
      '.wxss': 'copy',
    },
    esbuildOptions(options) {
      options.outExtension = {
        '.css': '.wxss',
      }
    },
  }
  const themeOptions: Options = {
    entry: themePoints,
    watch,
    minify: !watch,
    silent: true,
    loader: {
      '.css': 'copy',
    },
    plugins: [
      {
        name: 'css',
        renderChunk(code, chunk) {
          // code = code
          //   .replace(
          //     /html\[theme-mode=['"]?(\w+)['"]?\]/g,
          //     (match, theme) => `.kd-theme--${theme}`,
          //   )
          //   // 替换单独的 html
          //   .replace(/\bhtml\b/g, '.kd-theme--default')
          chunk.path = chunk.path.replace('.css', '.wxss')
          return {
            code,
            map: chunk.map,
          }
        },
      },
    ],
  }
  const componentJsonOptions: Options = {
    entry: componentJsonPoints,
    watch,
    silent: true,
    loader: {
      '.json': 'copy',
    },
  }
  const componentWxmlOptions: Options = {
    entry: componentWxmlPoints,
    watch,
    silent: true,
    loader: {
      '.wxml': 'copy',
    },
  }
  const componentWxssOptions: Options = {
    entry: componentWxssPoints,
    watch,
    silent: true,
    loader: {
      '.wxss': 'copy',
    },
  }
  const apiOptions: Options = {
    entry: apiEntryPoints,
    watch,
    bundle: true,
    silent: true,
    format: 'esm',
    sourcemap: false,
    target: 'es2018',
    minify: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    splitting: true,
    treeshake: 'smallest',
    noExternal: [],
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
  }

  const entryOptions: Options = {
    entry: {
      ...componentEntryPoints,
      ...componentJsPoints,
    },
    watch,
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
    loader: {
      '.json': 'copy',
    },
  }

  const libOptions: Options = {
    ...entryOptions,
    format: 'cjs',
    noExternal: [/./],
    outDir: 'miniprogram_dist',
  }
  const options: Options[] = [
    cssOptions,
    themeOptions,
    componentJsonOptions,
    componentWxmlOptions,
    componentWxssOptions,
    apiOptions,
    entryOptions,
  ]
  if (isLib) {
    options.push(libOptions)
  }
  return options.filter((item) => item.entry && Object.keys(item.entry).length > 0)
}
