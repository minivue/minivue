<template>
  <RootPortal>
    <View :class="classes" :style="'font-family:' + fontFamily">
      <View class="kd-dialog-mask"></View>
      <View class="kd-dialog-wrap" :style="safeAreaStyle">
        <View class="kd-dialog">
          <ScrollView scroll-y enhanced :bounces="false" :style="scrollStyle">
            <View class="kd-dialog__body" id="body">
              <View v-if="image" class="kd-dialog__image" :style="imageStyle">
                <Image mode="widthFix" :src="image" webp @load="onImageLoad" />
              </View>
              <View class="kd-dialog__content">
                <KdIcon v-if="icon" :type="icon" :size="iconSize" style="margin-bottom: 12px" />
                <View v-if="title" class="kd-dialog__title">{{ title }}</View>
                <View v-if="content" class="kd-dialog__text">
                  <Text>{{ content }}</Text>
                </View>
                <slot />
              </View>
            </View>
          </ScrollView>
          <KdDivider />
          <View class="kd-dialog__footer" id="footer">
            <Block v-if="showCancel">
              <KdButton type="light" size="xl" highlight>{{ cancelText }}</KdButton>
              <KdDivider vertical style="height: 24px" />
            </Block>
            <KdButton
              type="light"
              size="xl"
              highlight
              style="font-weight: bold"
              :danger="confirmType === 'danger'"
            >
              {{ confirmText }}
            </KdButton>
          </View>
          <KdButton v-if="showClose" class="kd-dialog__close" size="s" icon="close" only-icon />
        </View>
      </View>
    </View>
  </RootPortal>
</template>

<script setup lang="ts">
import KdIcon from './icon.vue'
import KdButton from './button.vue'
import KdDivider from './divider.vue'
import {
  fontFamily,
  onThemeChange,
  getWindowInfo,
  offThemeChange,
  getAppBaseInfo,
  classObjectToString,
  getMenuButtonBoundingClientRect,
  styleObjectToString,
  getRect,
} from './utils'
import {
  ref,
  computed,
  onAttached,
  onDetached,
  getCurrentInstance,
  ComponentInstance,
} from '@minivue/core'

defineOptions({
  name: 'KdDialog',
})

interface Props {
  icon?: 'info' | 'success' | 'warning' | 'error' | (string & {})
  iconSize?: 44
  title?: string
  image?: string
  imageSize?: 's' | 'm'
  content?: string
  showClose?: boolean
  showCancel?: boolean
  cancelText?: string
  confirmText?: string
  confirmType?: 'danger'
}

const {
  iconSize = 44,
  imageSize = 's',
  showCancel = true,
  cancelText = '取消',
  confirmText = '确定',
} = defineProps<Props>()

const ctx = getCurrentInstance<ComponentInstance>()
const appBaseInfo = getAppBaseInfo()
const theme = ref(appBaseInfo.theme)
const classes = computed(() => classObjectToString('kd-theme--default', `kd-theme--${theme.value}`))
const safeAreaStyle = ref('')
const scrollStyle = ref('')
const imageStyle = computed(() => (imageSize === 's' ? 'margin: 24px 24px 0' : ''))

const setTheme = (res: { theme: 'dark' | 'light' }) => (theme.value = res.theme)

const getSafeArea = () => {
  const { bottom } = getMenuButtonBoundingClientRect()
  const { safeArea, windowWidth, windowHeight } = getWindowInfo()
  return {
    top: Math.max(bottom, 24),
    left: safeArea.left,
    right: windowWidth - safeArea.right,
    bottom: Math.max(windowHeight - safeArea.bottom, 24),
    windowWidth,
    windowHeight,
  }
}

const setScrollHeight = async () => {
  const { height } = await getRect(ctx, '#body')
  scrollStyle.value = `height: ${height}px`
}

const init = async () => {
  const bodyRect = await getRect(ctx, '#body')
  const footerRect = await getRect(ctx, '#footer')
  const { top, left, right, bottom, windowHeight } = getSafeArea()
  safeAreaStyle.value = styleObjectToString({
    top: `${top}px`,
    left: `${left}px`,
    right: `${right}px`,
    bottom: `${bottom}px`,
  })
  scrollStyle.value = styleObjectToString({
    height: `${bodyRect.height}px`,
    maxHeight: `${windowHeight - top - bottom - footerRect.height}px`,
  })
}

const onImageLoad = () => {
  init()
}

onAttached(() => {
  init()
  setScrollHeight()
  onThemeChange(setTheme)
})

onDetached(() => {
  offThemeChange(setTheme)
})
</script>

<style>
.kd-dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--kd-color-mask-regular);
  opacity: 1;
  transition: opacity 0.1s ease-in-out;
}

.kd-dialog-wrap {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kd-dialog {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 320px;
  max-height: 100%;
  overflow: hidden;
  background: var(--kd-color-background-middle);
  border-radius: 16px;
}

.kd-dialog.show {
  animation: 0.3s forwards kd-dialog-appear;
}

@keyframes kd-dialog-appear {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.kd-dialog__body {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.kd-dialog__image {
  display: flex;
  overflow: hidden;
  border-radius: 8px;
}

.kd-dialog__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
}

.kd-dialog__title {
  align-self: stretch;
  margin-bottom: 4px;
  font-size: var(--kd-font-size-large);
  font-weight: 600;
  line-height: var(--kd-font-line-height-large);
  color: var(--kd-color-text-primary);
  text-align: center;
}

.kd-dialog__text {
  display: flex;
  align-self: stretch;
  justify-content: center;
  max-width: 100%;
  font-size: var(--kd-font-size-middle);
  line-height: var(--kd-font-line-height-middle);
  color: var(--kd-color-text-secondary);
  word-wrap: break-word;
}

.kd-dialog__footer {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.kd-dialog__footer .kd-button {
  flex: 1;
  height: 56px;
  padding: 16px;
  border-radius: 0;
}

.kd-dialog__close {
  position: absolute !important;
  top: 8px;
  right: 8px;
  color: var(--kd-color-icon-secondary) !important;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
