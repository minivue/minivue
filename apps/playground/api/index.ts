import { getPage } from '@/components/utils'
import { KdToastOptions } from '@/type'
import { Ref } from 'vue'

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
  const page = getPage()
  page.$showToast(options)
}

export function showToastWithIcon(content: string, icon?: string, percentage?: Ref<number>) {
  showToast({ icon, content, percentage: percentage as any })
}

export function showInfoToast(content: string) {
  showToastWithIcon(content, 'info')
}

export function showSuccessToast(content: string) {
  showToastWithIcon(content, 'success')
}

export function showWarningToast(content: string) {
  showToastWithIcon(content, 'warning')
}

export function showErrorToast(content: string) {
  showToastWithIcon(content, 'error')
}

export function showLoadingToast(content: string) {
  showToastWithIcon(content, 'loading')
}

export function showProgressToast(content: string, percentage: Ref<number>) {
  showToastWithIcon(content, 'progress', percentage)
}
