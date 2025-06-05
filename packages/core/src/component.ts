import { shallowReactive } from '@vue/reactivity'
import { ComponentInstance, ComponentOptions, DefineComponentFunction } from './type'
import { exclude, isFunction } from './utils'
import { callSetup } from './shared'
import {
  createHook,
  ON_ATTACHED,
  ON_CREATED,
  ON_DETACHED,
  ON_ERROR,
  ON_HIDE,
  ON_MOVED,
  ON_READY,
  ON_RESIZE,
  ON_SHOW,
  setCurrentInstance,
  triggerHook,
} from './lifecycle'

type HookOnCreated = () => void
type HookOnAttached = () => void
type HookOnMoved = () => void
type HookOnDetached = () => void
type HookOnError = (err: Error) => void
type HookOnShow = () => void
type HookOnHide = () => void
type HookOnResize = (size: WechatMiniprogram.Page.IResizeOption) => void

export const defineComponent: DefineComponentFunction = (options) => {
  const setup = options.setup as any
  const lifetimes = options.lifetimes || {}
  const props: Record<string, any> = options.props || {}
  const newOptions = exclude(options, ['setup', 'props', 'emits']) as ComponentOptions
  const propKeys = Object.keys(props)
  const observers: Record<string, any> = {}
  propKeys.forEach((key) => {
    props[key].type = props[key].type || null
    props[key].value = isFunction(props[key].default) ? props[key].default() : props[key].default
    delete props[key].default
    observers[key] = function (value: any) {
      const ctx = this
      let defaultValue = props[key].value
      defaultValue = defaultValue === null ? undefined : defaultValue
      ctx.__props__[key] = value === null ? defaultValue : value
    }
  })

  props.externalClass = null
  props.externalStyle = null
  newOptions.options = {
    multipleSlots: true,
    virtualHost: true,
    styleIsolation: 'shared',
  }
  // newOptions.data = callSetup(setup, {})
  newOptions.observers = observers
  newOptions.properties = props as WechatMiniprogram.Component.PropertyOption
  newOptions.lifetimes = {
    created(this: ComponentInstance) {
      lifetimes.created?.call(this)
      const ctx = this
      const rawProps: Record<string, any> = {}
      propKeys.forEach((property) => {
        // @ts-ignore
        const value = ctx.properties[property]
        rawProps[property] = value === null ? undefined : value
      })
      ctx.emit = (event: string, ...args: any[]) => ctx.triggerEvent(event, args)
      // @ts-ignore
      ctx.__props__ = shallowReactive(rawProps)
      triggerHook(this, ON_CREATED)
    },
    attached(this: ComponentInstance) {
      lifetimes.attached?.call(this)
      const ctx = this
      setCurrentInstance(ctx)
      // @ts-ignore
      callSetup(setup, ctx.__props__, ctx)
      setCurrentInstance()
      triggerHook(this, ON_ATTACHED)
    },
    ready(this: ComponentInstance) {
      lifetimes.ready?.call(this)
      triggerHook(this, ON_READY)
    },
    moved(this: ComponentInstance) {
      lifetimes.moved?.call(this)
      triggerHook(this, ON_MOVED)
    },
    detached(this: ComponentInstance) {
      lifetimes.detached?.call(this)
      triggerHook(this, ON_DETACHED)
    },
    error(this: ComponentInstance, error) {
      lifetimes.error?.call(this)
      triggerHook(this, ON_ERROR, error)
    },
  }

  newOptions.pageLifetimes = {
    show(this: ComponentInstance) {
      triggerHook(this, ON_SHOW)
    },
    hide(this: ComponentInstance) {
      triggerHook(this, ON_HIDE)
    },
    resize(this: ComponentInstance, size) {
      triggerHook(this, ON_RESIZE, size)
    },
  }
  // @ts-ignore
  return Component(newOptions) as any
}

/**
 * 在组件实例刚刚被创建时执行，注意此时不能调用 `setData`
 *
 * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export const onCreated = createHook<HookOnCreated>(ON_CREATED)

/**
 * 在组件实例进入页面节点树时执行
 *
 * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export const onAttached = createHook<HookOnAttached>(ON_ATTACHED)

/**
 * 在组件实例被移动到节点树另一个位置时执行
 *
 * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export const onMoved = createHook<HookOnMoved>(ON_MOVED)

/**
 * 在组件实例被从页面节点树移除时执行
 *
 * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export const onDetached = createHook<HookOnDetached>(ON_DETACHED)

/**
 * 每当组件方法抛出错误时执行
 *
 * 最低基础库版本：[`2.4.1`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
 */
export const onError = createHook<HookOnError>(ON_ERROR)

/** 生命周期回调—监听页面显示
 *
 * 页面显示/切入前台时触发。
 */
export const onPageShow = createHook<HookOnShow>(ON_SHOW)

/** 生命周期回调—监听页面隐藏
 *
 * 页面隐藏/切入后台时触发。 如 `navigateTo` 或底部 `tab` 切换到其他页面，小程序切入后台等。
 */
export const onPageHide = createHook<HookOnHide>(ON_HIDE)

/** 窗口尺寸改变时触发，最低基础库：`2.4.0` */
export const onPageResize = createHook<HookOnResize>(ON_RESIZE)
