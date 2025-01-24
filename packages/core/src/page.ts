import { defineComponent } from 'vue'
import { exclude, toHiddenField } from './utils'
import { PAGE_ON_LOAD, PAGE_ON_UNLOAD, PAGE_ON_SHOW, PAGE_ON_HIDE } from './constant'
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
  options[PAGE_ON_LOAD] = function (this: any, query: Record<string, string | undefined>) {
    currentPage = this
    callSetup(setup as any, query, currentPage)
    const hooks = currentPage[toHiddenField(PAGE_ON_LOAD)]
    hooks?.forEach((hook: Function) => hook(query))
    currentPage = null
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
  console.log(options)
  Page(options as any)

  return null as any
}
