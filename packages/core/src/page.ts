import { DefineComponentFunction, PageInstance, PageOptions } from './type'
import { exclude } from './utils'
import { callSetup } from './shared'
import {
  createHook,
  createLifecycle,
  Lifecycle,
  ON_ADD_TO_FAVORITES,
  ON_HIDE,
  ON_LOAD,
  ON_PAGE_SCROLL,
  ON_PULL_DOWN_REFRESH,
  ON_REACH_BOTTOM,
  ON_READY,
  ON_RESIZE,
  ON_ROUTE_DONE,
  ON_SAVE_ExiteState,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_TIMELINE,
  ON_SHOW,
  ON_TAB_ITEM_TAP,
  ON_UNLOAD,
  setCurrentInstance,
  triggerHook,
} from './lifecycle'

type HookOnLoad = (
  /** 打开当前页面路径中的参数 */
  query: Record<string, string | undefined>,
) => void
type HookOnShow = () => void
type HookOnReady = () => void
type HookOnHide = () => void
type HookOnUnload = () => void
type HookOnRouteDone = () => void
type HookOnPullDownRefresh = () => void
type HookOnReachBottom = () => void
type HookOnShareAppMessage = () => void
type HookOnShareTimeline = () => void
type HookOnAddToFavorites = () => void
type HookOnPageScroll = (options: WechatMiniprogram.Page.IPageScrollOption) => void
type HookOnResize = (options: WechatMiniprogram.Page.IResizeOption) => void
type HookOnTabItemTap = (options: WechatMiniprogram.Page.ITabItemTapOption) => void
type HookOnSaveExitState = () => void

/**
 * 注册小程序中的一个页面。接受一个 `Object` 类型参数，其指定页面的初始数据、生命周期回调、事件处理函数等。
 */
export const definePage: DefineComponentFunction = (options) => {
  const setup = options.setup

  const newOptions = exclude(options, ['setup', 'props']) as PageOptions

  newOptions.data = callSetup(setup as any, {})

  newOptions[ON_LOAD] = function (this: PageInstance, query: Record<string, string | undefined>) {
    setCurrentInstance(this)
    callSetup(setup as any, query, this)
    triggerHook(this, ON_LOAD, query)
    setCurrentInstance()
  }

  const allLifecycles: Lifecycle[] = [
    ON_SHOW,
    ON_READY,
    ON_HIDE,
    ON_UNLOAD,
    ON_ROUTE_DONE,
    ON_PULL_DOWN_REFRESH,
    ON_REACH_BOTTOM,
    ON_SHARE_APP_MESSAGE,
    ON_SHARE_TIMELINE,
    ON_ADD_TO_FAVORITES,
    ON_PAGE_SCROLL,
    ON_RESIZE,
    ON_TAB_ITEM_TAP,
    ON_SAVE_ExiteState,
  ]
  allLifecycles.forEach((name) => {
    newOptions[name] = createLifecycle(name)
  })
  return Page(newOptions) as any
}

/** 生命周期回调—监听页面加载
 *
 * 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
 */
export const onLoad = createHook<HookOnLoad>(ON_LOAD)

/** 生命周期回调—监听页面显示
 *
 * 页面显示/切入前台时触发。
 */
export const onShow = createHook<HookOnShow>(ON_SHOW)

/** 生命周期回调—监听页面初次渲染完成
 *
 * 页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
 *
 * 注意：对界面内容进行设置的 API 如`wx.setNavigationBarTitle`，请在`onReady`之后进行。
 */
export const onReady = createHook<HookOnReady>(ON_READY)

/** 生命周期回调—监听页面隐藏
 *
 * 页面隐藏/切入后台时触发。 如 `navigateTo` 或底部 `tab` 切换到其他页面，小程序切入后台等。
 */
export const onHide = createHook<HookOnHide>(ON_HIDE)

/** 生命周期回调—监听页面卸载
 *
 * 页面卸载时触发。如`redirectTo`或`navigateBack`到其他页面时。
 */
export const onUnload = createHook<HookOnUnload>(ON_UNLOAD)
export const onRouteDone = createHook<HookOnRouteDone>(ON_ROUTE_DONE)

/** 监听用户下拉动作
 *
 * 监听用户下拉刷新事件。
 * - 需要在`app.json`的`window`选项中或页面配置中开启`enablePullDownRefresh`。
 * - 可以通过`wx.startPullDownRefresh`触发下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。
 * - 当处理完数据刷新后，`wx.stopPullDownRefresh`可以停止当前页面的下拉刷新。
 */
export const onPullDownRefresh = createHook<HookOnPullDownRefresh>(ON_PULL_DOWN_REFRESH)

/** 页面上拉触底事件的处理函数
 *
 * 监听用户上拉触底事件。
 * - 可以在`app.json`的`window`选项中或页面配置中设置触发距离`onReachBottomDistance`。
 * - 在触发距离内滑动期间，本事件只会被触发一次。
 */
export const onReachBottom = createHook<HookOnReachBottom>(ON_REACH_BOTTOM)

/** 用户点击右上角转发
 *
 * 监听用户点击页面内转发按钮（`<button>` 组件 `open-type="share"`）或右上角菜单“转发”按钮的行为，并自定义转发内容。
 *
 * **注意：只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮**
 *
 * 此事件需要 return 一个 Object，用于自定义转发内容
 */
export const onShareAppMessage = createHook<HookOnShareAppMessage>(ON_SHARE_APP_MESSAGE)

/**
 * 监听右上角菜单“分享到朋友圈”按钮的行为，并自定义分享内容
 *
 * 本接口为 Beta 版本，暂只在 Android 平台支持，详见 [分享到朋友圈 (Beta)](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share-timeline.html)
 *
 * 基础库 2.11.3 开始支持，低版本需做兼容处理。
 */
export const onShareTimeline = createHook<HookOnShareTimeline>(ON_SHARE_TIMELINE)

/**
 * 监听用户点击右上角菜单“收藏”按钮的行为，并自定义收藏内容。
 * 基础库 2.10.3，安卓 7.0.15 版本起支持，iOS 暂不支持
 */
export const onAddToFavorites = createHook<HookOnAddToFavorites>(ON_ADD_TO_FAVORITES)

/** 页面滚动触发事件的处理函数
 *
 * 监听用户滑动页面事件。
 */
export const onPageScroll = createHook<HookOnPageScroll>(ON_PAGE_SCROLL)

/** 窗口尺寸改变时触发，最低基础库：`2.4.0` */
export const onResize = createHook<HookOnResize>(ON_RESIZE)

/** 当前是 tab 页时，点击 tab 时触发，最低基础库： `1.9.0` */
export const onTabItemTap = createHook<HookOnTabItemTap>(ON_TAB_ITEM_TAP)

/** 页面销毁前保留状态回调 */
export const onSaveExitState = createHook<HookOnSaveExitState>(ON_SAVE_ExiteState)
