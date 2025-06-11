<template>
  <RootPortal>
    <View :class="classes" :style="'font-family:' + fontFamily">
      <View class="kd-dialog-mask"></View>
      <View class="kd-dialog-wrap" :style="safeAreaStyle">
        <View class="kd-dialog">
          <ScrollView scroll-y enhanced :bounces="false" :style="scrollStyle">
            <View class="kd-dialog__body" id="body">
              <View v-if="image" class="kd-dialog__image" :style="imageBoxStyle">
                <Image :src="image" mode="widthFix" webp :style="imageStyle" />
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
  /** 图标，可选值为 'info', 'success', 'warning', 'error' 或自定义字符串 */
  icon?: 'info' | 'success' | 'warning' | 'error' | (string & {})
  /** 图标大小 */
  iconSize?: 44
  /** 对话框标题 */
  title?: string
  /** 图片链接 */
  image?: string
  /** 图片尺寸，可选值为 's', 'm' */
  imageSize?: 's' | 'm'
  /** 图片宽度（最好设置，避免图片加载导致抖动） */
  imageWidth?: number | string
  /** 图片高度（最好设置，避免图片加载导致抖动） */
  imageHeight?: number | string
  /** 对话框内容 */
  content?: string
  /** 是否显示关闭按钮 */
  showClose?: boolean
  /** 是否显示取消按钮 */
  showCancel?: boolean
  /** 取消按钮文字 */
  cancelText?: string
  /** 确认按钮文字 */
  confirmText?: string
  /** 确认按钮类型，可选值为 'danger' */
  confirmType?: 'danger'
}

const {
  iconSize = 44,
  imageSize = 's',
  imageWidth,
  imageHeight,
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
const imageStyle = computed(() =>
  styleObjectToString({
    width: '100%',
    aspectRatio: imageWidth && imageHeight ? `${imageWidth}/${imageHeight}` : '',
  }),
)
const imageBoxStyle = computed(() =>
  styleObjectToString({
    margin: imageSize === 's' ? '24px 24px 0' : '',
  }),
)

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

const setStyle = async () => {
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

onAttached(() => {
  setStyle()
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
