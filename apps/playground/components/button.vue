<template>
  <Button :class="classes" hover-class="kd-button--pressed">
    <KdLoading v-if="loading" class="kd-icon" :size="loadingSize" :mode="loadingMode" />
    <KdIcon v-else-if="icon" :type="icon" :size="iconSize" /><slot />
  </Button>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'
import { classnames } from './utils'
import KdIcon from './icon.vue'
import KdLoading from './loading.vue'

interface Props {
  /** 是否ai按钮 */
  ai?: boolean
  /** 图标 */
  icon?: string
  /** 是否危险 */
  danger?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否强调 */
  highlight?: boolean
  /** 按钮尺寸 */
  size?: 'xl' | 'l' | 'm'
  /** 按钮类型 */
  type?: 'primary' | 'secondary' | 'light'
}

defineOptions({
  name: 'KdButton',
})

const {
  type = 'secondary',
  size = 'm',
  icon = '',
  ai,
  danger,
  loading,
  disabled,
  highlight,
} = defineProps<Props>()

const iconSize = computed(() => (size === 'm' ? 18 : 22))

const loadingSize = computed(() => (size === 'm' ? 's' : 'm'))

const loadingMode = computed(() => (type === 'primary' ? 'dark' : 'light'))

const classes = computed(() =>
  classnames(`kd-button kd-button--${type} kd-button--${size}`, {
    'kd-button--ai': ai,
    'kd-button--danger': danger,
    'kd-button--loading': loading,
    'kd-button--disabled': disabled,
    'kd-button--highlight': highlight,
  }),
)
</script>

<style>
.kd-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto !important;
  font-weight: 400;
  vertical-align: middle;
}

.kd-button--primary {
  color: var(--kd-color-text-white);
  background-color: var(--kd-color-public-normal);
}

.kd-button--primary.kd-button--ai {
  background-color: var(--kd-color-ai-normal);
}

.kd-button--primary.kd-button--danger {
  background-color: var(--kd-color-error-normal);
}

.kd-button--secondary {
  color: var(--kd-color-text-primary);
  background-color: var(--kd-color-state-hover);
}

.kd-button--secondary.kd-button--highlight {
  color: var(--kd-color-text-public);
  background-color: var(--kd-color-state-pressed-public);
}

.kd-button--light {
  color: var(--kd-color-text-primary);
  background-color: transparent;
}

.kd-button--light.kd-button--highlight {
  color: var(--kd-color-text-public);
}

.kd-button--light.kd-button--danger {
  color: var(--kd-color-text-error);
}

.kd-button--primary.kd-button--pressed {
  background-color: var(--kd-color-public-pressed);
}

.kd-button--primary.kd-button--ai.kd-button--pressed {
  background-color: var(--kd-color-ai-pressed);
}

.kd-button--primary.kd-button--danger.kd-button--pressed {
  background-color: var(--kd-color-error-pressed);
}

.kd-button--secondary.kd-button--pressed {
  background-color: var(--kd-color-state-pressed);
}

.kd-button--secondary.kd-button--highlight.kd-button--pressed {
  background-color: rgba(var(--kd-color-blue-2), 1);
}

.kd-button--light.kd-button--pressed {
  background-color: var(--kd-color-state-pressed);
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

.kd-button--m .kd-icon {
  margin-right: 6px;
}

.kd-button--l .kd-icon {
  margin-right: 8px;
}

.kd-button--xl .kd-icon {
  margin-right: 8px;
}

.kd-button--loading,
.kd-button--disabled {
  pointer-events: none;
  opacity: 0.4;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
