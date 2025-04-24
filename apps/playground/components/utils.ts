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

export function getRelationNodes(ctx: ComponentInstance, path: string) {
  return ctx.getRelationNodes(path)
}

export function vibrateShort() {
  wx.vibrateShort({ type: 'light' })
}
