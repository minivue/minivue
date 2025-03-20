<template>
  <View :class="classes">
    <View class="kd-loading__icon" />
    <View v-if="text" class="kd-loading__text">{{ text }}</View>
  </View>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'
import { classnames } from './utils'

defineOptions({
  name: 'KdLoading',
})

interface Props {
  /** 图标大小 */
  size?: 's' | 'm' | 'l'
  /** 主题 */
  mode?: 'dark' | 'light'
  /** 加载状态文本提示 */
  text?: string
  /** 是否垂直 */
  vertical?: boolean
}

const { size = 'm', mode = 'light', text, vertical } = defineProps<Props>()

const classes = computed(() =>
  classnames(`kd-loading kd-loading--${size} kd-loading--${mode}`, {
    'kd-loading--vertical': vertical,
    'kd-loading--horizontal': !vertical,
  }),
)
</script>

<style>
.kd-loading {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  vertical-align: middle;
}

.kd-loading--vertical {
  flex-direction: column;
}

.kd-loading__icon {
  display: inline-flex;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  animation: kd-loading-spin 0.8s linear infinite;
}

.kd-loading__text {
  flex-shrink: 0;
  color: var(--kd-color-text-secondary);
}

.kd-loading--s .kd-loading__icon {
  width: 18px;
  height: 18px;
}

.kd-loading--m .kd-loading__icon {
  width: 22px;
  height: 22px;
}

.kd-loading--l .kd-loading__icon {
  width: 30px;
  height: 30px;
}

.kd-loading--s .kd-loading__text {
  font-size: var(--kd-font-size-small);
  line-height: var(--kd-font-line-height-small);
}

.kd-loading--m .kd-loading__text,
.kd-loading--l .kd-loading__text {
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base);
}

.kd-loading--horizontal.kd-loading--s .kd-loading__text {
  margin-left: 6px;
}

.kd-loading--horizontal.kd-loading--m .kd-loading__text,
.kd-loading--horizontal.kd-loading--l .kd-loading__text {
  margin-left: 8px;
}

.kd-loading--vertical.kd-loading--s .kd-loading__text {
  margin-top: 6px;
}

.kd-loading--vertical.kd-loading--m .kd-loading__text,
.kd-loading--vertical.kd-loading--l .kd-loading__text {
  margin-top: 8px;
}

.kd-loading__icon::before {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M9 14.75a1 1 0 1 0 0 2v-2zm0-11.5A5.75 5.75 0 0 1 14.75 9h2A7.75 7.75 0 0 0 9 1.25v2zm0 13.5A7.75 7.75 0 0 0 16.75 9h-2A5.75 5.75 0 0 1 9 14.75v2z' fill='url(%23A)'/%3E%3Cpath d='M9 2.25a6.75 6.75 0 0 0 0 13.5' stroke='url(%23B)' stroke-width='2' stroke-linejoin='round'/%3E%3Cdefs%3E%3ClinearGradient id='A' x1='9' y1='13.5' x2='9' y2='3.375' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%230a6cff'/%3E%3Cstop offset='1' stop-color='%230a6cff' stop-opacity='.5'/%3E%3C/linearGradient%3E%3ClinearGradient id='B' x1='8.438' y1='15.75' x2='9' y2='3.375' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%230a6cff' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230a6cff' stop-opacity='.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");

  display: block;
  width: 100%;
  height: 100%;
  content: '';
  background-repeat: no-repeat;
  background-position: center;
  background-size: 97% 97%;
  -webkit-mask-image: var(--icon);
  mask-image: var(--icon);
  mask-size: cover;
}

.kd-loading--light .kd-loading__icon::before {
  background-image: linear-gradient(var(--kd-color-public-normal), var(--kd-color-public-normal));
}

.kd-loading--dark .kd-loading__icon::before {
  background-image: linear-gradient(var(--kd-color-text-white), var(--kd-color-text-white));
}

@keyframes kd-loading-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

<config lang="json">
{
  "component": true
}
</config>
