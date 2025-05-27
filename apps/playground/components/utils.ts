import { ComponentInstance } from '@minivue/core'
import { CSSProperties } from 'vue'

type ClassValue = string | number | boolean | undefined | null | Record<string, unknown>

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

export function styleObjectToString(styleObj: CSSProperties) {
  return Object.entries(styleObj)
    .map(([key, value]) => {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      return `${kebabKey}: ${value}`
    })
    .join(';')
}

export function clone<T>(original: T): T {
  return JSON.parse(JSON.stringify(original))
}

export function getAppBaseInfo() {
  return wx.getAppBaseInfo()
}

export function getWindowInfo() {
  return wx.getWindowInfo()
}

export function getMenuButtonBoundingClientRect() {
  return wx.getMenuButtonBoundingClientRect()
}

export function onThemeChange(listener: WechatMiniprogram.OnThemeChangeCallback) {
  wx.onThemeChange(listener)
}

export function navigateBack(options?: WechatMiniprogram.NavigateBackOption) {
  wx.navigateBack(options)
}

export function getPages() {
  return getCurrentPages()
}

export function getPage() {
  const pages = getPages()
  const page = pages[pages.length - 1]
  return page
}

export function getPageCtx() {
  const page = getPage()
  return page.$page as ComponentInstance
}

export function getRelationNodes(ctx: ComponentInstance, path: string) {
  return ctx.getRelationNodes(path)
}

export function vibrateShort() {
  wx.vibrateShort({ type: 'light' })
}

export function getRect(ctx: ComponentInstance, selector: string) {
  return new Promise<WechatMiniprogram.BoundingClientRectCallbackResult>((resolve) => {
    ctx.createSelectorQuery().select(selector).boundingClientRect(resolve).exec()
  })
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

/**
 * 获取弹出元素的坐标
 * @description 根据触发元素和弹出元素的选择器，计算弹出元素的位置，并考虑边界约束。
 * @param ctx 组件实例
 * @param trigger 触发元素选择器
 * @param popover 弹出元素选择器
 * @param placement  弹出位置
 * @returns 一个包含弹出元素位置的数组 [x, y]，表示弹出元素的左上角坐标。
 * @example
 * ```ts
 * const [x, y] = await getPopoverRect(this, '.trigger', '.popover', 'bottom');
 * this.popoverStyle = `left: ${x}px; top: ${y}px;`;
 * ```
 */
export async function getPopoverRect(
  ctx: ComponentInstance,
  trigger: string,
  popover: string,
  placement: Placement,
) {
  const {
    left: triggerLeft,
    right: triggerRight,
    bottom: triggerBottom,
    top: triggerTop,
    width: triggerWidth,
    height: triggerHeight,
  } = await getRect(ctx, trigger)

  const { width: popoverWidth, height: popoverHeight } = await getRect(ctx, popover)
  const { windowWidth: viewportWidth, windowHeight: viewportHeight } = getWindowInfo()

  const gap = 10 // 间距
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
  const isTopEnough = popoverAllTopY >= 0
  const isBottomEnough = popoverAllBottomY + popoverHeight <= viewportHeight
  const isLeftEnough = popoverAllLeftX >= 0
  const isRightEnough = popoverAllRightX + popoverWidth <= viewportWidth

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
    x = clamp(x, 0, viewportWidth - popoverWidth)
  } else {
    y = clamp(y, 0, viewportHeight - popoverHeight)
  }

  return [x, y]
}
