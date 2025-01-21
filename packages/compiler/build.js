import { build } from 'esbuild'

const config = {
  entryPoints: ['src/index.ts'],
  packages: 'external'
}

await Promise.all([
  build({
    ...config,
    outdir: 'dist/cjs',
    format: 'cjs'
  }),
  build({
    ...config,
    outdir: 'dist/esm',
    format: 'esm'
  })
])