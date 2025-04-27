<template>
  <View v-if="show" class="kd-toast-wrapper">
    <View :class="classes" @animationend="onAnimationEnd">
      <View v-if="icon" class="kd-toast__icon">
        <KdLoading v-if="icon === 'loading'" mode="dark" />
        <KdProgress
          v-else-if="icon === 'progress'"
          :size="iconSize"
          mode="dark"
          :percentage="percentage"
        />
        <KdIcon v-else :type="icon" :size="iconSize" />
      </View>
      <View v-if="content" class="kd-toast__text"> {{ content }} </View>
      <View v-if="action" class="kd-toast__actions">
        <View class="kd-toast__action">
          <KdButton type="light" highlight @tap="onActionTap">{{ action }}</KdButton>
        </View>
        <View v-if="closeable" class="kd-toast__close">
          <KdButton icon="close" size="s" only-icon @tap="onCloseTap"></KdButton>
        </View>
      </View>
    </View>
  </View>
</template>

<script setup lang="ts" generic="T extends boolean">
import { computed, onAttached, ref, watch } from '@minivue/core'
import KdIcon from './icon.vue'
import KdButton from './button.vue'
import KdLoading from './loading.vue'
import KdProgress from './progress.vue'
import { classObjectToString } from './utils'

interface Events {
  hide: []
  close: []
  action: []
}

interface ToastProps {
  /** 是否hud显示 */
  hud?: T
  /** 是否显示 */
  show?: boolean
  /** 图标 */
  icon?: T extends true
    ? 'loading' | 'success' | 'error' | (string & {})
    : 'info' | 'success' | 'warning' | 'error' | 'loading' | 'loading' | 'progress' | (string & {})
  /** 操作文案 */
  action?: string
  /** 文本内容 */
  content?: string
  /** 显示时长 */
  duration?: number
  /** 是否显示关闭按钮 */
  closeable?: boolean
  /** 进度百分比 */
  percentage?: number
}

defineOptions({
  name: 'KdToast',
})

let timer: NodeJS.Timeout

const emit = defineEmits<Events>()

const {
  hud,
  show,
  icon,
  action,
  content,
  duration = 2500,
  closeable = true,
} = defineProps<ToastProps>()

const iconSize = computed(() => (hud ? 48 : 22))

const innerShow = ref(false)

const isAutoHide = computed(() => duration > 0 && !['progress', 'loading'].includes(icon as string))

const classes = computed(() =>
  classObjectToString('kd-toast', {
    'kd-toast--hud': hud,
    'kd-toast--hudtext': hud && content,
    'kd-toast--full': action,
    'kd-toast--show': innerShow.value,
    'kd-toast--hide': !innerShow.value,
  }),
)

const hideToast = () => {
  innerShow.value = false
}

const showToast = () => {
  clearTimeout(timer)
  innerShow.value = true
  if (isAutoHide.value) {
    timer = setTimeout(hideToast, duration)
  }
}

const onActionTap = () => {
  hideToast()
  emit('action')
}

const onCloseTap = () => {
  hideToast()
  emit('close')
}

const onAnimationEnd = (e: WechatMiniprogram.CustomEvent) => {
  const { animationName } = e.detail
  if (animationName === 'k-anim-toast-hide') {
    emit('hide')
  }
}

watch(isAutoHide, (val) => {
  if (val) {
    clearTimeout(timer)
    timer = setTimeout(hideToast, duration)
  }
})

watch(
  () => show,
  (val) => (val ? showToast() : hideToast()),
)

onAttached(() => {
  if (show) {
    showToast()
  }
})
</script>

<style>
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
  pointer-events: auto;
  background-color: var(--kd-color-mask-heavy);
  border-radius: 12px;
  opacity: 0;
  transform: translateY(-16px);
}

.kd-toast--show {
  backdrop-filter: blur(5px);
  animation: k-anim-toast-show 0.25s ease-in-out forwards;
}

.kd-toast--hide {
  animation: k-anim-toast-hide 0.25s ease-in-out forwards;
}

@keyframes k-anim-toast-show {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes k-anim-toast-hide {
  from {
    opacity: 1;
    transform: translateY(0);
  }
}

.kd-toast--full {
  flex-wrap: wrap;
  width: 100%;
}

.kd-toast--hud {
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
