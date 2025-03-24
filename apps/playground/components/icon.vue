<template>
  <View :class="classes" :style="innerStyle"></View>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'
import { styleObjectToString } from './utils'

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

const innerStyle = computed(() =>
  styleObjectToString({
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${size}px`,
  }),
)

const classes = computed(() => `kd-icon kd-icon--${type}`)
</script>

<style>
@font-face {
  font-family: kdesign;
  src: url('https://at.alicdn.com/t/c/font_4868388_s2rjerdb34p.ttf') format('truetype');
}

.kd-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: kdesign;
  font-style: normal;
  font-weight: lighter;
  line-height: 1;
  color: inherit;
}

.kd-icon--back::before {
  content: '\e601';
}

.kd-icon--arrow::before {
  content: '\e600';
}
</style>

<config lang="json">
{
  "component": true
}
</config>
