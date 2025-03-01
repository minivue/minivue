import { DefineComponent } from 'vue'

type Hook<T = () => void> = T | T[]

interface BaseProps {}

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
  onBeforeEnter?: Hook<(el: any) => void>
}

declare module 'vue' {
  export interface GlobalComponents {
    /**
     * 视图容器 [详情](https://developers.weixin.qq.com/miniprogram/dev/component/view.html)
     */
    View: DefineComponent<ViewProps>
  }
}
