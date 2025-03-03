import { ComponentInstance, ComponentOptions, DefineComponentFunction } from './type'
import { exclude } from './utils'
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
  const props = options.props
  const newOptions = exclude(options, ['setup', 'props', 'emits']) as ComponentOptions
  newOptions.properties = props as WechatMiniprogram.Component.PropertyOption
  newOptions.lifetimes = {
    created(this: ComponentInstance) {
      const ctx = this
      ctx.emit = (event: string, ...args: any[]) => ctx.triggerEvent(event, args)
      setCurrentInstance(ctx)
      callSetup(setup, ctx.properties, ctx)
      triggerHook(this, ON_CREATED)
      setCurrentInstance()
    },
    attached(this: ComponentInstance) {
      triggerHook(this, ON_ATTACHED)
    },
    ready(this: ComponentInstance) {
      triggerHook(this, ON_READY)
    },
    moved(this: ComponentInstance) {
      triggerHook(this, ON_MOVED)
    },
    detached(this: ComponentInstance) {
      triggerHook(this, ON_DETACHED)
    },
    error(this: ComponentInstance, error) {
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

  return Component(newOptions) as any
}

export const onCreated = createHook<HookOnCreated>(ON_CREATED)
export const onAttached = createHook<HookOnAttached>(ON_ATTACHED)
export const onMoved = createHook<HookOnMoved>(ON_MOVED)
export const onDetached = createHook<HookOnDetached>(ON_DETACHED)
export const onError = createHook<HookOnError>(ON_ERROR)
export const onPageShow = createHook<HookOnShow>(ON_SHOW)
export const onPageHide = createHook<HookOnHide>(ON_HIDE)
export const onPageResize = createHook<HookOnResize>(ON_RESIZE)
