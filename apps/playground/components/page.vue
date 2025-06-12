<template>
  <View :class="classes">
    <KdNavbar
      v-if="!hideNavbar"
      :title="title"
      :actions="actions"
      @action="onNavbarAction"
      @attached="onNavbarAttached"
    >
      <slot slot="left" name="navbar_left" />
      <slot name="navbar_center" />
      <slot slot="right" name="navbar_right" />
    </KdNavbar>
    <slot name="top" />
    <ScrollView class="kd-page__content" scroll-y type="list">
      <slot />
    </ScrollView>
    <slot name="bottom" />
    <View :style="keyboardHeight"></View>
    <RootPortal>
      <View :class="rootClasses" :style="'font-family:' + fontFamily">
        <View v-if="toasts" class="kd-toast-area" :style="navbarStyle">
          <KdToast
            v-for="toast in toasts"
            :key="toast.id"
            :hud="toast.hud"
            :icon="toast.icon"
            :action="toast.action"
            :content="toast.content"
            :duration="toast.duration"
            :closeable="toast.closeable"
            :percentage="toast.percentage"
            @hide="onToastHide(toast)"
            @close="toast.onClose"
            @action="toast.onAction"
          />
        </View>
      </View>
    </RootPortal>
  </View>
  <KdActionsheet />
</template>

<script setup lang="ts">
import { computed, ref, getCurrentInstance, onAttached, onDetached } from '@minivue/core'
import { fontFamily, clone, getAppBaseInfo, getPage, onThemeChange, offThemeChange } from './utils'

import KdToast from './toast.vue'
import KdNavbar from './navbar.vue'
import KdActionsheet from './actionsheet.vue'
import { KdToastOptions } from '../type'

defineOptions({
  name: 'KdPage',
})

interface Action {
  /** 图标 */
  icon: string
  /** 行为 */
  action: string
}

interface Props {
  /** 页面标题 */
  title?: string
  /** 左上角按钮 */
  actions?: Action[]
  /** 是否隐藏导航栏 */
  hideNavbar?: boolean
}

interface Events {
  /** 按钮点击 */
  action: [action: string]
}

const appBaseInfo = getAppBaseInfo()

const emit = defineEmits<Events>()

const { title, actions = [], hideNavbar } = defineProps<Props>()

const page = getPage()

const theme = ref(appBaseInfo.theme)

const themes = computed(() => `kd-theme--default kd-theme--${theme.value}`)

const classes = computed(() => `kd-page ${themes.value}`)

const rootClasses = computed(() => `kd-root ${themes.value}`)

const toasts = ref<KdToastOptions<boolean>[]>([])

const navbarHeight = ref(0)

const keyboardHeight = ref('')

const navbarStyle = computed(() => `margin-top: ${navbarHeight.value}px`)

const ctx = getCurrentInstance()

const setTheme = (res: { theme: 'dark' | 'light' }) => (theme.value = res.theme)

const onNavbarAction = (action: string) => emit('action', action)

const onNavbarAttached = (height: number) => (navbarHeight.value = height)

const onToastHide = (toast: KdToastOptions<boolean>) => {
  const index = toasts.value.findIndex((t) => t.id === toast.id)
  if (index !== -1) {
    toasts.value.splice(index, 1)
  }
  toast.onHide?.()
}

onAttached(() => {
  onThemeChange(setTheme)
})

onDetached(() => {
  offThemeChange(setTheme)
})

if (ctx) {
  ctx.setKeyboardHeight = (height: number) => {
    keyboardHeight.value = `height: ${height}px;`
  }
}

page.$page = ctx

page.$showToast = (options: KdToastOptions<boolean>) => {
  options = clone(options)
  options.id = options.id || Math.random().toString(36).slice(2)
  if (options.icon === 'progress') {
    const targetToastIndex = toasts.value.findIndex((t) => t.id === options.id)
    if (targetToastIndex > -1) {
      toasts.value[targetToastIndex] = options
    } else {
      toasts.value.unshift(options)
    }
  } else if (options.followUp) {
    const firstToast = toasts.value[0]
    if (firstToast) {
      options.id = firstToast.id
    }
    toasts.value[0] = options
  } else {
    toasts.value.unshift(options)
    if (toasts.value.length > 3) {
      toasts.value.pop() // 如果超过3个，移除最后一个
    }
  }
}

page.$hideToast = () => {
  toasts.value = []
}
</script>

<style>
.kd-page {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: var(--kd-color-background-middle);
}

.kd-page__content {
  flex: 1;
  min-height: 0;
}

.kd-root {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.kd-toast-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 62px;
  pointer-events: none;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
