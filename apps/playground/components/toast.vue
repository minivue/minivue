<template>
  <RootPortal>
    <View v-if="toasts" :class="rootClasses" :style="'font-family:' + fontFamily">
      <View class="kd-toast-area" :style="areaStyle">
        <View class="kd-toast-wrapper" v-for="toast in toasts" :key="toast.id">
          <View :class="toast.classes + (toast.show ? ' kd-toast--show' : '')">
            <View v-if="toast.icon" class="kd-toast__icon">
              <KdLoading v-if="toast.icon === 'loading'" mode="dark" />
              <KdProgress
                v-else-if="toast.icon === 'progress'"
                :size="toast.iconSize"
                mode="dark"
                :percentage="toast.percentage"
              />
              <KdIcon v-else :type="toast.icon" :size="toast.iconSize" />
            </View>
            <View v-if="toast.content" class="kd-toast__text">{{ toast.content }}</View>
            <View v-if="toast.action" class="kd-toast__actions">
              <View class="kd-toast__action">
                <KdButton type="light" highlight @tap="onActionTap(toast)">
                  {{ toast.action }}
                </KdButton>
              </View>
              <View v-if="toast.closeable" class="kd-toast__close">
                <KdButton icon="close" size="s" only-icon @tap="onCloseTap(toast)"></KdButton>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  </RootPortal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from '@minivue/core'
import {
  getId,
  clone,
  delay,
  getPage,
  fontFamily,
  getAppBaseInfo,
  getNavbarHeight,
  classObjectToString,
} from './utils'
import { KdToastOptions } from '../type'
import KdIcon from './icon.vue'
import KdButton from './button.vue'
import KdLoading from './loading.vue'
import KdProgress from './progress.vue'

type Toast = KdToastOptions<boolean> & {
  id?: string
  show?: boolean
  timer?: NodeJS.Timeout
  classes?: string
  updated?: boolean
  iconSize?: number
  isAutoHide?: boolean
}

defineOptions({
  name: 'KdToast',
})

const appBaseInfo = getAppBaseInfo()
const theme = ref(appBaseInfo.theme)
const page = getPage()
const toasts = ref<Toast[]>([])
const areaStyle = computed(() => `margin-top: ${getNavbarHeight()}px`)
const rootClasses = computed(() => `kd-toast-root kd-theme--default kd-theme--${theme.value}`)

const hideToast = async (toast: Toast) => {
  clearTimeout(toast.timer)
  const index = toasts.value.findIndex((t) => t.id === toast.id)
  if (index !== -1) {
    toasts.value[index].show = false
    await delay(250) // 等待动画结束
    toasts.value.splice(index, 1)
  }
  toast.onHide?.()
}

const showToast = (toast: Toast) => {
  toast.show = true
  const isAutoHide = toast.duration && !['progress', 'loading'].includes(toast.icon as string)
  if (isAutoHide) {
    toast.timer = setTimeout(() => hideToast(toast), toast.duration)
  }
}

const onActionTap = (toast: Toast) => {
  hideToast(toast)
  toast.onAction?.()
}

const onCloseTap = (toast: Toast) => {
  hideToast(toast)
  toast.onClose?.()
}

const onToastsChange = () => {
  toasts.value.forEach((item) => {
    if (item.updated || item.show === undefined) {
      item.updated = false
      showToast(item)
    }
  })
}

page.$showToast = async (options: KdToastOptions<boolean>) => {
  const {
    id,
    hud,
    icon,
    action,
    content,
    followUp,
    duration = 2500,
    closeable = true,
    onHide,
    onClose,
    onAction,
  } = options
  const toastId = id || getId()
  const iconSize = hud ? 48 : 22
  const innerToasts = toasts.value
  const classes = classObjectToString('kd-toast', {
    'kd-toast--hud': hud,
    'kd-toast--hudtext': hud && content,
    'kd-toast--full': action,
  })

  const newOptions = clone<Toast>(options)
  newOptions.id = toastId
  newOptions.classes = classes
  newOptions.iconSize = iconSize
  newOptions.duration = duration
  newOptions.closeable = closeable
  newOptions.onHide = onHide
  newOptions.onClose = onClose
  newOptions.onAction = onAction

  if (icon === 'progress') {
    const targetToastIndex = toasts.value.findIndex((t) => t.id === toastId)
    if (targetToastIndex > -1) {
      newOptions.show = true
      innerToasts[targetToastIndex] = newOptions
    } else {
      innerToasts.unshift(newOptions)
    }
  } else if (followUp) {
    const firstToast = innerToasts[0]
    if (firstToast) {
      newOptions.updated = true
      clearTimeout(firstToast.timer)
      newOptions.id = firstToast.id
      newOptions.show = firstToast.show
    }
    innerToasts[0] = newOptions
  } else {
    innerToasts.unshift(newOptions)
  }

  if (innerToasts.length > 3) {
    innerToasts.pop() // 如果超过3个，移除最后一个
  }
}

page.$hideToast = () => {
  toasts.value = []
}

watch(toasts, onToastsChange, { flush: 'post', deep: true })
</script>

<style>
.kd-toast-root {
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

/* 加这次是为了防止kd-toast宽度益处问题 */
.kd-toast-wrapper {
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  width: 100%;
  padding: 8px 16px 0;
  pointer-events: none;
}

.kd-toast {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  max-width: 520px;
  min-height: 50px;
  overflow: hidden;
  pointer-events: auto;
  background-color: var(--kd-color-mask-heavy);
  border-radius: 12px;
  opacity: 0;
  backdrop-filter: blur(0);
  transform: translateY(-16px);
  transition: all 0.25s ease-in-out;
}

.kd-toast--show {
  opacity: 1;
  backdrop-filter: blur(5px);
  transform: translateY(0);
}

.kd-toast--full {
  flex-wrap: wrap;
  width: 100%;
}

.kd-toast--hud {
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 96px;
  min-height: 96px;
  padding: 24px;
  border-radius: 16px;
}

.kd-toast--hudtext {
  width: 132px;
  min-height: 132px;
}

.kd-toast__icon {
  display: flex;
  flex-shrink: 0;
  align-items: flex-start;
  align-self: stretch;
  justify-content: center;
  padding: 14px 12px 0 16px;
  color: var(--kd-color-icon-white);
}

.kd-toast__text {
  display: flex;
  flex: 1;
  flex-shrink: 0;
  align-items: flex-start;
  align-self: stretch;
  max-width: 100%;
  padding: 14px 16px;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base);
  color: var(--kd-color-text-white);
  word-break: break-all;
}

.kd-toast--hud .kd-loading__icon {
  width: 48px !important;
  height: 48px !important;
}

.kd-toast--hud .kd-toast__icon {
  padding: 0;
}

.kd-toast--hud .kd-toast__text {
  justify-content: center;
  padding: 0;
  margin-top: 12px;
  font-size: var(--kd-font-size-middle);
  line-height: var(--kd-font-line-height-middle);
}

.kd-toast--hud .kd-icon--error::before {
  color: var(--kd-color-text-white);
  content: '\e607';
}

.kd-toast--hud .kd-icon--success::before {
  color: var(--kd-color-text-white);
  content: '\e608';
}

.kd-toast--hud .kd-icon--error::after,
.kd-toast--hud .kd-icon--success::after {
  display: none;
}

.kd-toast__icon ~ .kd-toast__text {
  padding-left: 0;
}

.kd-toast--full .kd-toast__text {
  min-width: 50%;
}

.kd-toast--full .kd-toast__icon ~ .kd-toast__text {
  min-width: calc(50% - 50px);
}

.kd-toast__actions {
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  justify-content: center;
  padding: 3px 5px 0 4px;
}

.kd-toast__action {
  display: flex;
  align-items: center;
  height: 44px;
}

.kd-toast__action .kd-button {
  font-weight: 600;
  color: rgb(var(--kd-color-blue-5)) !important;
}

.kd-toast__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 44px;
}

.kd-toast__close .kd-button {
  color: var(--kd-color-text-white);
}
</style>

<config lang="json">
{
  "component": true
}
</config>
