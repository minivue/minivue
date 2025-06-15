import { ComponentInstance } from '@minivue/core'
import { CSSProperties } from 'vue'

type ClassValue = string | number | boolean | undefined | null | Record<string, unknown>

export const fontFamily = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'PingFang SC',
    'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei', '微软雅黑', sans-serif;`

/**
 * 将 class 参数转换为字符串。
 * @param args class 参数，可以是字符串、数字、布尔值、undefined、null 或对象。
 * @returns class 字符串。
 */
export function classObjectToString(...args: ClassValue[]): string {
  return args
    .flatMap((arg) => {
      if (!arg) return []
      if (typeof arg === 'string') return [arg]
      return Object.entries(arg)
        .filter(([, value]) => Boolean(value))
        .map(([key]) => key)
    })
    .join(' ')
}

/**
 * 将样式对象转换为字符串。
 * @param styleObj CSS 样式对象。
 * @returns 样式字符串。
 */
export function styleObjectToString(styleObj: CSSProperties) {
  return Object.entries(styleObj)
    .map(([key, value]) => {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      return `${kebabKey}: ${value}`
    })
    .join(';')
}

/**
 * 克隆一个对象。
 * @param original 要克隆的原始对象。
 * @returns 克隆后的新对象。
 * @template T
 */
export function clone<T>(original: T): T {
  return JSON.parse(JSON.stringify(original))
}

/**
 * 获取小程序基本信息。
 * @returns 小程序基本信息。
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getAppBaseInfo.html
 */
export function getAppBaseInfo() {
  return wx.getAppBaseInfo()
}

/**
 * 获取窗口信息。
 * @returns 窗口信息。
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getWindowInfo.html
 */
export function getWindowInfo() {
  return wx.getWindowInfo()
}

/**
 * 获取菜单按钮的布局位置信息。
 * @returns 菜单按钮的布局位置信息。
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/ui/menu/wx.getMenuButtonBoundingClientRect.html
 */
export function getMenuButtonBoundingClientRect() {
  return wx.getMenuButtonBoundingClientRect()
}

/**
 * 监听系统主题变化事件。
 * @param listener 系统主题变化事件的回调函数。
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onThemeChange.html
 */
export function onThemeChange(listener: WechatMiniprogram.OnThemeChangeCallback) {
  wx.onThemeChange(listener)
}

/**
 * 取消监听系统主题变化事件。
 * @param listener 系统主题变化事件的回调函数。
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offThemeChange.html
 */
export function offThemeChange(listener: WechatMiniprogram.OnThemeChangeCallback) {
  wx.offThemeChange(listener)
}

/**
 * 关闭当前页面，返回上一页面或多级页面。
 * @param options 配置项。
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html
 */
export function navigateBack(options?: WechatMiniprogram.NavigateBackOption) {
  wx.navigateBack(options)
}

/**
 * 获取当前页面栈。
 * @returns 当前页面栈。
 */
export function getPages() {
  return getCurrentPages()
}

/**
 * 获取当前页面实例。
 * @returns 当前页面实例。
 */
export function getPage() {
  const pages = getPages()
  const page = pages[pages.length - 1]
  return page
}

/**
 * 获取当前页面的组件实例。
 * @returns 当前页面的组件实例。
 */
export function getPageCtx() {
  const page = getPage()
  return page.$page as ComponentInstance
}

/**
 * 获取导航栏高度。
 * @returns 导航栏高度。
 */
export function getNavbarHeight() {
  const page = getPage()
  return (page.$navbarHeight || 0) as number
}

/**
 * 设置键盘高度。
 * @param height 键盘高度。
 */
export function setKeyboardHeight(height: number) {
  const ctx = getPageCtx()
  ctx.setKeyboardHeight(height)
}

/**
 * 根据路径获取关联节点。
 * @param ctx 组件实例。
 * @param path 关联节点路径。
 * @returns 关联节点。
 */
export function getRelationNodes(ctx: ComponentInstance, path: string) {
  return ctx.getRelationNodes(path)
}

/**
 * 使手机发生短促震动。
 */
export function vibrateShort() {
  wx.vibrateShort({ type: 'light' })
}

/**
 * 获取节点布局位置信息。
 * @param ctx 组件实例。
 * @param selector 选择器。
 * @returns 节点布局位置信息。
 */
export function getRect(ctx: ComponentInstance, selector: string) {
  return new Promise<WechatMiniprogram.BoundingClientRectCallbackResult>((resolve) => {
    ctx.createSelectorQuery().select(selector).boundingClientRect(resolve).exec()
  })
}

/**
 * 获取子元素相对于父元素的布局位置信息。
 * @param ctx 组件实例。
 * @param childSelector 子元素选择器。
 * @param parentSelector 父元素选择器。
 * @returns 子元素相对于父元素的布局位置信息。
 */
export async function getRelativeRect(
  ctx: ComponentInstance,
  childSelector: string,
  parentSelector: string,
) {
  const res1 = await getRect(ctx, childSelector)
  const res2 = await getRect(ctx, parentSelector)

  return {
    left: res1.left - res2.left,
    top: res1.top - res2.top,
    right: res2.right - res1.right,
    bottom: res2.bottom - res1.bottom,
    width: res1.width,
    height: res1.height,
  }
}

/**
 * 将页面滚动到目标位置。
 * @param ctx 组件实例。
 * @param viewSelector 滚动视图的选择器。
 * @param targetSelector 目标元素的选择器。
 */
export function scrollIntoView(
  ctx: ComponentInstance,
  viewSelector: string,
  targetSelector: string,
) {
  ctx
    .createSelectorQuery()
    .select(viewSelector)
    .node()
    .exec((res) => {
      const scrollView = res[0].node
      scrollView.scrollIntoView(targetSelector, {
        alignment: 'nearest',
      })
    })
}

/**
 * 监听元素与视口的相交状态。
 * @param ctx 组件实例。
 * @param selector 选择器。
 * @param margin 用来扩展（或收缩）参照节点布局区域的边界。
 * @param callback 相交状态改变时的回调函数。
 */
export function observeViewportIntersection(
  ctx: ComponentInstance,
  selector: string,
  margin: WechatMiniprogram.Margins,
  callback: WechatMiniprogram.IntersectionObserverObserveCallback,
) {
  ctx.createIntersectionObserver({}).relativeToViewport(margin).observe(selector, callback)
}

type Placement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'right'
  | 'rightTop'
  | 'rightBottom'
  | 'bottom'
  | 'bottomRight'
  | 'bottomLeft'
  | 'left'
  | 'leftTop'
  | 'leftBottom'

interface Coordinates {
  x: number
  y: number
}

/**
 * 获取页面容器的布局位置信息。
 * @returns 页面容器的布局位置信息。
 */
export async function getPageContainerRect() {
  const rect = await getRect(getPageCtx(), '.kd-page__content')
  if (!rect) {
    const { windowHeight, windowWidth } = getWindowInfo()
    return {
      left: 0,
      top: 0,
      bottom: windowHeight,
      right: windowWidth,
      width: windowWidth,
      height: windowHeight,
    } as WechatMiniprogram.BoundingClientRectCallbackResult
  }
  return rect
}

/**
 * 将驼峰命名转换为 BEM 风格的类名。
 * @param camelCase 驼峰命名的字符串。
 * @returns BEM 风格的类名。
 */
export function camelCaseToBem(camelCase: string) {
  return camelCase.replace(/[A-Z]/g, '-$&').toLowerCase()
}

/**
 * 延迟指定时间。
 * @param time 延迟时间，单位毫秒。
 * @returns 一个 Promise 对象，在指定时间后 resolve。
 */
export function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

/**
 * 获取弹出元素的坐标
 * @description 根据触发元素和弹出元素的选择器，计算弹出元素的位置，并考虑边界约束。
 * @param ctx 组件实例
 * @param trigger 触发元素选择器或坐标对象
 * @param popover 弹出元素选择器
 * @param placement 弹出位置
 * @param gap 弹出元素与触发元素之间的间距，默认为 0。
 * @returns 一个包含弹出元素位置的数组 [x, y]，表示弹出元素的左上角坐标。
 * @example
 * ```ts
 * const [x, y] = await getPopoverPosition(this, '.trigger', '.popover', 'bottom');
 * this.popoverStyle = `left: ${x}px; top: ${y}px;`;
 * ```
 */
export async function getPopoverPosition(
  ctx: ComponentInstance,
  trigger: string | Coordinates,
  popover: string,
  placement: Placement,
  gap = 0, // 间距
) {
  const getTriggerRect = async () => {
    if (typeof trigger === 'string') {
      return getRect(ctx, trigger)
    } else {
      const { x, y } = trigger
      return {
        left: x,
        top: y,
        right: x,
        bottom: y,
        width: 0,
        height: 0,
      }
    }
  }

  const {
    top: viewportTop,
    left: viewportLeft,
    right: viewportRight,
    bottom: viewportBottom,
  } = await getPageContainerRect()
  const {
    left: triggerLeft,
    right: triggerRight,
    bottom: triggerBottom,
    top: triggerTop,
    width: triggerWidth,
    height: triggerHeight,
  } = await getTriggerRect()
  const { width: popoverWidth, height: popoverHeight } = await getRect(ctx, popover)

  const isStartWith = (str: string, prefix: string) => str.startsWith(prefix)
  const isTopPosition = (p: string) => isStartWith(p, 'top')
  const isBottomPosition = (p: string) => isStartWith(p, 'bottom')
  const isLeftPosition = (p: string) => isStartWith(p, 'left')
  const isRightPosition = (p: string) => isStartWith(p, 'right')

  // popover在上边的时候，popover的Y坐标是一样的
  const popoverAllTopY = triggerTop - popoverHeight - gap
  // popover在下边的时候，popover的Y坐标是一样的
  const popoverAllBottomY = triggerBottom + gap
  // popover在右边的时候，popover的X坐标是一样的
  const popoverAllRightX = triggerRight + gap
  // popover在左边的时候，popover的X坐标是一样的
  const popoverAllLeftX = triggerLeft - popoverWidth - gap
  // popover在上边和下边的时候，popover的X坐标是一样的
  const popoverTopOrBottomX = triggerLeft + triggerWidth / 2 - popoverWidth / 2
  // popover在左边边和右边的时候，popover的Y坐标是一样的
  const popoverRightOrLeftY = triggerTop + triggerHeight / 2 - popoverHeight / 2
  // popover在上右和下右的时候，popover的X坐标是一样的
  const popoverTopRightOrBottomRightX = triggerRight - popoverWidth
  // popover在右下和左下的时候，popover的Y坐标是一样的
  const popoverRightBottomOrleftBottomY = triggerBottom - popoverHeight

  // 12个位置
  const placements = {
    top: [popoverTopOrBottomX, popoverAllTopY],
    topLeft: [triggerLeft, popoverAllTopY],
    topRight: [popoverTopRightOrBottomRightX, popoverAllTopY],
    right: [popoverAllRightX, popoverRightOrLeftY],
    rightTop: [popoverAllRightX, triggerTop],
    rightBottom: [popoverAllRightX, popoverRightBottomOrleftBottomY],
    bottom: [popoverTopOrBottomX, popoverAllBottomY],
    bottomLeft: [triggerLeft, popoverAllBottomY],
    bottomRight: [popoverTopRightOrBottomRightX, popoverAllBottomY],
    left: [popoverAllLeftX, popoverRightOrLeftY],
    leftTop: [popoverAllLeftX, triggerTop],
    leftBottom: [popoverAllLeftX, popoverRightBottomOrleftBottomY],
  }

  // 触碰到边界时，则需要往反方向弹出（上下、左右）
  const isTopEnough = popoverAllTopY >= viewportTop
  const isBottomEnough = popoverAllBottomY + popoverHeight <= viewportBottom
  const isLeftEnough = popoverAllLeftX >= viewportLeft
  const isRightEnough = popoverAllRightX + popoverWidth <= viewportRight

  if (isTopPosition(placement) && !isTopEnough) {
    placement = placement.replace('top', 'bottom') as Placement
  } else if (isBottomPosition(placement) && !isBottomEnough) {
    placement = placement.replace('bottom', 'top') as Placement
  } else if (isLeftPosition(placement) && !isLeftEnough) {
    placement = placement.replace('left', 'right') as Placement
  } else if (isRightPosition(placement) && !isRightEnough) {
    placement = placement.replace('right', 'left') as Placement
  }

  // 边界约束调整
  // 边界约束调整
  let [x, y] = placements[placement]

  // 通用边界约束函数
  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max))

  // 根据位置类型进行边界约束
  if (isTopPosition(placement) || isBottomPosition(placement)) {
    x = clamp(x, viewportLeft, viewportRight - popoverWidth)
  } else {
    y = clamp(y, viewportTop, viewportBottom - popoverHeight)
  }

  return [x, y, placement] as const
}
