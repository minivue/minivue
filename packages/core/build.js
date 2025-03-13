import { build } from 'esbuild'

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  minify: true,
})
