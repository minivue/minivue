import { DefineComponent } from 'vue'

type Hook<T = () => void> = T | T[]

interface BaseProps {
  /** 手指触摸动作开始 */
  onTouchstart?: Hook<(e: WechatMiniprogram.TouchEvent) => void>
  /** 手指触摸后移动 */
  onTouchmove?: Hook<(e: WechatMiniprogram.TouchEvent) => void>
  /** 手指触摸动作被打断，如来电提醒，弹窗 */
  onTouchcancel?: Hook<(e: WechatMiniprogram.TouchEvent) => void>
  /** 手指触摸动作结束 */
  onTouchend?: Hook<(e: WechatMiniprogram.TouchEvent) => void>
  /** 手指触摸后马上离开 */
  onTap?: Hook<(e: WechatMiniprogram.BaseEvent) => void>
  /** 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发 */
  onLongpress?: Hook<(e: WechatMiniprogram.BaseEvent) => void>
  /** 手指触摸后，超过350ms再离开（推荐使用longpress事件代替） */
  onLongtap?: Hook<(e: WechatMiniprogram.BaseEvent) => void>
  /** 会在 WXSS transition 或 wx.createAnimation 动画结束后触发 */
  onTransitionend?: Hook<(e: WechatMiniprogram.CustomEvent) => void>
  /** 会在一个 WXSS animation 动画开始时触发 */
  onAnimationstart?: Hook<(e: WechatMiniprogram.CustomEvent) => void>
  /** 会在一个 WXSS animation 一次迭代结束时触发 */
  onAnimationiteration?: Hook<(e: WechatMiniprogram.CustomEvent) => void>
  /** 会在一个 WXSS animation 动画完成时触发 */
  onAnimationend?: Hook<(e: WechatMiniprogram.CustomEvent) => void>
  /** 在支持 3D Touch 的 iPhone 设备，重按时会触发 */
  onTouchforcechange?: Hook<(e: WechatMiniprogram.CustomEvent) => void>
}

interface CoverImageProps {}

interface CoverViewProps {}

interface MatchMediaProps {}

interface MovableAreaProps {}

interface MovableViewProps {}

interface PageContainerProps {}

interface RootPortalProps {
  /**
   * 是否从页面中脱离出来（默认true）
   */
  enable?: boolean
}

interface ScrollViewProps {}

interface SwiperProps {}

interface SwiperItemProps {}

interface ViewProps extends BaseProps {
  /**
   * 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果。
   */
  hoverClass?: string
  /**
   * 指定是否阻止本节点的祖先节点出现点击态
   */
  hoverStopPropagation?: boolean
  /**
   * 按住后多久出现点击态，单位毫秒, 默认值50
   */
  hoverStartTime?: number
  /**
   * 手指松开后点击态保留时间，单位毫秒，默认值400
   */
  hoverStayTime?: number
}

interface IconProps {}

interface ProgressProps {}

interface RichTextProps {}

interface SelectionProps {}

interface TextProps {
  /**
   * 文本是否可选，该属性会使文本节点显示为 inline-block
   */
  userSelect?: boolean
  /**
   * 文本溢出处理（skyline）
   * - clip: 超出部分被裁剪
   * - fade: 溢出部分渐隐
   * - ellipsis: 超出部分被省略
   * - visible: 超出部分可见
   * @default visible
   */
  overflow?: 'clip' | 'fade' | 'ellipsis' | 'visible'
  /**
   * 限制文本最大行数（skyline）
   */
  maxLines?: number
  /**
   * 显示连续空格（webview）
   */
  space?: 'ensp' | 'emsp' | 'nbsp'
  /**
   * 是否解码（webview）
   */
  decode?: boolean
}

interface ButtonProps extends BaseProps {
  /**
   * 按钮的大小
   * - default: 默认大小
   * - mini: 小尺寸
   */
  size?: 'default' | 'mini'
  /**
   * 按钮的样式类型
   * - primary: 主要按钮
   * - default: 默认按钮
   * - warn: 警告按钮
   */
  type?: 'primary' | 'default' | 'warn'
  /**
   * 按钮是否镂空，背景色透明
   */
  plain?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 名称前是否带 loading 图标
   */
  loading?: boolean
  /**
   * 用于 form 组件，点击分别会触发 form 组件的 submit/reset 事件
   */
  formType?: 'submit' | 'reset' | 'submitToGroup'
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
  /**
   * 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果
   */
  hoverClass?: string
  /**
   * 指定是否阻止本节点的祖先节点出现点击态
   */
  hoverStopPropagation?: boolean
  /**
   * 按住后多久出现点击态，单位毫秒 (默认：20)
   */
  hoverStartTime?: number
  /**
   * 手指松开后点击态保留时间，单位毫秒 (默认：70)
   */
  hoverStayTime?: number
  /**
   * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。
   */
  lang?: 'en' | 'zh_CN' | 'zh_TW'
}

interface CheckboxProps {}

interface CheckboxGroupProps {}

interface EditorProps {}

interface FormProps {}

interface InputProps {}

interface KeyboardAccessoryProps {}

interface LabelProps {}

interface PickerProps {}

interface PickerViewProps {}

interface PickerViewColumnProps {}

interface RadioProps {}

interface RadioGroupProps {}

interface SliderProps {}

interface SwitchProps {
  /**
   * 是否选中
   */
  checked?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 颜色
   */
  color?: string
  /**
   * 改变时触发 change 事件
   */
  onChange?: Hook<(e: WechatMiniprogram.SwitchChange) => void>
}

interface TextareaProps {}

interface DoubleTapGestureHandlerProps {}

interface ForcePressGestureHandlerProps {}

interface HorizontalDragGestureHandlerProps {}

interface LongPressGestureHandlerProps {}

interface PanGestureHandlerProps {}

interface ScaleGestureHandlerProps {}

interface TapGestureHandlerProps {}

interface VerticalDragGestureHandlerProps {}

interface DraggableSheetProps {}

interface GridBuilderProps {}

interface GridViewProps {}

interface ListBuilderProps {}

interface ListViewProps {}

interface NestedScrollBodyProps {}

interface NestedScrollHeaderProps {}

interface OpenContainerProps {}

interface OpenDataItemProps {}

interface OpenDataListProps {}

interface ShareElementProps {}

interface SnapshotProps {}

interface SpanProps {}

interface StickyHeaderProps {}

interface StickySectionProps {}

interface FunctionalPageNavigatorProps {}

interface NavigatorProps {
  /** 在哪个目标上发生跳转，默认当前小程序	 */
  target?: 'self' | 'miniProgram'
  /** 当前小程序内的跳转链接 */
  url?: string
  /** 跳转方式（默认navigate） */
  openType?: 'navigate' | 'redirect' | 'switchTab' | 'reLaunch' | 'exit' | 'navigateBack'
  /** 当 open-type 为 'navigateBack' 时有效，表示回退的层数（默认1） */
  delta?: number
}

interface AudioProps {}

interface CameraProps {}

interface ChannelLiveProps {}

interface ChannelVideoProps {}

interface ImageProps {}

interface LivePlayerProps {}

interface LivePusherProps {}

interface VideoProps {}

interface VoipRoomProps {}

interface MapProps {}

interface CanvasProps {}

interface AdProps {}

interface AdCustomProps {}

interface OfficialAccountProps {}

interface OpenDataProps {}

interface StoreHomeProps {}

interface StoreProductProps {}

interface WebViewProps {}

interface NavigationBarProps {}

interface PageMetaProps {}

declare module 'vue' {
  export interface GlobalComponents {
    /**
     * block 并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。
     */
    Block: DefineComponent<{}>
    CoverImage: DefineComponent<CoverImageProps>
    CoverView: DefineComponent<CoverViewProps>
    MatchMedia: DefineComponent<MatchMediaProps>
    MovableArea: DefineComponent<MovableAreaProps>
    MovableView: DefineComponent<MovableViewProps>
    PageContainer: DefineComponent<PageContainerProps>
    /**
     * 使整个子树从页面中脱离出来，类似于在 CSS 中使用 fixed position 的效果。主要用于制作弹窗、弹出层等。
     */
    RootPortal: DefineComponent<RootPortalProps>
    ScrollView: DefineComponent<ScrollViewProps>
    Swiper: DefineComponent<SwiperProps>
    SwiperItem: DefineComponent<SwiperItemProps>
    /**
     * 视图容器 [详情](https://developers.weixin.qq.com/miniprogram/dev/component/view.html)
     */
    View: DefineComponent<ViewProps>
    Icon: DefineComponent<IconProps>
    Progress: DefineComponent<ProgressProps>
    RichText: DefineComponent<RichTextProps>
    Selection: DefineComponent<SelectionProps>
    /**
     * 文本
     * - 内联文本只能用 text 组件，不能用 view，如 <text> foo <text>bar</text> </text>
     * - 新增 span 组件用于内联文本和图片，如 <span> <image> </image> <text>bar</text> </span>
     *
     * [详情](https://developers.weixin.qq.com/miniprogram/dev/component/text.html)
     */
    Text: DefineComponent<TextProps>
    /**
     * 按钮 [详情](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)
     */
    Button: DefineComponent<ButtonProps>
    Checkbox: DefineComponent<CheckboxProps>
    CheckboxGroup: DefineComponent<CheckboxGroupProps>
    Editor: DefineComponent<EditorProps>
    Form: DefineComponent<FormProps>
    Input: DefineComponent<InputProps>
    KeyboardAccessory: DefineComponent<KeyboardAccessoryProps>
    Label: DefineComponent<LabelProps>
    Picker: DefineComponent<PickerProps>
    PickerView: DefineComponent<PickerViewProps>
    PickerViewColumn: DefineComponent<PickerViewColumnProps>
    Radio: DefineComponent<RadioProps>
    RadioGroup: DefineComponent<RadioGroupProps>
    Slider: DefineComponent<SliderProps>
    Switch: DefineComponent<SwitchProps>
    Textarea: DefineComponent<TextareaProps>
    DoubleTapGestureHandler: DefineComponent<DoubleTapGestureHandlerProps>
    ForcePressGestureHandler: DefineComponent<ForcePressGestureHandlerProps>
    HorizontalDragGestureHandler: DefineComponent<HorizontalDragGestureHandlerProps>
    LongPressGestureHandler: DefineComponent<LongPressGestureHandlerProps>
    PanGestureHandler: DefineComponent<PanGestureHandlerProps>
    ScaleGestureHandler: DefineComponent<ScaleGestureHandlerProps>
    TapGestureHandler: DefineComponent<TapGestureHandlerProps>
    VerticalDragGestureHandler: DefineComponent<VerticalDragGestureHandlerProps>
    DraggableSheet: DefineComponent<DraggableSheetProps>
    GridBuilder: DefineComponent<GridBuilderProps>
    GridView: DefineComponent<GridViewProps>
    ListBuilder: DefineComponent<ListBuilderProps>
    ListView: DefineComponent<ListViewProps>
    NestedScrollBody: DefineComponent<NestedScrollBodyProps>
    NestedScrollHeader: DefineComponent<NestedScrollHeaderProps>
    OpenContainer: DefineComponent<OpenContainerProps>
    OpenDataItem: DefineComponent<OpenDataItemProps>
    OpenDataList: DefineComponent<OpenDataListProps>
    ShareElement: DefineComponent<ShareElementProps>
    Snapshot: DefineComponent<SnapshotProps>
    /**
     * 用于支持内联文本和 image / navigator 的混排（skyline）
     */
    Span: DefineComponent<SpanProps>
    StickyHeader: DefineComponent<StickyHeaderProps>
    StickySection: DefineComponent<StickySectionProps>
    FunctionalPageNavigator: DefineComponent<FunctionalPageNavigatorProps>
    /**
     * 页面链接
     * - navigator 在 Skyline 下视为文本节点，只能嵌套文本节点（如 text），不能嵌套 view、button 等普通节点，如 <button> <navigator>foo</navigator> </button>
     * - 新增 span 组件用于内联文本和图片，如 <span> <image> </image> <navigator>bar</navigator> </span>
     */
    Navigator: DefineComponent<NavigatorProps>
    Audio: DefineComponent<AudioProps>
    Camera: DefineComponent<CameraProps>
    ChannelLive: DefineComponent<ChannelLiveProps>
    ChannelVideo: DefineComponent<ChannelVideoProps>
    Image: DefineComponent<ImageProps>
    LivePlayer: DefineComponent<LivePlayerProps>
    LivePusher: DefineComponent<LivePusherProps>
    Video: DefineComponent<VideoProps>
    VoipRoom: DefineComponent<VoipRoomProps>
    Map: DefineComponent<MapProps>
    Canvas: DefineComponent<CanvasProps>
    Ad: DefineComponent<AdProps>
    AdCustom: DefineComponent<AdCustomProps>
    OfficialAccount: DefineComponent<OfficialAccountProps>
    OpenData: DefineComponent<OpenDataProps>
    StoreHome: DefineComponent<StoreHomeProps>
    StoreProduct: DefineComponent<StoreProductProps>
    WebView: DefineComponent<WebViewProps>
    NavigationBar: DefineComponent<NavigationBarProps>
    PageMeta: DefineComponent<PageMetaProps>
  }
}
