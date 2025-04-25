import { getPage } from '@/components/utils'
import { KdToastOptions } from '@/type'

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
