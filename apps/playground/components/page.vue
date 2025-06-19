<template>
  <View :class="classes">
    <KdNavbar v-if="!hideNavbar" :title="title" :actions="actions" @action="onNavbarAction">
      <slot slot="left" name="navbar_left" />
      <slot name="navbar_center" />
      <slot slot="right" name="navbar_right" />
    </KdNavbar>
    <slot name="top" />
    <ScrollView class="kd-page__view" scroll-y type="list">
      <View v-if="safeTop" class="kd-page__safe-top"></View>
      <slot />
      <View v-if="safeBottom" class="kd-page__safe-bottom"></View>
    </ScrollView>
    <slot name="bottom" />
    <View :style="keyboardHeight"></View>
  </View>
  <KdToast />
  <KdDialog expose>
    <slot wx:if="{{dialogSlot}}" name="{{dialogSlot}}" />
  </KdDialog>
  <KdActionsheet />
</template>

<script setup lang="ts">
import { computed, ref, getCurrentInstance, onAttached, onDetached } from '@minivue/core'
import {
  getAppBaseInfo,
  getPage,
  onThemeChange,
  offThemeChange,
  classObjectToString,
} from './utils'

import KdNavbar from './navbar.vue'
import KdToast from './toast.vue'
import KdDialog from './dialog.vue'
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
  /** 灰底 */
  gray?: boolean
  /** 页面标题 */
  title?: string
  /** 左上角按钮 */
  actions?: Action[]
  /** 是否隐藏导航栏 */
  hideNavbar?: boolean
  /** 开启滚动区域的顶部安全区域 */
  safeTop?: boolean
  /** 开启滚动区域的底部安全区域 */
  safeBottom?: boolean
}

interface Events {
  /** 按钮点击 */
  action: [action: string]
}

const appBaseInfo = getAppBaseInfo()

const emit = defineEmits<Events>()

const { title, gray, actions = [], hideNavbar } = defineProps<Props>()

const ctx = getCurrentInstance()
const page = getPage()
const keyboardHeight = ref('')
const theme = ref(appBaseInfo.theme)
const classes = computed(() =>
  classObjectToString(`kd-page kd-theme--default kd-theme--${theme.value}`, {
    'kd-page--gray': gray,
  }),
)
const dialogSlot = ref('')
const setTheme = (res: { theme: 'dark' | 'light' }) => (theme.value = res.theme)
const onNavbarAction = (action: string) => emit('action', action)

page.$page = ctx
page.$setKeyboardHeight = (height: number) => {
  keyboardHeight.value = `height: ${height}px;`
}
page.$setDialogSlot = (slot: string) => {
  dialogSlot.value = slot
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

.kd-page--gray {
  background-color: var(--kd-color-background-base);
}

.kd-page__view {
  flex: 1;
  min-height: 0;
}

.kd-page__safe-top {
  height: env(safe-area-inset-top);
}

.kd-page__safe-bottom {
  height: env(safe-area-inset-bottom);
}
</style>

<config lang="json">
{
  "component": true
}
</config>
