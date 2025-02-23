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

type HookOnLoad = (query: Record<string, string | undefined>) => void
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

export const definePage: DefineComponentFunction = (options) => {
  const setup = options.setup
  // options.data = callSetup(setup as any, {}, {}) as any
  const newOptions = exclude(options, ['setup', 'props']) as PageOptions
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

export const onLoad = createHook<HookOnLoad>(ON_LOAD)
export const onShow = createHook<HookOnShow>(ON_SHOW)
export const onReady = createHook<HookOnReady>(ON_READY)
export const onHide = createHook<HookOnHide>(ON_HIDE)
export const onUnload = createHook<HookOnUnload>(ON_UNLOAD)
export const onRouteDone = createHook<HookOnRouteDone>(ON_ROUTE_DONE)
export const onPullDownRefresh = createHook<HookOnPullDownRefresh>(ON_PULL_DOWN_REFRESH)
export const onReachBottom = createHook<HookOnReachBottom>(ON_REACH_BOTTOM)
export const onShareAppMessage = createHook<HookOnShareAppMessage>(ON_SHARE_APP_MESSAGE)
export const onShareTimeline = createHook<HookOnShareTimeline>(ON_SHARE_TIMELINE)
export const onAddToFavorites = createHook<HookOnAddToFavorites>(ON_ADD_TO_FAVORITES)
export const onPageScroll = createHook<HookOnPageScroll>(ON_PAGE_SCROLL)
export const onResize = createHook<HookOnResize>(ON_RESIZE)
export const onTabItemTap = createHook<HookOnTabItemTap>(ON_TAB_ITEM_TAP)
export const onSaveExitState = createHook<HookOnSaveExitState>(ON_SAVE_ExiteState)
