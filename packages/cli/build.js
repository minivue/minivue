import { build } from 'tsup'

build({
  entry: ['src/index.ts'],
  bundle: true,
  format: 'esm',
  silent: true,
  skipNodeModulesBundle: true,
})
