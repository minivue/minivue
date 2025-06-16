<template>
  <View :class="classes">
    <KdNavbar v-if="!hideNavbar" :title="title" :actions="actions" @action="onNavbarAction">
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
  </View>
  <KdActionsheet />
  <KdToast />
</template>

<script setup lang="ts">
import { computed, ref, getCurrentInstance, onAttached, onDetached } from '@minivue/core'
import { getAppBaseInfo, getPage, onThemeChange, offThemeChange } from './utils'

import KdToast from './toast.vue'
import KdNavbar from './navbar.vue'
import KdActionsheet from './actionsheet.vue'

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

const ctx = getCurrentInstance()
const page = getPage()
const keyboardHeight = ref('')
const theme = ref(appBaseInfo.theme)
const classes = computed(() => `kd-page kd-theme--default kd-theme--${theme.value}`)

const setTheme = (res: { theme: 'dark' | 'light' }) => (theme.value = res.theme)

const onNavbarAction = (action: string) => emit('action', action)

page.$page = ctx
page.$setKeyboardHeight = (height: number) => {
  keyboardHeight.value = `height: ${height}px;`
}

onAttached(() => onThemeChange(setTheme))
onDetached(() => offThemeChange(setTheme))
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
</style>

<config lang="json">
{
  "component": true
}
</config>
