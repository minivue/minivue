// import { DefineComponent } from 'vue'
// type Hook<T = () => void> = T | T[]
// // 定义组件 props 类型
// interface MyGlobalComponentProps {
//   /**
//    * 消息
//    */
//   message?: string
//   onBeforeEnter?: Hook<(el: HostElement) => void>
// }

// declare module 'vue' {
//   export interface IntrinsicElementAttributes {
//     /**
//      * 全局组件
//      */
//     view: DefineComponent<MyGlobalComponentProps>
//   }
// }

declare module 'vue' {
  // 覆盖 IntrinsicElementAttributes 类型
  export interface IntrinsicElementAttributes {
    view: SVGAttributes
  }
}
