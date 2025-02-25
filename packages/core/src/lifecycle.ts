import { toHiddenField } from './utils'
import { AppInstance, ComponentInstance, PageInstance } from './type'

type Context = AppInstance | PageInstance | ComponentInstance

// app lifecycle
export const ON_ERROR = 'onError'
export const ON_LAUNCH = 'onLaunch'
export const ON_PAGE_NOT_FOUND = 'onPageNotFound'
export const ON_UNHANDLED_REJECTION = 'onUnhandledRejection'

// page lifecycle
export const ON_LOAD = 'onLoad'
export const ON_SHOW = 'onShow'
export const ON_READY = 'onReady'
export const ON_HIDE = 'onHide'
export const ON_UNLOAD = 'onUnload'
export const ON_ROUTE_DONE = 'onRouteDone'
export const ON_PULL_DOWN_REFRESH = 'onPullDownRefresh'
export const ON_REACH_BOTTOM = 'onReachBottom'
export const ON_SHARE_APP_MESSAGE = 'onShareAppMessage'
export const ON_SHARE_TIMELINE = 'onShareTimeline'
export const ON_ADD_TO_FAVORITES = 'onAddToFavorites'
export const ON_PAGE_SCROLL = 'onPageScroll'
export const ON_RESIZE = 'onResize'
export const ON_TAB_ITEM_TAP = 'onTabItemTap'
export const ON_SAVE_ExiteState = 'onSaveExitState'

// component lifecycle
export const ON_CREATED = 'onCreated'
export const ON_ATTACHED = 'onAttached'
export const ON_MOVED = 'onMoved'
export const ON_DETACHED = 'onDetached'

export type Lifecycle =
  | typeof ON_ERROR
  | typeof ON_LAUNCH
  | typeof ON_PAGE_NOT_FOUND
  | typeof ON_UNHANDLED_REJECTION
  | typeof ON_LOAD
  | typeof ON_SHOW
  | typeof ON_READY
  | typeof ON_HIDE
  | typeof ON_UNLOAD
  | typeof ON_ROUTE_DONE
  | typeof ON_PULL_DOWN_REFRESH
  | typeof ON_REACH_BOTTOM
  | typeof ON_SHARE_APP_MESSAGE
  | typeof ON_SHARE_TIMELINE
  | typeof ON_ADD_TO_FAVORITES
  | typeof ON_PAGE_SCROLL
  | typeof ON_RESIZE
  | typeof ON_TAB_ITEM_TAP
  | typeof ON_SAVE_ExiteState
  | typeof ON_CREATED
  | typeof ON_ATTACHED
  | typeof ON_MOVED
  | typeof ON_DETACHED

type Instance = AppInstance | PageInstance | ComponentInstance | undefined

let instance: Instance

export function setCurrentInstance(target?: Instance) {
  instance = target
}

export function injectHook(name: Lifecycle, hook: Function) {
  if (instance) {
    const hiddenField = toHiddenField(name)
    const hooks = instance[hiddenField] || []
    hooks.push(hook)
    instance[hiddenField] = hooks
  } else if (__DEV__) {
    console.warn('lifecycle injection APIs can only be used during execution of setup() ')
  }
}

export function triggerHook(ctx: Context, name: Lifecycle, e?: any) {
  const hooks = ctx[toHiddenField(name)] || []
  hooks.forEach((hook: Function) => hook(e))
}

export function createHook<T extends Function>(name: Lifecycle) {
  return (hook: T) => injectHook(name, hook)
}

export function createLifecycle(name: Lifecycle) {
  return function (this: Context, e?: any) {
    triggerHook(this, name, e)
  }
}
