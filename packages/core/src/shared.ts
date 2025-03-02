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

export function callSetup(setup: Function, query: Record<string, string | undefined>, ctx: any) {
  const bindings = setup?.(query as any, ctx) as Record<string, any>
  if (bindings !== undefined) {
    let data: Record<string, unknown> | undefined
    Object.keys(bindings).forEach((key) => {
      const value = bindings[key]
      if (isFunction(value)) {
        if (ctx) {
          ctx[key] = (e: any) => {
            const eventType = e.type
            const args = e.mark[eventType]
            if (args) {
              value(...args)
            } else {
              value(e)
            }
          }
        }
        return
      }

      data = data || {}
      data[key] = deepToRaw(value)
      if (ctx) {
        deepWatch.call(ctx, key, value)
      }
    })
    if (data !== undefined && ctx && ctx.setData) {
      ctx.setData(data, flushPostFlushCbs)
    }
    return data
  }
}
