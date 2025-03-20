<template>
  <View :class="classes" :style="styles"></View>
</template>

<script setup lang="ts">
import { computed, ref } from '@minivue/core'
import { classnames } from './utils'

defineOptions({
  name: 'KdProgress',
})

const percentage = ref(110)

const classes = computed(() => classnames('kd-progress'))

const styles = computed(
  () =>
    `background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' fill='none'%3E%3Ccircle r='17.5' cx='20' cy='20' stroke='%230D0D0D' stroke-width='5' stroke-opacity='.12'/%3E%3Ccircle r='17.5' cx='20' cy='20' stroke='%231F69E0' stroke-width='5' stroke-linecap='round' stroke-dashoffset='${percentage.value}' fill='transparent' stroke-dasharray='110'/%3E%3C/svg%3E")`,
)

setInterval(() => {
  percentage.value -= 1
}, 100)
</script>

<style>
.kd-progress {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
