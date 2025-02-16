import { defineComponent } from 'vue'
import {
  AppOptions,
  AppInstance,
  AppShowOption,
  AppLaunchOption,
  DefineComponentFunction,
} from './type'
import { exclude } from './utils'
import { initEvent, isClient, onDocHide, onDocShow } from './bom'
import {
  createLifecycle,
  injectHook,
  triggerHook,
  ON_LAUNCH,
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLED_REJECTION,
} from './lifecycle'

type HookOnShow = (options: AppShowOption) => void
type HookOnLaunch = (options: AppLaunchOption) => void
type HookOnHide = () => void
type HookOnError = (error: string) => void
type HookOnPageNotFound = (options: WechatMiniprogram.App.PageNotFoundOption) => void
type HookOnUnhandledRejection = (
  result: WechatMiniprogram.OnUnhandledRejectionCallbackResult,
) => void

let appInstance: AppInstance | undefined

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
    initEvent()
    return defineComponent(options)
  }
  const setup = options.setup
  const newOptions = exclude(options, ['setup']) as AppOptions
  newOptions[ON_LAUNCH] = function (this: AppInstance, e) {
    appInstance = this
    // @ts-ignore
    setup({}, {})
    triggerHook(appInstance, ON_LAUNCH, e)
    appInstance = undefined
  }
  newOptions[ON_SHOW] = createLifecycle(ON_SHOW)
  newOptions[ON_HIDE] = createLifecycle(ON_HIDE)
  newOptions[ON_ERROR] = createLifecycle(ON_ERROR)
  newOptions[ON_PAGE_NOT_FOUND] = createLifecycle(ON_PAGE_NOT_FOUND)
  newOptions[ON_UNHANDLED_REJECTION] = createLifecycle(ON_UNHANDLED_REJECTION)
  return App(newOptions) as any
}

export function onAppLaunch(hook: HookOnLaunch) {
  if (__MINIVUE__) {
    injectHook(appInstance, ON_LAUNCH, hook)
  } else if (isClient) {
    hook({ path: '', query: {}, scene: 1001, shareTicket: '' })
  }
}

export function onAppShow(hook: HookOnShow) {
  if (__MINIVUE__) {
    injectHook(appInstance, ON_SHOW, hook)
  } else if (isClient) {
    const options: AppShowOption = { path: '', query: {}, scene: 1001, shareTicket: '' }
    hook(options)
    onDocShow(() => hook(options))
  }
}

export function onAppHide(hook: HookOnHide) {
  if (__MINIVUE__) {
    injectHook(appInstance, ON_HIDE, hook)
  } else {
    onDocHide(hook)
  }
}

export function onAppError(hook: HookOnError) {
  if (__MINIVUE__) {
    injectHook(appInstance, ON_ERROR, hook)
  }
}

export function onPageNotFound(hook: HookOnPageNotFound) {
  if (__MINIVUE__) {
    injectHook(appInstance, ON_PAGE_NOT_FOUND, hook)
  }
}

export function onUnhandledRejection(hook: HookOnUnhandledRejection) {
  if (__MINIVUE__) {
    injectHook(appInstance, ON_UNHANDLED_REJECTION, hook)
  }
}
