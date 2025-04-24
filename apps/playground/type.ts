export interface ToastProps<T extends boolean> {
  id?: string
  /** 是否hud显示 */
  hud?: T
  /** 是否显示 */
  show?: boolean
  /** 图标 */
  icon?: T extends true
    ? 'loading' | 'success' | 'error' | (string & {})
    : 'info' | 'success' | 'warning' | 'error' | 'loading' | 'loading' | 'progress' | (string & {})
  /** 操作文案 */
  action?: string
  /** 文本内容 */
  content?: string
  /** 显示时长 */
  duration?: number
  /** 是否显示关闭按钮 */
  closeable?: boolean
  /** 进度百分比 */
  percentage?: number
}
