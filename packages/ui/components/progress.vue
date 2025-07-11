<template>
  <View :class="classes" :style="styles">
    <View class="kd-progress__wrapper">
      <View class="kd-progress__bar">
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
    </View>
    <View v-if="text" class="kd-progress__text">{{ text }}</View>
  </View>
</template>

<script setup lang="ts">
import { computed, ref, watch } from '@minivue/core'
import { classObjectToString, styleObjectToString } from '../utils'

defineOptions({
  name: 'KdProgress',
})

interface Props {
  /** 主题 */
  mode?: 'dark' | 'light'
  /** 加载状态文本提示 */
  text?: string
  /** 类型 */
  type?: 'ring' | 'track'
  /** 尺寸 */
  size?: number | string
  /** 进度百分比 */
  percentage?: number
  /** 是否水平布局 */
  horizontal?: boolean
}

const {
  horizontal,
  text,
  size = 48,
  type = 'ring',
  mode = 'light',
  percentage = 0,
} = defineProps<Props>()

const classes = computed(() =>
  classObjectToString(`kd-progress kd-progress--${type} kd-progress--${mode}`, {
    'kd-progress--horizontal': horizontal,
  }),
)

const current = ref(percentage)

const styles = computed(() => {
  const scale = Number(size) / 48
  const rotate = (current.value / 100) * 360
  const rotateLeft = Math.max(180, rotate)
  const rotateRight = Math.min(360, 180 + rotate)
  return styleObjectToString({
    '--size': `${size}px`,
    '--scale': `scale(${scale})`,
    '--stroke': '5px',
    '--rotate': `${rotate}deg`,
    '--rotate-left': `${rotateLeft}deg`,
    '--rotate-right': `${rotateRight}deg`,
    '--percentage': `${current.value}%`,
  })
})

let timer: NodeJS.Timeout

const change = () => {
  clearTimeout(timer)
  const currentValue = current.value
  if (Math.abs(percentage - currentValue) > 0.1) {
    const step = Math.max(Math.abs(percentage - currentValue) / 100, 0.1)
    const dir = percentage > currentValue ? 1 : -1
    current.value = parseFloat(Math.min(currentValue + dir * step, 100).toFixed(2))
    timer = setTimeout(change)
  }
}

watch(() => percentage, change)
</script>

<style>
.kd-progress {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.kd-progress__wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.kd-progress--ring {
  display: inline-flex;
}

.kd-progress--track {
  display: flex;
  flex-direction: column-reverse;
}

.kd-progress__dot {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
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
  position: relative;
  flex: 1;
  height: 100%;
  overflow: hidden;
}

.kd-progress__ring {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform: rotate(var(--rotate-left));
  transform-origin: right;
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

.kd-progress__text {
  flex-shrink: 0;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base);
  color: var(--kd-color-text-secondary);
  text-align: center;
}

.kd-progress--ring .kd-progress__bar {
  display: inline-flex;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  transform: var(--scale);
}

.kd-progress--ring .kd-progress__wrapper {
  width: var(--size);
  height: var(--size);
}

.kd-progress--ring .kd-progress__text {
  margin-top: 6px;
}

.kd-progress--track .kd-progress__bar {
  display: flex;
  width: 100%;
  height: 5px;
  overflow: hidden;
  border-radius: 2px;
}

.kd-progress--track .kd-progress__bg {
  background-color: var(--kd-color-line-regular);
  border: none;
  border-radius: 0;
}

.kd-progress--track .kd-progress__text {
  margin-bottom: 8px;
}

.kd-progress--track .kd-progress__bar::after {
  display: block;
  width: var(--percentage);
  height: 100%;
  content: '';
  background-color: var(--kd-color-public-normal);
  border-radius: 2px;
}

.kd-progress--track .kd-progress__inner,
.kd-progress--track .kd-progress__dot {
  display: none;
}

.kd-progress--horizontal {
  flex-direction: row;
}

.kd-progress--horizontal .kd-progress__text {
  margin-bottom: 0;
  margin-left: 8px;
}

.kd-progress--dark .kd-progress__dot::before {
  background-color: var(--kd-color-line-white);
}

.kd-progress--dark .kd-progress__ring::before {
  border-color: var(--kd-color-line-white);
}

.kd-progress--dark .kd-progress__bg {
  border-color: var(--kd-color-line-white);
  opacity: 0.3;
}

.kd-progress--dark.kd-progress--track .kd-progress__bg {
  background-color: var(--kd-color-line-white);
}

.kd-progress--dark .kd-progress__text {
  color: var(--kd-color-text-white);
}

.kd-progress--dark .kd-progress--track {
  background-color: var(--kd-color-line-white);
}

.kd-progress--dark.kd-progress--track .kd-progress__bar::after {
  background-color: var(--kd-color-line-white);
}
</style>

<config lang="json">
{
  "component": true
}
</config>
