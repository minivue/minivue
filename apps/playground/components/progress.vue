<template>
  <View :class="classes">
    <View class="box"> </View>
    <View class="box">
      <View class="inner" :style="styles"></View>
    </View>
  </View>
</template>

<script setup lang="ts">
import { computed, ref } from '@minivue/core'
import { classnames } from './utils'

defineOptions({
  name: 'KdProgress',
})

const process = ref(0)

const classes = computed(() => classnames('kd-progress'))

const styles = computed(() => `--process:${process.value}deg`)

// setInterval(() => {
//   process.value += 1
// }, 100)
</script>

<style>
.kd-progress {
  position: relative;
  display: flex;
  width: 100px;
  height: 100px;
}

.box {
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.inner {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform: rotate(-90deg);
  transform-origin: 0 center;
}

.inner::before {
  position: absolute;
  left: -100%;
  box-sizing: border-box;
  width: 200%;
  height: 100%;
  content: '';
  border: 5px solid #000;
  border-radius: 50%;
}

.inner::after {
  position: absolute;
  bottom: 0;
  width: 5px;
  height: 5px;
  content: '';
  background-color: red;
  border-radius: 50%;
  transform: translate(-2.5px, 0);
}
</style>

<config lang="json">
{
  "component": true
}
</config>
