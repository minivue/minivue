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
  const page = getPage()
  page.$showToast(options)
}

export function hideToast() {
  const page = getPage()
  page.$hideToast()
}

export function showToastWithIcon(
  content: string,
  icon?: string,
  followUp?: boolean,
  percentage?: number,
) {
  showToast({ icon, content, followUp, percentage })
}

export function showInfoToast(content: string, followUp?: boolean) {
  showToastWithIcon(content, 'info', followUp)
}

export function showSuccessToast(content: string, followUp?: boolean) {
  showToastWithIcon(content, 'success', followUp)
}

export function showWarningToast(content: string, followUp?: boolean) {
  showToastWithIcon(content, 'warning', followUp)
}

export function showErrorToast(content: string, followUp?: boolean) {
  showToastWithIcon(content, 'error', followUp)
}

export function showLoadingToast(content: string, followUp?: boolean) {
  showToastWithIcon(content, 'loading', followUp)
}

export function showProgressToast(
  id: string,
  content: string,
  percentage: number,
  followUp?: boolean,
) {
  showToast({ id, icon: 'progress', content, percentage, followUp })
}
