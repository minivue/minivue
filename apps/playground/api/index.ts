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

export function showToastWithIcon(
  content: string,
  icon?: string,
  followUp?: boolean,
  percentage?: Ref<number>,
) {
  showToast({ icon, content, followUp, percentage: percentage as any })
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

export function showLoadingToast(content: string) {
  showToastWithIcon(content, 'loading')
}

export function showProgressToast(content: string, percentage: Ref<number>) {
  showToastWithIcon(content, 'progress', false, percentage)
}
