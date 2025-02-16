import { defineComponent, onBeforeMount, onMounted, onUnmounted } from 'vue'
import { exclude, toHiddenField } from './utils'
import { DefineComponentFunction, PageInstance, PageOptions } from './type'
import { callSetup } from './shared'
import {
  createLifecycle,
  injectHook,
  ON_HIDE,
  ON_LOAD,
  ON_SHOW,
  ON_UNLOAD,
  triggerHook,
} from './lifecycle'

let pageInstance: PageInstance | undefined

type HookOnShow = () => void
type HookOnHide = () => void

export const definePage: DefineComponentFunction = (options) => {
  if (!__MINIVUE__) {
    return defineComponent(options)
  }
  const setup = options.setup
  options.data = callSetup(setup as any, {}, {}) as any
  const newOptions = exclude(options, ['setup', 'props']) as PageOptions
  newOptions[ON_LOAD] = function (this: PageInstance, query: Record<string, string | undefined>) {
    pageInstance = this
    callSetup(setup as any, query, pageInstance)
    const hooks = pageInstance[toHiddenField(ON_LOAD)]
    hooks?.forEach((hook: Function) => hook(query))
    triggerHook(pageInstance, ON_LOAD, query)
    pageInstance = undefined
  }

  newOptions[ON_UNLOAD] = createLifecycle(ON_UNLOAD)
  newOptions[ON_SHOW] = createLifecycle(ON_SHOW)
  newOptions[ON_HIDE] = createLifecycle(ON_HIDE)

  return Page(newOptions) as any
}

export function onLoad(hook: Function) {
  if (__MINIVUE__) {
    injectHook(pageInstance, ON_LOAD, hook)
  } else {
    onBeforeMount(() => hook())
  }
}

export function onShow(hook: HookOnShow) {
  if (__MINIVUE__) {
    injectHook(pageInstance, ON_SHOW, hook)
  } else {
    onMounted(() => hook())
  }
}

export function onHide(hook: HookOnHide) {
  if (__MINIVUE__) {
    injectHook(pageInstance, ON_HIDE, hook)
  } else {
    onUnmounted(() => hook())
  }
}
