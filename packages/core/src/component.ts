import { defineComponent as _defineComponent } from 'vue'
import { exclude } from './utils'
import { callSetup } from './shared'
import { DefineComponentFunction } from './type'

let currentComponent: any

export function getCurrentComponent() {
  return currentComponent
}

export const defineComponent: DefineComponentFunction = (options) => {
  if (!__MINIVUE__) {
    return _defineComponent(options)
  }
  const setup = options.setup
  options.data = callSetup(setup as any, {}, {}) as any
  options = exclude(options, ['setup', 'props'])

  Component(options as any)

  return null as any
}
