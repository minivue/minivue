<template>
  <View :class="classes" :style="styles">
    <View class="kd-progress__bg"></View>
    <View class="kd-progress__inner">
      <View class="kd-progress__ring"></View>
    </View>
    <View class="kd-progress__inner">
      <View class="kd-progress__ring"></View>
    </View>
    <View class="kd-progress__dot"></View>
    <View class="kd-progress__dot"></View>
  </View>
</template>

<script setup lang="ts">
import { computed, ref } from '@minivue/core'
import { classObjectToString, styleObjectToString } from './utils'

defineOptions({
  name: 'KdProgress',
})

const percentage = ref(0)
const size = 100
const stroke = Math.round(size * 0.125)
const classes = computed(() => classObjectToString('kd-progress'))
const rotate = computed(() => (percentage.value / 100) * 360)
const rotateLeft = computed(() => Math.max(180, rotate.value))
const rotateRight = computed(() => Math.min(360, 180 + rotate.value))

const styles = computed(() =>
  styleObjectToString({
    '--percentage': percentage.value,
    '--size': `${size}px`,
    '--stroke': `${stroke}px`,
    '--rotate': `${rotate.value}deg`,
    '--rotate-left': `${rotateLeft.value}deg`,
    '--rotate-right': `${rotateRight.value}deg`,
  }),
)

setInterval(() => {
  if (percentage.value < 100) {
    console.warn('rotateLeft:', rotateLeft.value)
    console.log('rotateRight:', rotateRight.value)
    percentage.value = Math.min(percentage.value + 1, 100)
  }
}, 10)
</script>

<style>
.kd-progress {
  position: relative;
  display: inline-flex;
  width: var(--size);
  height: var(--size);
}

.kd-progress__dot {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  transition: transform 200ms linear;
}

.kd-progress__dot::before {
  display: flex;
  width: var(--stroke);
  height: var(--stroke);
  content: '';
  background-color: var(--kd-color-public-normal);
  border-radius: 50%;
}

.kd-progress__dot + .kd-progress__dot {
  transform: rotate(var(--rotate));
}

.kd-progress__bg {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: solid var(--stroke) var(--kd-color-line-regular);
  border-radius: 50%;
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
  transform: rotate(var(--rotate-left));
  transform-origin: right;
  transition: transform 200ms linear;
}

.kd-progress__inner + .kd-progress__inner .kd-progress__ring {
  justify-content: flex-end;
  transform: rotate(var(--rotate-right));
  transform-origin: left;
}

.kd-progress__ring::before {
  box-sizing: border-box;
  display: block;
  flex-shrink: 0;
  width: 200%;
  height: 100%;
  content: '';
  border: var(--stroke) solid var(--kd-color-public-normal);
  border-radius: 50%;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
