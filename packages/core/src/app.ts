import { defineComponent, onBeforeMount, onMounted } from 'vue'
import { DefineComponentFunction } from './type'
import { exclude, toHiddenField } from './utils'
import { onVisibilityChange } from './bom'

type AppShowOption = WechatMiniprogram.App.LaunchShowOption
type AppLaunchOption = WechatMiniprogram.App.LaunchShowOption
type AppOptions = WechatMiniprogram.App.Options<WechatMiniprogram.IAnyObject>
type AppInstance = WechatMiniprogram.App.Instance<WechatMiniprogram.IAnyObject>
type HookOnShow = (options: AppShowOption) => void
type HookOnLaunch = (options: AppLaunchOption) => void
type HookOnHide = () => void
type HookOnError = (error: string) => void
type HookOnPageNotFound = (options: WechatMiniprogram.App.PageNotFoundOption) => void
type HookOnUnhandledRejection = (
  result: WechatMiniprogram.OnUnhandledRejectionCallbackResult,
) => void

// App的钩子
export const APP_ON_SHOW = 'onShow'
export const APP_ON_HIDE = 'onHide'
export const APP_ON_ERROR = 'onError'
export const APP_ON_LAUNCH = 'onLaunch'
export const APP_ON_PAGE_NOT_FOUND = 'onPageNotFound'
export const APP_ON_UNHANDLED_REJECTION = 'onUnhandledRejection'

export type AppLifecycle =
  | typeof APP_ON_SHOW
  | typeof APP_ON_HIDE
  | typeof APP_ON_ERROR
  | typeof APP_ON_LAUNCH
  | typeof APP_ON_PAGE_NOT_FOUND
  | typeof APP_ON_UNHANDLED_REJECTION

let appInstance: AppInstance | undefined

function createAppHook<T>(name: AppLifecycle) {
  return function (hook: T) {
    if (appInstance) {
      const hiddenField = toHiddenField(name)
      const hooks = appInstance[hiddenField] || []
      hooks.push(hook)
      appInstance[hiddenField] = hooks
    } else if (__DEV__ && __MINIVUE__) {
      console.warn('lifecycle injection APIs can only be used during execution of setup() ')
    }
  }
}

function injectHook(name: AppLifecycle, hook: Function) {
  if (appInstance) {
    const hiddenField = toHiddenField(name)
    const hooks = appInstance[hiddenField] || []
    hooks.push(hook)
    appInstance[hiddenField] = hooks
  } else if (__DEV__ && __MINIVUE__) {
    console.warn('lifecycle injection APIs can only be used during execution of setup() ')
  }
}

function triggerHook(ctx: AppInstance, name: AppLifecycle, e?: any) {
  const hooks = ctx[toHiddenField(name)] || []
  hooks.forEach((hook: Function) => hook(e))
}

function createAppLifecycle<T>(name: AppLifecycle) {
  return function (this: AppInstance, e?: T) {
    triggerHook(this, name, e)
  }
}

/**
 * 使用给定的选项定义一个应用程序组件。
 *
 * @param options - 定义应用程序组件的选项。
 * @returns 定义的应用程序组件。
 *
 * @remarks
 * 如果全局 `__MINIVUE__` 标志未设置，将使用 `defineComponent` 函数。
 * 否则，它将排除 `setup` 选项并添加 `APP_ON_LAUNCH` 和 `APP_ON_SHOW` 处理程序。
 *
 * @example
 * ```typescript
 * const app = defineApp({
 *   setup() {
 *     // setup 逻辑
 *   },
 * });
 * ```
 */
export const defineApp: DefineComponentFunction = (options) => {
  if (!__MINIVUE__) {
    return defineComponent(options)
  }
  const setup = options.setup
  const newOptions = exclude(options, ['setup']) as AppOptions
  newOptions[APP_ON_LAUNCH] = function (this: AppInstance, e) {
    appInstance = this
    // @ts-ignore
    setup({}, {})
    triggerHook(appInstance, APP_ON_LAUNCH, e)
    appInstance = undefined
  }
  newOptions[APP_ON_SHOW] = createAppLifecycle(APP_ON_SHOW)
  newOptions[APP_ON_HIDE] = createAppLifecycle(APP_ON_HIDE)
  newOptions[APP_ON_ERROR] = createAppLifecycle(APP_ON_ERROR)
  newOptions[APP_ON_PAGE_NOT_FOUND] = createAppLifecycle(APP_ON_PAGE_NOT_FOUND)
  newOptions[APP_ON_UNHANDLED_REJECTION] = createAppLifecycle(APP_ON_UNHANDLED_REJECTION)
  return App(newOptions) as any
}

export function onAppLaunch(hook: HookOnLaunch) {
  if (__MINIVUE__) {
    injectHook(APP_ON_LAUNCH, hook)
  } else {
    onBeforeMount(() => {
      hook({ path: '', query: {}, scene: 1001, shareTicket: ''})
    })
  }
}

export function onAppShow(hook: HookOnShow) {
  if (__MINIVUE__) {
    injectHook(APP_ON_SHOW, hook)
  } else {
    onMounted(() => {
      onVisibilityChange((show) => {
        if (show) {
          hook({ path: '', query: {}, scene: 1001, shareTicket: ''})
        }
      })
    })
  }
}

export function onAppHide(hook: HookOnHide) {
  if (__MINIVUE__) {
    injectHook(APP_ON_HIDE, hook)
  } else {
    onMounted(() => {
      onVisibilityChange((show) => {
        if (!show) {
          hook()
        }
      })
    })
  }
}

// export const onAppLaunch = createAppHook<HookOnLaunch>(APP_ON_LAUNCH)
// export const onAppShow = createAppHook<HookOnShow>(APP_ON_SHOW)
// export const onAppHide = createAppHook<HookOnHide>(APP_ON_HIDE)
export const onAppError = createAppHook<HookOnError>(APP_ON_ERROR)
export const onAppPageNotFound = createAppHook<HookOnPageNotFound>(APP_ON_PAGE_NOT_FOUND)
export const onAppUnhandledRejection = createAppHook<HookOnUnhandledRejection>(
  APP_ON_UNHANDLED_REJECTION,
)
