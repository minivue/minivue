import { cac } from 'cac'
import { version } from '../package.json'
import minivue from '@minivue/compiler'
import { basename, join } from "path"
import { build } from "esbuild"
import fg from "fast-glob"

const files = fg.sync(["pages/**/*.vue", "components/**/*.vue"])

const entrys = Object.fromEntries(
  files.map((item) => {
    const fileName = basename(item, ".vue");
    const key = join(item.replace(".vue", ""), fileName)
    return [key, item]
  })
);

const cli = cac('minivue')

cli.command('build', 'build your app').action(async () => {
  console.log('building...')
  await new Promise((resolve) => {
    setTimeout(resolve, 5000)
  })
  await build({
    entryPoints: {
      app: "app.vue",
      ...entrys,
    },
    bundle: true,
    outdir: "dist",
    format: "esm",
    sourcemap: true,
    minify: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    splitting: true,
    treeShaking: true,
    define: {
      __DEV__: "false",
      __MINIVUE__: "true",
    },
    plugins: [
      minivue()
    ],
  })
})

cli.help()

cli.version(version)
cli.parse()