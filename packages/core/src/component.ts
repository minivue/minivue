import { defineComponent as _defineComponent } from 'vue'
import { exclude, toHiddenField } from './utils'
import { PageLifecycle } from './enums'
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
  options[PageLifecycle.ON_LOAD] = function (this: any, query: Record<string, string | undefined>) {
    currentComponent = this
    callSetup(setup as any, query, currentComponent)
    const hooks = currentComponent[toHiddenField(PageLifecycle.ON_LOAD)]
    hooks?.forEach((hook: Function) => hook(query))
    currentComponent = null
  }

  options[PageLifecycle.ON_UNLOAD] = function () {
    const hooks = this[toHiddenField(PageLifecycle.ON_UNLOAD)]
    hooks?.forEach((hook: Function) => hook())
  }
  options[PageLifecycle.ON_SHOW] = function () {
    const hooks = this[toHiddenField(PageLifecycle.ON_SHOW)]
    hooks?.forEach((hook: Function) => hook())
  }
  options[PageLifecycle.ON_HIDE] = function () {
    const hooks = this[toHiddenField(PageLifecycle.ON_HIDE)]
    hooks?.forEach((hook: Function) => hook())
  }

  Component(options as any)

  return null as any
}
