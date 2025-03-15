<template>
  <Button :class="buttonClass"><slot /></Button>
</template>

<script setup lang="ts">
import { getAppBaseInfo } from '@/utils/helper'
import { computed } from '@minivue/core'

interface Props {
  /** 按钮类型 */
  type?: 'primary' | 'secondary' | 'light'
  /** 按钮尺寸 */
  size?: 'xl' | 'l' | 'm'
}

defineOptions({
  name: 'KdButton',
})
console.log(getAppBaseInfo)
const props = defineProps<Props>()
const { type = 'secondary', size = 'm' } = props
const buttonClass = computed(() => `kd-button kd-button--${type} kd-button--${size}`)
</script>

<style>
.kd-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto !important;
  font-size: 16px;
  font-weight: 400;
  border-radius: 8px;
}

.kd-button--secondary {
  color: var(--kd-color-text-primary);
  background-color: var(--kd-color-state-hover);
}

.kd-button--m {
  min-width: 56px;
  padding: 5px 12px;
  line-height: var(--kd-font-line-height-middle);
}
</style>

<config lang="json">
{
  "component": true
}
</config>
