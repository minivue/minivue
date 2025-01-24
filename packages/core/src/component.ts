import { defineComponent as _defineComponent } from 'vue'
import { exclude, toHiddenField } from './utils'
import { PAGE_ON_LOAD, PAGE_ON_UNLOAD, PAGE_ON_SHOW, PAGE_ON_HIDE } from './constant'
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
  options[PAGE_ON_LOAD] = function (this: any, query: Record<string, string | undefined>) {
    currentComponent = this
    callSetup(setup as any, query, currentComponent)
    const hooks = currentComponent[toHiddenField(PAGE_ON_LOAD)]
    hooks?.forEach((hook: Function) => hook(query))
    currentComponent = null
  }

  options[PAGE_ON_UNLOAD] = function () {
    const hooks = this[toHiddenField(PAGE_ON_UNLOAD)]
    hooks?.forEach((hook: Function) => hook())
  }
  options[PAGE_ON_SHOW] = function () {
    const hooks = this[toHiddenField(PAGE_ON_SHOW)]
    hooks?.forEach((hook: Function) => hook())
  }
  options[PAGE_ON_HIDE] = function () {
    const hooks = this[toHiddenField(PAGE_ON_HIDE)]
    hooks?.forEach((hook: Function) => hook())
  }

  Component(options as any)

  return null as any
}
