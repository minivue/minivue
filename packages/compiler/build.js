import { build } from 'esbuild'

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'dist',
  format: 'cjs',
  target: 'node12',
  minify: true,
})