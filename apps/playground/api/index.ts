import { getPage } from '@/components/utils'
import { ToastProps } from '@/type'

type KdToastOptions<T extends boolean> = ToastProps<T> & {
  /**
   * 点击按钮回调函数
   */
  onAction?: () => void
}

/**
 * 显示消息提示框
 * @param {KToastOptions | string} options toast参数
 * @returns Promise
 */
export function showToast<T extends boolean>(options: KdToastOptions<T> | string) {
  if (typeof options === 'string') {
    options = {
      content: options,
    }
  }
  options.id = options.id || Math.random().toString(36).slice(2)
  const page = getPage()
  page.$showToast(options)
}
