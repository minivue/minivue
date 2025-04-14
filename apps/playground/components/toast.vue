<template>
  <View :class="classes"> 这是一个轻量级反馈 </View>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'

defineOptions({
  name: 'KdToast',
})

const classes = computed(() => `kd-toast`)
</script>

<style>
.kd-toast {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 14px 16px;
  font-size: var(--kd-font-size-base);
  line-height: var(--t-kd-font-line-height-base);
  color: var(--kd-color-text-white);
  background-color: var(--kd-color-mask-heavy);
  border-radius: 12px;
  backdrop-filter: blur(5px);
}
</style>

<config lang="json">
{
  "component": true
}
</config>
