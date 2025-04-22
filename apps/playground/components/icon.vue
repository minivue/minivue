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
  src:
    url('https://at.alicdn.com/t/c/font_4868388_bi97x8x0pri.woff2') format('woff2'),
    url('https://at.alicdn.com/t/c/font_4868388_bi97x8x0pri.ttf') format('truetype');
}

.kd-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: kdesign;
  font-style: normal;
  font-weight: lighter;
  line-height: 1;
}

.kd-icon--dropdown::before {
  content: '\e600';
}

.kd-icon--back::before {
  content: '\e601';
}

.kd-icon--link::before {
  content: '\e602';
}

.kd-icon--warn::before {
  color: var(--kd-color-icon-warning);
  content: '\e603';
}

.kd-icon--info::before {
  color: var(--kd-color-icon-info);
  content: '\e604';
}

.kd-icon--error::before {
  color: var(--kd-color-icon-error);
  content: '\e605';
}

.kd-icon--success::before {
  color: var(--kd-color-icon-success);
  content: '\e606';
}

.kd-icon--warn::after {
  position: absolute;
  top: 20%;
  z-index: -1;
  width: 20%;
  height: 70%;
  content: '';
  background-color: #fff;
}

.kd-icon--info::after,
.kd-icon--error::after,
.kd-icon--success::after {
  position: absolute;
  top: 10%;
  z-index: -1;
  width: 70%;
  height: 70%;
  content: '';
  background-color: #fff;
  border-radius: 50%;
}

.kd-icon--error-hud::before {
  content: '\e607';
}

.kd-icon--success-hud::before {
  content: '\e608';
}

.kd-icon--close::before {
  content: '\e609';
}
</style>

<config lang="json">
{
  "component": true
}
</config>
