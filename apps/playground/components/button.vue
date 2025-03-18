<template>
  <Button :class="classes" hover-class="kd-button--pressed">
    <KdIcon v-if="icon || loading" :type="iconType" :size="iconSize" /><slot />
  </Button>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'
import KdIcon from './icon.vue'
import { classnames } from './utils'

interface Props {
  /** 按钮类型 */
  type?: 'primary' | 'secondary' | 'light'
  /** 按钮尺寸 */
  size?: 'xl' | 'l' | 'm'
  /** 图标 */
  icon?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否危险 */
  danger?: boolean
  /** 是否加载中 */
  loading?: boolean
}

defineOptions({
  name: 'KdButton',
})

const { type = 'secondary', size = 'm', disabled, icon = '', loading } = defineProps<Props>()

const iconSize = computed(() => (size === 'm' ? 18 : 22))

const iconType = computed(() => {
  if (loading) {
    return 'loading'
  }
  return icon
})

const classes = computed(() =>
  classnames(`kd-button kd-button--${type} kd-button--${size}`, {
    'kd-button--disabled': disabled,
  }),
)
</script>

<style>
.test {
  color: red;
}

.kd-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto !important;
  font-weight: 400;
}

.kd-button--primary {
  color: var(--kd-color-text-white);
  background-color: var(--kd-color-public-normal);
}

.kd-button--secondary {
  color: var(--kd-color-text-primary);
  background-color: var(--kd-color-state-hover);
}

.kd-button--light {
  color: var(--kd-color-text-primary);
  background-color: transparent;
}

.kd-button--m {
  min-width: 56px;
  height: 32px;
  padding: 5px 12px;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base);
  border-radius: 8px;
}

.kd-button--l {
  min-width: 64px;
  height: 40px;
  padding: 8px 16px;
  font-size: var(--kd-font-size-middle);
  line-height: var(--kd-font-line-height-middle);
  border-radius: 8px;
}

.kd-button--xl {
  min-width: 72px;
  height: 48px;
  padding: 12px 20px;
  font-size: var(--kd-font-size-middle);
  line-height: var(--kd-font-line-height-middle);
  border-radius: 12px;
}

.kd-button--primary.kd-button--pressed {
  color: var(--kd-color-text-white);
  background-color: var(--kd-color-public-pressed);
}

.kd-button--secondary.kd-button--pressed {
  color: var(--kd-color-text-primary);
  background-color: var(--kd-color-state-pressed);
}

.kd-button--light.kd-button--pressed {
  color: var(--kd-color-text-primary);
  background-color: var(--kd-color-state-pressed);
}

.kd-button--disabled {
  pointer-events: none;
  opacity: 0.4;
}

.kd-button--m .kd-icon {
  margin-right: 6px;
}

.kd-button--l .kd-icon {
  margin-right: 8px;
}

.kd-button--xl .kd-icon {
  margin-right: 8px;
}

@keyframes k-anim-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.kd-button .kd-icon--loading {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none'%3E%3Cpath d='M9 14.75a1 1 0 1 0 0 2v-2zm0-11.5A5.75 5.75 0 0 1 14.75 9h2A7.75 7.75 0 0 0 9 1.25v2zm0 13.5A7.75 7.75 0 0 0 16.75 9h-2A5.75 5.75 0 0 1 9 14.75v2z' fill='url(%23A)'/%3E%3Cpath d='M9 2.25a6.75 6.75 0 0 0 0 13.5' stroke='url(%23B)' stroke-width='2' stroke-linejoin='round'/%3E%3Cdefs%3E%3ClinearGradient id='A' x1='9' y1='13.5' x2='9' y2='3.375' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='#fff'/%3E%3Cstop offset='1' stop-color='#fff' stop-opacity='.5'/%3E%3C/linearGradient%3E%3ClinearGradient id='B' x1='8.438' y1='15.75' x2='9' y2='3.375' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='#fff' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='#fff' stop-opacity='.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
  animation: k-anim-spin 1s linear 0s infinite;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
