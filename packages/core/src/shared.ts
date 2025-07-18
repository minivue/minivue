import { isRef, isProxy, toRaw } from '@vue/reactivity'
import { watch } from './watch'
import { flushPostFlushCbs } from './scheduler'
import { isArray, getType, isSimpleValue, isObject, isPlainObject, isFunction } from './utils'

export function deepToRaw(x: unknown): unknown {
  if (isSimpleValue(x) || isFunction(x)) {
    return x
  }

  if (isRef(x)) {
    return deepToRaw(x.value)
  }

  if (isProxy(x)) {
    return deepToRaw(toRaw(x))
  }

  if (isArray(x)) {
    return x.map((item) => deepToRaw(item))
  }

  if (isPlainObject(x)) {
    const obj: Record<string, unknown> = {}
    Object.keys(x).forEach((key) => {
      obj[key] = deepToRaw(x[key])
    })
    return obj
  }

  throw new TypeError(`${getType(x)} value is not supported`)
}

export function deepWatch(
  this: Pick<WechatMiniprogram.Component.InstanceMethods<Record<string, unknown>>, 'setData'>,
  key: string,
  value: unknown,
): void {
  if (!isObject(value)) {
    return
  }

  watch(
    isRef(value) ? value : () => value,
    () => {
      this.setData({ [key]: deepToRaw(value) }, flushPostFlushCbs)
    },
    {
      deep: true,
    },
  )
}

export function callSetup(setup: Function, props: Record<string, string | undefined>, ctx?: any) {
  const bindings = (setup?.(props as any, ctx || {}) as Record<string, any>) || {}
  const data: Record<string, any> = {}
  Object.keys(bindings).forEach((key) => {
    const value = bindings[key]
    if (isFunction(value) && ctx) {
      ctx[key] = (e: any) => {
        const eventType = e.type
        const args = e.mark?.[eventType]
        const detail = e.detail
        if (args) {
          // 自定义参数，比如在wxml里面的@click="handleClick(1, 2)"，那么args就是[1, 2]
          // 如何需要默认事件，则是写成@click="handleClick($event, 1, 2)"
          value(...args.map((a: any) => (a === '$$event$$' ? e : a)))
        } else if (detail && isArray(detail)) {
          // 自定义事件参数，比如自定义事件emit('change', 1, 2)，那么detail就是[1, 2]
          value(...detail)
        } else if (e) {
          // 默认事件参数，比如在wxml里面的@click="handleClick"，那么就是这个
          value(e)
        }
      }
      return
    }
    if (value === ctx) {
      return
    }
    data[key] = deepToRaw(value)
    if (ctx) {
      deepWatch.call(ctx, key, value)
    }
  })
  if (ctx) {
    ctx.setData(data, flushPostFlushCbs)
  }
  return data
}
