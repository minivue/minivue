import { getPage } from '../utils'
import { KdToastOptions, KdActionSheetOptions, KdDialogOptions } from '../type'

/**
 * 显示对话框
 * @param {KdDialogOptions} options dialog参数
 */
export function showDialog(options: KdDialogOptions) {
  const page = getPage()
  page.$setDialogSlot(options.slot)
  page.$showDialog(options)
}

/**
 * 显示操作菜单
 * @param {KdActionSheetOptions} options actionSheet参数
 */
export function showActionSheet<T extends string>(options: KdActionSheetOptions<T>) {
  const page = getPage()
  page.$showActionSheet(options)
}

/**
 * 显示消息提示框
 * @param {KToastOptions | string} options toast参数
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

/**
 * 隐藏消息提示框
 */
export function hideToast() {
  const page = getPage()
  page.$hideToast()
}

/**
 * 显示消息提示框
 * @param {string} content toast内容
 * @param {string} icon toast图标
 * @param {boolean} followUp 是否跟随上一个toast变化
 */
export function showToastWithIcon(content: string, icon?: string, followUp?: boolean) {
  showToast({ icon, content, followUp })
}

/**
 * 显示信息提示框
 * @param {string} content toast内容
 * @param {boolean} followUp 是否跟随上一个toast变化
 */
export function showInfoToast(content: string, followUp?: boolean) {
  showToastWithIcon(content, 'info', followUp)
}

/**
 * 显示成功提示框
 * @param {string} content toast内容
 * @param {boolean} followUp 是否跟随上一个toast变化
 */
export function showSuccessToast(content: string, followUp?: boolean) {
  showToastWithIcon(content, 'success', followUp)
}

/**
 * 显示警告提示框
 * @param {string} content toast内容
 * @param {boolean} followUp 是否跟随上一个toast变化
 */
export function showWarningToast(content: string, followUp?: boolean) {
  showToastWithIcon(content, 'warning', followUp)
}

/**
 * 显示错误提示框
 * @param {string} content toast内容
 * @param {boolean} followUp 是否跟随上一个toast变化
 */
export function showErrorToast(content: string, followUp?: boolean) {
  showToastWithIcon(content, 'error', followUp)
}

/**
 * 显示加载提示框
 * @param {string} content toast内容
 * @param {boolean} followUp 是否跟随上一个toast变化
 */
export function showLoadingToast(content: string, followUp?: boolean) {
  showToastWithIcon(content, 'loading', followUp)
}

/**
 * 显示进度条
 * @param {string} id 进度条id
 * @param {string} content 进度条内容
 * @param {number} percentage 进度条百分比
 * @param {boolean} followUp 是否跟随上一个toast变化
 */
export function showProgressToast(
  id: string,
  content: string,
  percentage: number,
  followUp?: boolean,
) {
  showToast({ id, icon: 'progress', content, percentage, followUp })
}
