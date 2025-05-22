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

export function getRelationNodes(ctx: ComponentInstance, path: string) {
  return ctx.getRelationNodes(path)
}

export function vibrateShort() {
  wx.vibrateShort({ type: 'light' })
}

export function getRect(
  ctx: ComponentInstance,
  selector: string,
): Promise<WechatMiniprogram.BoundingClientRectCallbackResult> {
  return new Promise<WechatMiniprogram.BoundingClientRectCallbackResult>((resolve) => {
    ctx.createSelectorQuery().select(selector).boundingClientRect(resolve).exec()
  })
}

/** 获取最大边界信息 */
function getMaxBounds(top: number, left: number, bottom: number, right: number) {
  const { windowWidth, windowHeight } = getWindowInfo()
  return {
    maxTop: top,
    maxRight: windowWidth - right,
    maxBottom: windowHeight - bottom,
    maxLeft: left,
  }
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

interface PlacementInfo {
  top: number
  left: number
}

/** 获取最近显示位置 */
async function getBestPlacement(
  ctx: ComponentInstance,
  triggerWidth: number,
  triggerHeight: number,
  maxTop: number,
  maxRight: number,
  maxBottom: number,
  maxLeft: number,
  placement: Placement,
  popover: string,
) {
  const { width, height } = await getRect(ctx, popover)

  if (placement.startsWith('left') && width > maxLeft && width < maxRight) {
    placement = placement.replace('left', 'right') as Placement
  } else if (placement.startsWith('right') && width > maxRight && width < maxLeft) {
    placement = placement.replace('right', 'left') as Placement
  } else if (placement.startsWith('top') && height > maxTop && height < maxBottom) {
    placement = placement.replace('top', 'bottom') as Placement
  } else if (placement.startsWith('bottom') && height > maxBottom && height < maxTop) {
    placement = placement.replace('bottom', 'top') as Placement
  }

  if (
    placement.includes('Left') &&
    width > maxRight + triggerWidth &&
    width < maxLeft + triggerWidth
  ) {
    placement = placement.replace('Left', 'Right') as Placement
  } else if (
    placement.includes('Right') &&
    width > maxLeft + triggerWidth &&
    width < maxRight + triggerWidth
  ) {
    placement = placement.replace('Right', 'Left') as Placement
  } else if (placement === 'bottom' || placement === 'top') {
    if (width / 2 > maxRight + triggerWidth / 2 && width / 2 < maxLeft + triggerWidth / 2) {
      placement += 'Right'
    } else if (width / 2 > maxLeft + triggerWidth / 2 && width / 2 < maxRight + triggerWidth / 2) {
      placement += 'Left'
    }
  } else if (placement === 'left' || placement === 'right') {
    if (height / 2 > maxTop + triggerHeight / 2 && width / 2 < maxBottom + triggerHeight / 2) {
      placement += 'Top'
    } else if (
      width / 2 > maxBottom + triggerHeight / 2 &&
      width / 2 < maxTop + triggerHeight / 2
    ) {
      placement += 'Bottom'
    }
  }
  return placement as Placement
}

async function getPlacements(top: number, left: number, width: number, height: number) {
  const placement = {} as Record<Placement, PlacementInfo>
  placement.top = {
    top,
    left: left + width / 2,
  }
  placement.topLeft = {
    top,
    left: left,
  }
  placement.topRight = {
    top,
    left: left + width,
  }
  placement.right = {
    top: top + height / 2,
    left: left + width,
  }
  placement.rightTop = {
    top: top,
    left: left + width,
  }
  placement.rightBottom = {
    top: top + height,
    left: left + width,
  }
  placement.bottom = {
    top: top + height,
    left: left + width / 2,
  }
  placement.bottomRight = {
    top: top + height,
    left: left + width,
  }
  placement.bottomLeft = {
    top: top + height,
    left: left,
  }
  placement.left = {
    top: top + height / 2,
    left: left,
  }
  placement.leftTop = {
    top: top,
    left: left,
  }
  placement.leftBottom = {
    top: top + height,
    left: left,
  }
  return placement
}

export async function getPopoverRect(
  ctx: ComponentInstance,
  trigger: string,
  popover: string,
  placement: Placement,
) {
  const { top, left, bottom, right, width, height } = await getRect(ctx, trigger)
  const { maxTop, maxRight, maxBottom, maxLeft } = getMaxBounds(top, left, bottom, right)
  const bestPlacement = await getBestPlacement(
    ctx,
    width,
    height,
    maxTop,
    maxRight,
    maxBottom,
    maxLeft,
    placement,
    popover,
  )
  const placements = await getPlacements(top, left, width, height)
  const bestPlacementInfo = placements[bestPlacement]
  return {
    placement: bestPlacement,
    top: bestPlacementInfo.top,
    left: bestPlacementInfo.left,
  }
}
