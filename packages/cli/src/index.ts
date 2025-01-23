import { cac } from 'cac'
import { version } from '../package.json'
import minivue from '@minivue/compiler'
import { basename, join } from 'path'
import { BuildOptions, build, context } from 'esbuild'
import fg from 'fast-glob'
import { rimraf } from 'rimraf'

const files = fg.sync(['pages/**/*.vue', 'components/**/*.vue'])
const entrys = Object.fromEntries(
  files.map((item) => {
    const fileName = basename(item, '.vue')
    const key = join(item.replace('.vue', ''), fileName)
    return [key, item]
  }),
)

const opitons: BuildOptions = {
  entryPoints: {
    app: 'app.vue',
    ...entrys,
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
    __MINIVUE__: 'true',
  },
  plugins: [minivue()],
}

const cli = cac('minivue')

cli.command('dev', 'dev your app').action(async () => {
  const ctx = await context(opitons)
  await ctx.watch()
  console.log('watching...')
})

cli.command('build', 'build your app').action(async () => {
  console.log('building...')
  await rimraf('dist')
  await build(opitons)
})

cli.help()

cli.version(version)
cli.parse()
