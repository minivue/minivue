import { transformSync } from 'esbuild'

const res = transformSync(
  `import { test } from './mod'
const message = 'Hello Vite + Vue 3 + TypeScript + WindiCSS!'

export const tools = { test, message }`,
  {
    format: 'cjs',
  },
)

console.log(res.code)
