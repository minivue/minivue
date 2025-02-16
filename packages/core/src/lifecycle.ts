import { toHiddenField } from './utils'
import { AppInstance, PageInstance } from './type'

type Context = AppInstance | PageInstance

export const ON_LOAD = 'onLoad'
export const ON_UNLOAD = 'onUnload'
export const ON_SHOW = 'onShow'
export const ON_HIDE = 'onHide'
export const ON_ERROR = 'onError'
export const ON_LAUNCH = 'onLaunch'
export const ON_PAGE_NOT_FOUND = 'onPageNotFound'
export const ON_UNHANDLED_REJECTION = 'onUnhandledRejection'

export const ON_SHARE_APP_MESSAGE = 'onShareAppMessage'
export const ON_SHARE_TIMELINE = 'onShareTimeline'
export const ON_ADD_TO_FAVORITES = 'onAddToFavorites'

export type Lifecycle =
  | typeof ON_LOAD
  | typeof ON_UNLOAD
  | typeof ON_SHOW
  | typeof ON_HIDE
  | typeof ON_ERROR
  | typeof ON_LAUNCH
  | typeof ON_PAGE_NOT_FOUND
  | typeof ON_UNHANDLED_REJECTION
  | typeof ON_SHARE_APP_MESSAGE
  | typeof ON_SHARE_TIMELINE
  | typeof ON_ADD_TO_FAVORITES

export function injectHook(ctx: Context | undefined, name: Lifecycle, hook: Function) {
  if (ctx) {
    const hiddenField = toHiddenField(name)
    const hooks = ctx[hiddenField] || []
    hooks.push(hook)
    ctx[hiddenField] = hooks
  } else if (__DEV__ && __MINIVUE__) {
    console.warn('lifecycle injection APIs can only be used during execution of setup() ')
  }
}

export function triggerHook(ctx: Context, name: Lifecycle, e?: any) {
  const hooks = ctx[toHiddenField(name)] || []
  hooks.forEach((hook: Function) => hook(e))
}

export function createLifecycle(name: Lifecycle) {
  return function (this: Context, e?: any) {
    triggerHook(this, name, e)
  }
}
