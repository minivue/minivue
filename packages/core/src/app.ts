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
  result: WechatMiniprogram.OnUnhandledRejectionListenerResult,
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
    setup?.({}, {})
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

/** 生命周期回调—监听小程序初始化
 *
 * 小程序初始化完成时触发，全局只触发一次。
 */
export const onAppLaunch = createHook<HookOnLaunch>(ON_LAUNCH)

/** 生命周期回调—监听小程序显示
 *
 * 小程序启动，或从后台进入前台显示时
 */
export const onAppShow = createHook<HookOnShow>(ON_SHOW)

/** 生命周期回调—监听小程序隐藏
 *
 * 小程序从前台进入后台时
 */
export const onAppHide = createHook<HookOnHide>(ON_HIDE)

/** 错误监听函数
 *
 * 小程序发生脚本错误，或者 api
 */
export const onAppError = createHook<HookOnError>(ON_ERROR)

/** 页面不存在监听函数
 *
 * 小程序要打开的页面不存在时触发，会带上页面信息回调该函数
 *
 * **注意：**
 * 1. 如果开发者没有添加 `onPageNotFound` 监听，当跳转页面不存在时，将推入微信客户端原生的页面不存在提示页面。
 * 2. 如果 `onPageNotFound` 回调中又重定向到另一个不存在的页面，将推入微信客户端原生的页面不存在提示页面，并且不再回调 `onPageNotFound`。
 *
 * 最低基础库： 1.9.90
 */
export const onPageNotFound = createHook<HookOnPageNotFound>(ON_PAGE_NOT_FOUND)

/**
 * 小程序有未处理的 Promise 拒绝时触发。也可以使用 [wx.onUnhandledRejection](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onUnhandledRejection.html) 绑定监听。注意事项请参考 [wx.onUnhandledRejection](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onUnhandledRejection.html)。
 * **参数**：与 [wx.onUnhandledRejection](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onUnhandledRejection.html) 一致
 */
export const onUnhandledRejection = createHook<HookOnUnhandledRejection>(ON_UNHANDLED_REJECTION)
