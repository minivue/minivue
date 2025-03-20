<template>
  <Button :class="classes" hover-class="kd-button--pressed">
    <KdLoading v-if="loading" class="kd-icon" :size="loadingSize" :mode="loadingMode" />
    <KdIcon v-else-if="icon" :type="icon" :size="iconSize" />
    <View class="kd-button__content">
      <Text v-if="!onlyIcon" overflow="ellipsis" style="max-width: 300px"><slot /></Text>
      <KdIcon v-if="dropdown" type="dropdown" :size="iconSize" />
    </View>
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
  /** 是否激活 */
  active?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 是否垂直 */
  vertical?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否仅图标 */
  onlyIcon?: boolean
  /** 是否下拉按钮 */
  dropdown?: boolean
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
  active,
  danger,
  loading,
  onlyIcon,
  vertical,
  disabled,
  dropdown,
  highlight,
} = defineProps<Props>()

const buttonSize = computed(() => (vertical ? 'l' : size))

const iconSize = computed(() => (buttonSize.value === 'm' && !onlyIcon ? 18 : 22))

const loadingSize = computed(() => (buttonSize.value === 'm' ? 's' : 'm'))

const loadingMode = computed(() => (type === 'primary' ? 'dark' : 'light'))

const classes = computed(() =>
  classnames(`kd-button kd-button--${type} kd-button--${buttonSize.value}`, {
    'kd-button--ai': ai,
    'kd-button--active': active,
    'kd-button--danger': danger,
    'kd-button--loading': loading,
    'kd-button--onlyicon': onlyIcon,
    'kd-button--vertical': vertical,
    'kd-button--disabled': disabled,
    'kd-button--dropdown': dropdown,
    'kd-button--highlight': highlight,
  }),
)
</script>

<style>
.kd-button {
  position: relative;
  display: inline-flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: auto !important;
  overflow: visible;
  font-weight: 400;
  vertical-align: middle;
  border: none;
}

/* 点击热区限制最小要44px */
.kd-button::after {
  position: absolute;
  top: 50%;
  display: block;
  width: 100%;
  height: var(--kd-button-hotspot, 44px);
  content: '';
  border: none;
  transform: translateY(-50%);
}

.kd-button__content {
  display: flex;
  align-items: center;
  justify-content: center;
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

.kd-button.kd-button--onlyicon {
  padding: 0;
}

.kd-button--m.kd-button--onlyicon {
  min-width: 32px;
}

.kd-button--l.kd-button--onlyicon {
  min-width: 40px;
}

.kd-button--xl.kd-button--onlyicon {
  min-width: 48px;
}

.kd-button--onlyicon .kd-icon {
  margin-right: 0;
}

.kd-button .kd-icon--dropdown {
  margin-right: 0;
  margin-left: 2px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 97% 97%;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M4.781 7.313l4.211 3.93 4.226-3.93' stroke='%23333' stroke-width='1.13' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  mask-size: cover;
  transition: transform 0.3s;
}

.kd-button--vertical {
  flex-direction: column;
  min-width: 0 !important;
  height: auto !important;
  padding: 8px 4px 4px !important;
  font-size: 11px;
  line-height: 20px;
}

.kd-button--vertical .kd-icon {
  margin-right: 0;
  margin-bottom: 2px;
}

.kd-button--vertical.kd-button--dropdown {
  padding: 8px 2px 4px 4px !important;
}

.kd-button--vertical .kd-icon--dropdown {
  width: 14px !important;
  height: 14px !important;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
}

/* 用于修复按钮水平并排没有对齐问题 */
.kd-button .kd-icon--dropdown::before {
  content: ' ';
}

.kd-button--active .kd-icon--dropdown {
  transform: rotate(180deg);
}

.kd-button--primary .kd-icon--dropdown {
  background-image: linear-gradient(var(--kd-color-text-white), var(--kd-color-text-white));
}

.kd-button--secondary .kd-icon--dropdown {
  background-image: linear-gradient(var(--kd-color-text-primary), var(--kd-color-text-primary));
}

.kd-button--light .kd-icon--dropdown {
  background-image: linear-gradient(var(--kd-color-text-primary), var(--kd-color-text-primary));
}

.kd-button--light.kd-button--highlight .kd-icon--dropdown {
  background-image: linear-gradient(var(--kd-color-text-public), var(--kd-color-text-public));
}

.kd-button--light.kd-button--danger .kd-icon--dropdown {
  background-image: linear-gradient(var(--kd-color-text-error), var(--kd-color-text-error));
}

.kd-button--secondary.kd-button--highlight .kd-icon--dropdown {
  background-image: linear-gradient(var(--kd-color-text-public), var(--kd-color-text-public));
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
