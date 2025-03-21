<template>
  <View :class="classes" :style="styles">
    <View class="kd-progress__inner">
      <View class="kd-progress__ring"></View>
    </View>
    <View class="kd-progress__inner">
      <View class="kd-progress__ring"></View>
    </View>
  </View>
</template>

<script setup lang="ts">
import { computed, ref } from '@minivue/core'
import { classnames } from './utils'

defineOptions({
  name: 'KdProgress',
})

const percentage = ref(0)
const size = 40
const stroke = size * 0.125
const rotate = computed(() => `${(percentage.value / 100) * 360}`)
const offset = stroke / -2
const dotpos = size / -2 + stroke / 2
const classes = computed(() => classnames('kd-progress'))
const ringleft = computed(() => Math.max(180, Number(rotate.value)))
const ringright = computed(() => Math.min(360, 180 + Number(rotate.value)))

const styles = computed(
  () =>
    `--percentage:${percentage.value};--size:${size}px;--stroke:${stroke}px;--rotate:${rotate.value}deg;--offset:${offset}px;--dotpos:${dotpos}px;--ringleft:${ringleft.value}deg;--ringright:${ringright.value}deg`,
)

setInterval(() => {
  percentage.value += 1
}, 100)
</script>

<style>
.kd-progress {
  position: relative;
  display: inline-flex;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  box-shadow: inset 0 0 0 var(--stroke) var(--kd-color-line-regular);
}

.kd-progress::before,
.kd-progress::after {
  position: absolute;
  width: var(--stroke);
  height: var(--stroke);
  content: '';
  background-color: var(--kd-color-public-normal);
  border-radius: 50%;
}

.kd-progress::before {
  top: 0;
  left: 50%;
  z-index: 1;
  margin-left: var(--offset);
}

.kd-progress::after {
  top: 50%;
  left: 50%;
  margin-top: var(--offset);
  margin-left: var(--offset);
  transform: rotate(var(--rotate)) translateY(var(--dotpos));
  transform-origin: center;
  transition: transform 0.1s linear;
}

.kd-progress__inner {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

.kd-progress__ring {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform: rotate(var(--ringleft));
  transform-origin: right;
  transition: transform 0.1s linear;
}

.kd-progress__inner + .kd-progress__inner .kd-progress__ring {
  justify-content: flex-end;
  transform: rotate(var(--ringright));
  transform-origin: left;
}

.kd-progress__ring::before {
  box-sizing: border-box;
  display: block;
  flex-shrink: 0;
  width: 200%;
  height: 100%;
  content: '';
  border: var(--stroke) solid var(--kd-color-public-normal, #1f69e0);
  border-radius: 50%;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
