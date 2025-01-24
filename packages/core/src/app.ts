import { defineComponent } from 'vue'
import { DefineComponentFunction } from './type'
import { exclude, toHiddenField } from './utils'

type AppShowOption = WechatMiniprogram.App.LaunchShowOption
type AppLaunchOption = WechatMiniprogram.App.LaunchShowOption
type AppOptions = WechatMiniprogram.App.Options<WechatMiniprogram.IAnyObject>
type AppInstance = WechatMiniprogram.App.Instance<WechatMiniprogram.IAnyObject>
type HookOnShow = (options: AppShowOption) => void
type HookOnLaunch = (options: AppLaunchOption) => void

// App的钩子
export const APP_ON_SHOW = 'onShow'
export const APP_ON_HIDE = 'onHide'
export const APP_ON_ERROR = 'onError'
export const APP_ON_LAUNCH = 'onLaunch'
export const APP_ON_THEME_CHANGE = 'onThemeChange'
export const APP_ON_PAGE_NOT_FOUND = 'onPageNotFound'
export const APP_ON_UNHANDLED_REJECTION = 'onUnhandledRejection'
export type AppLifecycle =
  | typeof APP_ON_SHOW
  | typeof APP_ON_HIDE
  | typeof APP_ON_ERROR
  | typeof APP_ON_LAUNCH
  | typeof APP_ON_THEME_CHANGE
  | typeof APP_ON_PAGE_NOT_FOUND
  | typeof APP_ON_UNHANDLED_REJECTION

let appInstance: AppInstance | undefined
let appShowOptions = {} as AppShowOption
let appLaunchOptions = {} as AppLaunchOption

const hookWarn =
  'App specific lifecycle injection APIs can only be used during execution of setup() '

/**
 * 获取应用程序启动选项。
 *
 * @returns 应用程序启动选项。
 */
export function getAppLaunchOptions() {
  return appLaunchOptions
}

/**
 * 获取应用程序显示选项。
 *
 * @returns 应用程序显示选项。
 */
export function getAppShowOptions() {
  return appShowOptions
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
    appLaunchOptions = e
    // @ts-ignore
    setup()
    const hooks = appInstance[toHiddenField(APP_ON_LAUNCH)] || []
    hooks.forEach((hook: HookOnLaunch) => hook(e))
    appInstance = undefined
  }
  newOptions[APP_ON_SHOW] = function (this: AppInstance, e) {
    appShowOptions = e
  }
  return App(newOptions) as any
}

export function onAppLaunch(hook: HookOnLaunch) {
  if (appInstance) {
    const hiddenField = toHiddenField(APP_ON_LAUNCH)
    const hooks = appInstance[hiddenField] || []
    hooks.push(hook)
    appInstance[hiddenField] = hooks
  } else if (__DEV__) {
    console.warn(hookWarn)
  }
}

export function onAppShow(hook: HookOnShow) {
  if (appInstance) {
    const hiddenField = toHiddenField(APP_ON_SHOW)
    const hooks = appInstance[hiddenField] || []
    hooks.push(hook)
    appInstance[hiddenField] = hooks
  } else if (__DEV__) {
    console.warn(hookWarn)
  }
}
