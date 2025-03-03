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

interface RootPortalProps {}

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

interface ButtonProps extends BaseProps {}

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

interface SwitchProps {}

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

interface NavigatorProps {}

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
    Span: DefineComponent<SpanProps>
    StickyHeader: DefineComponent<StickyHeaderProps>
    StickySection: DefineComponent<StickySectionProps>
    FunctionalPageNavigator: DefineComponent<FunctionalPageNavigatorProps>
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
