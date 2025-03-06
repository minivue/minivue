import { transform } from '@swc/core'

const wxs = `import { test } from './mod'
const message = 'Hello Vite + Vue 3 + TypeScript + WindiCSS!'

export const tools = { test, message }`

const rs = await transform(wxs, {
  // module: {
  //   type: 'systemjs',
  // },
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: false,
    },
    target: 'es5',
    loose: true,
  },
})

console.log(rs.code)
