import { build } from 'esbuild'

build({
  entryPoints: ['src/index.ts'],
  external: ['vue', '@vue/reactivity'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  minify: true,
})