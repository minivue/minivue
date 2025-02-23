import {
  AppOptions,
  AppInstance,
  AppShowOption,
  AppLaunchOption,
  DefineComponentFunction,
} from './type'
import { exclude } from './utils'
import {
  createLifecycle,
  triggerHook,
  ON_LAUNCH,
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLED_REJECTION,
  Lifecycle,
  createHook,
  setCurrentInstance,
} from './lifecycle'

type HookOnShow = (options: AppShowOption) => void
type HookOnLaunch = (options: AppLaunchOption) => void
type HookOnHide = () => void
type HookOnError = (error: string) => void
type HookOnPageNotFound = (options: WechatMiniprogram.App.PageNotFoundOption) => void
type HookOnUnhandledRejection = (
  result: WechatMiniprogram.OnUnhandledRejectionCallbackResult,
) => void

/**
 * 使用给定的选项定义一个应用程序组件。
 *
 * @param options - 定义应用程序组件的选项。
 * @returns 定义的应用程序组件。
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
  const setup = options.setup
  const newOptions = exclude(options, ['setup']) as AppOptions
  newOptions[ON_LAUNCH] = function (this: AppInstance, e) {
    setCurrentInstance(this)
    // @ts-ignore
    setup()
    triggerHook(this, ON_LAUNCH, e)
    setCurrentInstance()
  }

  const allLifecycles: Lifecycle[] = [
    ON_SHOW,
    ON_HIDE,
    ON_ERROR,
    ON_PAGE_NOT_FOUND,
    ON_UNHANDLED_REJECTION,
  ]
  allLifecycles.forEach((name) => {
    newOptions[name] = createLifecycle(name)
  })

  return App(newOptions) as any
}

export const onAppLaunch = createHook<HookOnLaunch>(ON_LAUNCH)
export const onAppShow = createHook<HookOnShow>(ON_SHOW)
export const onAppHide = createHook<HookOnHide>(ON_HIDE)
export const onAppError = createHook<HookOnError>(ON_ERROR)
export const onPageNotFound = createHook<HookOnPageNotFound>(ON_PAGE_NOT_FOUND)
export const onUnhandledRejection = createHook<HookOnUnhandledRejection>(ON_UNHANDLED_REJECTION)
