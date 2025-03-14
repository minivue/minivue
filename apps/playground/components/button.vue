<template>
  <Button :class="buttonClass"><slot /></Button>
</template>

<script setup lang="ts">
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

const props = defineProps<Props>()
const { type = 'secondary', size = 'l' } = props
const buttonClass = computed(() => `kd-button kd-button-${type} kd-button-${size}`)
</script>

<style>
.kd-button {
  margin: 0;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
