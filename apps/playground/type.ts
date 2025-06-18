export interface KdActionSheetItem<T extends string> {
  text: string
  action: T
  icon?: string
  disabled?: boolean
  danger?: boolean
  /**
   * 微信开放能力
   *
   * - contact: 打开客服会话，如果用户在会话中点击消息卡片后返回小程序，可以从 bindcontact 回调中获得具体信息，[具体说明](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/customer-message/customer-message.html)。鸿蒙 OS 暂不支持
   * - liveActivity: 通过前端获取[新的一次性订阅消息下发机制](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message-2.html)使用的 code
   * - share: 触发用户转发，使用前建议先阅读[使用指引](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share.html#%E4%BD%BF%E7%94%A8%E6%8C%87%E5%BC%95)
   * - getPhoneNumber: 手机号快速验证，向用户申请，并在用户同意后，快速填写和验证手机，[具体说明](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html) （*小程序插件中不能使用*）
   * - getRealtimePhoneNumber: 手机号实时验证，向用户申请，并在用户同意后，快速填写和实时验证手机号。[具体说明](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getRealtimePhoneNumber.html) （*小程序插件中不能使用*）
   * - getUserInfo: 获取用户信息，可以从bindgetuserinfo回调中获取到用户信息 （*小程序插件中不能使用*）
   * - launchApp: 打开APP，可以通过app-parameter属性设定向APP传的参数[具体说明](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/launchApp.html)。鸿蒙 OS 暂不支持
   * - openSetting: 打开授权设置页
   * - feedback: 打开“意见反馈”页面，用户可提交反馈内容并上传[日志](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/wx.getLogManager.html)，开发者可以登录小程序管理后台后进入左侧菜单“客服反馈”页面获取到反馈内容
   * - chooseAvatar: 获取用户头像，可以从bindchooseavatar回调中获取到头像信息
   * - agreePrivacyAuthorization: 用户同意隐私协议按钮。用户点击一次此按钮后，所有已声明过的隐私接口可以正常调用。可通过 bindagreeprivacyauthorization 监听用户同意隐私协议事件。隐私合规开发指南详情可见[《小程序隐私协议开发指南》](https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/PrivacyAuthorize.html)
   */
  openType?:
    | 'contact'
    | 'liveActivity'
    | 'share'
    | 'getPhoneNumber'
    | 'getRealtimePhoneNumber'
    | 'getUserInfo'
    | 'launchApp'
    | 'openSetting'
    | 'feedback'
    | 'chooseAvatar'
    | 'agreePrivacyAuthorization'
}

export interface KdActionSheetOptions<T extends string> {
  /** 标题 */
  title?: string
  items: KdActionSheetItem<T>[]
  /**
   * 点击操作按钮回调函数
   */
  onAction: (action: T) => void
  /**
   * 点击取消按钮回调函数
   */
  onCancel?: () => void
}

export interface KdToastOptions<T> {
  /** 指定toast的id可以后续对某个toast属性进行修改，比如percentage */
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
  /** 是否直接在上一个toast上进行切换 */
  followUp?: boolean
  /**
   * 点击操作按钮回调函数
   */
  onAction?: () => void
  /**
   * 点击关闭按钮回调函数
   */
  onClose?: () => void
  /**
   * 隐藏回调函数
   */
  onHide?: () => void
}

export interface KdDialogOptions {
  /** 自定义弹窗内容的插槽名称 */
  slot?: string
  /** 图标，可选值为 'info', 'success', 'warning', 'error' 或自定义字符串 */
  icon?: 'info' | 'success' | 'warning' | 'error' | (string & {})
  /** 图标大小 */
  iconSize?: number
  /** 对话框标题 */
  title?: string
  /** 图片链接 */
  image?: string
  /** 图片尺寸，可选值为 's', 'm' */
  imageSize?: 's' | 'm'
  /** 图片宽度（最好设置，避免图片加载导致抖动） */
  imageWidth?: number | string
  /** 图片高度（最好设置，避免图片加载导致抖动） */
  imageHeight?: number | string
  /** 对话框内容 */
  content?: string
  /** 是否显示关闭按钮 */
  showClose?: boolean
  /** 是否显示取消按钮 */
  showCancel?: boolean
  /** 取消按钮文字 */
  cancelText?: string
  /** 确认按钮文字 */
  confirmText?: string
  /** 确认按钮类型，可选值为 'danger' */
  confirmType?: 'danger'
  /**
   * 点击操作按钮回调函数
   */
  onClose?: () => void
  /**
   * 点击取消按钮回调函数
   */
  onCancel?: () => void
  /**
   * 点击确认按钮回调函数
   */
  onConfirm?: () => void
}
