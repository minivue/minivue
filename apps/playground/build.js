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