<template>
  <View :class="classes" :style="innerStyle"></View>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'

interface Props {
  /** 图标类型 */
  type: string
  /** 图标大小 */
  size?: number | string
}

defineOptions({
  name: 'KdIcon',
})

const { type, size = 18 } = defineProps<Props>()

const innerStyle = computed(() => `width:${size}px;height:${size}px;`)
const classes = computed(() => `kd-icon kd-icon--${type}`)
</script>

<style>
.kd-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: copilot-icon;
  font-style: normal;
  line-height: 1;
  color: inherit;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
