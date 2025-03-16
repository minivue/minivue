<template>
  <Button :class="buttonClass" hover-class="kd-button--pressed"><slot /></Button>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'

interface Props {
  /** 按钮类型 */
  type?: 'primary' | 'secondary' | 'light'
  /** 按钮尺寸 */
  size?: 'xl' | 'l' | 'm'
  /** 是否禁用 */
  disabled?: boolean
}

defineOptions({
  name: 'KdButton',
})

const { type = 'secondary', size = 'm', disabled } = defineProps<Props>()

const buttonClass = computed(
  () => `kd-button kd-button--${type} kd-button--${size} ${disabled ? 'kd-button--disabled' : ''}`,
)
</script>

<style>
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
</style>

<config lang="json">
{
  "component": true
}
</config>
