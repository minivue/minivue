import { onMounted, onUnmounted, getCurrentInstance } from 'vue'
import { getCurrentPage } from './page'
import { PAGE_ON_LOAD, PAGE_ON_UNLOAD, PAGE_ON_SHOW, PAGE_ON_HIDE } from './page'
import { removeItem, toHiddenField } from './utils'

const showHooks = [] as Function[]
const hideHooks = [] as Function[]


// 将钩子注入到当前实例中
function injectHook(currentInstance: any, lifecycle: string, hook: Function): void {
  const hiddenField = toHiddenField(lifecycle)
  if (currentInstance[hiddenField] === undefined) {
    currentInstance[hiddenField] = []
  }
  currentInstance[hiddenField].push(hook)
}

// 创建页面钩子
function createPageHook<T extends Function>(lifecycle: string) {
  return (hook: T): void => {
    if (__MINIVUE__) {
      const currentPage = getCurrentPage()
      if (currentPage) {
        injectHook(currentPage, lifecycle, hook)
      } else if (__DEV__) {
        console.warn(
          'Page specific lifecycle injection APIs can only be used during execution of setup() in definePage() or defineComponent().',
        )
      }
    } else {
      const currentInstance = getCurrentInstance() as any
      if (lifecycle === PAGE_ON_LOAD) {
        onMounted(hook)
      } else if (lifecycle === PAGE_ON_UNLOAD) {
        if (currentInstance) {
          const showHooks = (currentInstance[PAGE_ON_SHOW] || []) as Function[]
          const hideHooks = (currentInstance[PAGE_ON_HIDE] || []) as Function[]
          showHooks.forEach((hook) => removeItem(showHooks, hook))
          hideHooks.forEach((hook) => removeItem(showHooks, hook))
        }
        onUnmounted(hook)
      } else if (lifecycle === PAGE_ON_SHOW) {
        injectHook(currentInstance, lifecycle, hook)
        showHooks.push(hook)
      } else if (lifecycle === PAGE_ON_HIDE) {
        injectHook(currentInstance, lifecycle, hook)
        hideHooks.push(hook)
      }
    }
  }
}

export const onLoad = createPageHook(PAGE_ON_LOAD)
export const onUnload = createPageHook(PAGE_ON_UNLOAD)
export const onShow = createPageHook(PAGE_ON_SHOW)
export const onHide = createPageHook(PAGE_ON_HIDE)
