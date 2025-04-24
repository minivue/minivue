<template>
  <View :class="classes">
    <KdNavbar v-if="!hideNavbar" :title="title" :actions="actions" @action="onActionTap">
      <slot slot="left" name="navbar_left" />
      <slot name="navbar_center" />
      <slot slot="right" name="navbar_right" />
    </KdNavbar>
    <ScrollView class="kd-page__content" scroll-y><slot /></ScrollView>
    <RootPortal>
      <View :class="rootClasses">
        <View class="kd-toast-area">
          <KdToast content="这是一个轻量级反馈这是一个轻量级反馈这是一个轻量级反馈" />
        </View>
      </View>
    </RootPortal>
  </View>
</template>

<script setup lang="ts">
import { computed, ref } from '@minivue/core'
import { getAppBaseInfo, onThemeChange } from './utils'
import KdToast from './toast.vue'
import KdNavbar from './navbar.vue'

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

const theme = ref(appBaseInfo.theme)

const themes = computed(() => `kd-theme--default kd-theme--${theme.value}`)

const classes = computed(() => `kd-page ${themes.value}`)

const rootClasses = computed(() => `kd-root ${themes.value}`)

const onActionTap = (action: string) => emit('action', action)

onThemeChange((res) => {
  theme.value = res.theme
})
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
