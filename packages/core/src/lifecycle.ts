import { onMounted, onUnmounted, getCurrentInstance } from 'vue'
import { doc } from './bom'
import { getCurrentPage } from './page'
import { PageLifecycle } from './enums'
import { removeItem, toHiddenField } from './utils'

const showHooks = [] as Function[]
const hideHooks = [] as Function[]

function triggerVisibilityHooks() {
  if (doc?.visibilityState === 'hidden') {
    hideHooks.forEach(hook => hook())
  } else {
    showHooks.forEach(hook => hook())
  }
}

doc?.addEventListener('visibilitychange', triggerVisibilityHooks)

// 将钩子注入到当前实例中
function injectHook(
  currentInstance: any,
  lifecycle: PageLifecycle,
  hook: Function,
): void {
  const hiddenField = toHiddenField(lifecycle)
  if (currentInstance[hiddenField] === undefined) {
    currentInstance[hiddenField] = []
  }
  currentInstance[hiddenField].push(hook)
}

// 创建页面钩子
function createPageHook<T extends Function>(
  lifecycle: PageLifecycle,
) {
  return (hook: T): void => {
    if (__MINIVUE__) {
      const currentPage = getCurrentPage()
      if (currentPage) {
        injectHook(currentPage, lifecycle, hook)
      } else if (__DEV__) {
        console.warn('Page specific lifecycle injection APIs can only be used during execution of setup() in definePage() or defineComponent().')
      }
    } else {
      const currentInstance = getCurrentInstance() as any
      if (lifecycle === PageLifecycle.ON_LOAD) {
        onMounted(hook)
      } else if (lifecycle === PageLifecycle.ON_UNLOAD) {
        if (currentInstance) {
          const showHooks = (currentInstance[PageLifecycle.ON_SHOW] || []) as Function[]
          const hideHooks = (currentInstance[PageLifecycle.ON_HIDE] || []) as Function[]
          showHooks.forEach((hook) => removeItem(showHooks, hook))
          hideHooks.forEach((hook) => removeItem(showHooks, hook))
        }
        onUnmounted(hook)
      } else if (lifecycle === PageLifecycle.ON_SHOW) {
        injectHook(currentInstance, lifecycle, hook)
        showHooks.push(hook)
        triggerVisibilityHooks()
      } else if (lifecycle === PageLifecycle.ON_HIDE) {
        injectHook(currentInstance, lifecycle, hook)
        hideHooks.push(hook)
      }
    }
  }
}

export const onLoad = createPageHook(PageLifecycle.ON_LOAD)
export const onUnload = createPageHook(PageLifecycle.ON_UNLOAD)
export const onShow = createPageHook(PageLifecycle.ON_SHOW)
export const onHide = createPageHook(PageLifecycle.ON_HIDE)


