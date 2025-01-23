import { defineComponent } from 'vue'
import { exclude, toHiddenField } from './utils'
import { PageLifecycle } from './enums'
import { DefineComponentFunction } from './type'
import { callSetup } from './shared'

let currentPage: any

export function getCurrentPage() {
  return currentPage
}

export const definePage: DefineComponentFunction = (options) => {
  if (!__MINIVUE__) {
    return defineComponent(options)
  }
  const setup = options.setup
  options.data = callSetup(setup as any, {}, {}) as any
  options = exclude(options, ['setup', 'props'])
  options[PageLifecycle.ON_LOAD] = function (this: any, query: Record<string, string | undefined>) {
    currentPage = this
    callSetup(setup as any, query, currentPage)
    const hooks = currentPage[toHiddenField(PageLifecycle.ON_LOAD)]
    hooks?.forEach((hook: Function) => hook(query))
    currentPage = null
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
  console.log(options)
  Page(options as any)

  return null as any
}
