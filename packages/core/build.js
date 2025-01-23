import { build } from 'esbuild'

build({
  entryPoints: ['src/index.ts'],
  packages: 'external',
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  minify: true,
})
