import { build } from 'esbuild'

const config = {
  bundle: true,
  entryPoints: ['src/index.ts'],
  external: ['@swc/core', '@vue/compiler-sfc', '@vue/compiler-core'],
  platform: 'node',
}

await Promise.all([
  build({
    ...config,
    outdir: 'dist/cjs',
    format: 'cjs',
  }),
  build({
    ...config,
    outdir: 'dist/esm',
    format: 'esm',
  }),
])
