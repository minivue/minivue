/**
 * @description: toast组件的参数
 */
export interface KdToastOptions<T = false> {
  /** 是否hud显示 */
  hud?: T
  /** 图标 */
  icon?: T extends true
    ? 'loading' | 'success' | 'error' | (string & {})
    : 'info' | 'success' | 'warning' | 'error' | 'loading' | 'loading' | 'progress' | (string & {})
  /** 操作文案 */
  action?: string
  /** 文本内容 */
  content?: string
  /** 进度百分比 */
  percentage?: number
  /** 显示时长 */
  duration?: number
  /** 是否显示关闭按钮 */
  closeable?: boolean
  /**
   * 点击按钮回调函数
   */
  onAction?: () => void
}
