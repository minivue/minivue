import { readFileSync } from 'fs'
import { basename, join, relative } from 'path'
import { BuildOptions } from 'esbuild'
import fg from 'fast-glob'
import minivue from '@minivue/compiler'

interface Component {
  libraryName: string
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

function getEntryPoints() {
  const files = fg.sync('**/*.vue', {
    ignore: ['node_modules'],
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
  components.forEach((component) => {
    const componentsPath = getComponentPath(nodeModulesPath, component.libraryName)
    if (componentsPath) {
      const files = fg.sync(join(componentsPath, '**/*.{js,wxml,wxss,json}'))
      files.forEach((item) => {
        componentFiles.push({
          libName: component.libraryName,
          path: item,
          relativePath: relative(componentsPath, item),
        })
      })
    }
  })
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
    componentJsPoints,
    componentWxmlPoints,
    componentWxssPoints,
    componentJsonPoints,
  }
}

export function getBuildOptions(isLib: boolean): BuildOptions[] {
  const entryPoints = getEntryPoints()
  const { componentJsPoints, componentJsonPoints, componentWxmlPoints, componentWxssPoints } =
    getComponentsEntryPoints()
  return [
    {
      entryPoints: componentJsonPoints,
      loader: {
        '.json': 'copy',
      },
      outdir: 'dist',
    },
    {
      entryPoints: componentWxmlPoints,
      loader: {
        '.wxml': 'copy',
      },
      outdir: 'dist',
    },
    {
      entryPoints: componentWxssPoints,
      loader: {
        '.wxss': 'copy',
      },
      outdir: 'dist',
    },
    {
      entryPoints: {
        ...entryPoints,
        ...componentJsPoints,
      },
      bundle: true,
      outdir: 'dist',
      format: 'esm',
      sourcemap: false,
      target: 'es2018',
      minify: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      splitting: true,
      treeShaking: true,
      define: {
        __DEV__: 'false',
      },
      packages: isLib ? 'external' : 'bundle',
      plugins: [minivue()],
    },
  ]
}
