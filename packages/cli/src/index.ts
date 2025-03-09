import { cac } from 'cac'
import { version } from '../package.json'
import minivue from '@minivue/compiler'
import { basename, join } from 'path'
import { BuildOptions, build, context } from 'esbuild'
import fg from 'fast-glob'
import { rimraf } from 'rimraf'

const files = fg.sync('**/*.vue')
const entryPoints = Object.fromEntries(
  files.map((item) => {
    const fileName = basename(item, '.vue')
    const key = join(item.replace('.vue', ''), fileName)
    return [key.replace('app/app', 'app'), item]
  }),
)

function getBuildOptions(isLib: boolean): BuildOptions {
  return {
    entryPoints,
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
      __MINIVUE__: 'true',
    },
    packages: isLib ? 'external' : 'bundle',
    plugins: [minivue()],
  }
}

const cli = cac('minivue')

cli
  .command('dev', 'dev your app')
  .option('--lib', 'dev a lib')
  .action(async (options) => {
    const buildOpitons = getBuildOptions(options.lib)
    await rimraf('dist')
    const ctx = await context(buildOpitons)
    await ctx.watch()
    console.log('watching...')
  })

cli
  .command('build', 'build your app')
  .option('--lib', 'build a lib')
  .action(async (options) => {
    const buildOpitons = getBuildOptions(options.lib)
    console.log('building...')
    await rimraf('dist')
    await build(buildOpitons)
  })

cli.option('--lib', 'build a lib')

cli.help()

cli.version(version)
cli.parse()
