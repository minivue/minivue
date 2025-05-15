<template>
  <View class="kd-tabbar">
    <View class="kd-tabbar__wrapper">
      <KdButton type="light" icon="menu" vertical>文本1</KdButton>
      <KdButton type="light" icon="menu" vertical>文本</KdButton>
      <KdButton type="light" icon="menu" vertical>文本</KdButton>
      <KdButton type="light" icon="menu" vertical>Template findin</KdButton>
      <KdButton type="light" icon="menu" vertical>文本</KdButton>
    </View>
  </View>
</template>

<script setup lang="ts">
import { onPageResize } from '@minivue/core'
import KdButton from './button.vue'

console.log('tabbar tabbar .................')
// if (ctx) {
//   const observer = ctx.createMediaQueryObserver()
//   console.log('observer', observer)
// }

onPageResize((e) => {
  console.log('onPageResize', e)
})
</script>

<style>
.kd-tabbar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: env(safe-area-inset-bottom);
  background-color: var(--kd-color-background-middle);
}

.kd-tabbar__wrapper {
  box-sizing: border-box;
  display: flex;
  gap: 4px;
  align-items: flex-start;
  align-self: stretch;
  justify-content: center;
  height: 64px;
  padding: 4px;
}

.kd-tabbar .kd-button {
  flex: 1;
  min-height: 100%;
}
</style>
