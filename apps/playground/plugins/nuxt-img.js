import { defineComponent } from 'vue'

const BaseImage = defineComponent({
  name: 'BaseImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const isLoading = ref(true)
    const isError = ref(false)

    const onLoad = () => {
      isLoading.value = false
    }

    const onError = () => {
      isLoading.value = false
      isError.value = true
    }

    return { props, isLoading, isError, onLoad, onError }
  },
  template: `
    <div class="image-container">
      <div class="error-placeholder">图片加载失败</div>
    </div>
  `,
})

// 插件安装函数
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('BaseImage', BaseImage)
})
