import fs from 'fs'
import path from 'path'
import minivue from '@minivue/compiler'
import { basename, join } from 'path'
import { BuildOptions } from 'esbuild'
import fg from 'fast-glob'

interface Component {
  libraryName: string
  styleLibraryName?: string
}

interface PackageJson {
  components?: Component[]
}

function getProjectPackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  const content = fs.readFileSync(packageJsonPath, 'utf8')
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

function getComponentsEntryPoints() {
  const packageJson = getProjectPackageJson()
  const components = packageJson.components || []
  const componentFiles: string[] = []
  const componentDir = 'components'
  const nodeModulesPath = path.join(process.cwd(), 'node_modules')
  components.forEach((component) => {
    const componentPath = path.join(nodeModulesPath, component.libraryName, componentDir)
    const files = fg.sync(`${componentPath}/**/*.vue`)
    componentFiles.push(...files)
  })
  const componentPoints = Object.fromEntries(
    componentFiles.map((item) => {
      const fileName = basename(item, '.vue')
      const relativePath = path.relative(nodeModulesPath, item).replace('components/', '')
      const key = join('miniprogram_npm', relativePath.replace('.vue', ''), fileName)
      return [key, item]
    }),
  )
  return componentPoints
}

export function getBuildOptions(isLib: boolean): BuildOptions {
  const entryPoints = getEntryPoints()
  const componentsEntryPoints = getComponentsEntryPoints()
  console.log('componentsEntryPoints', componentsEntryPoints)
  return {
    entryPoints: {
      ...entryPoints,
      ...componentsEntryPoints,
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
  }
}
