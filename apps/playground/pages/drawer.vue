<template>
  <KdPage title="抽屉组件">
    <View class="p-drawer">
      <KdButton size="xl" type="primary" @tap="onTap('top')">顶部抽屉</KdButton>
      <KdButton size="xl" type="primary" @tap="onTap('bottom')">底部抽屉</KdButton>
      <KdButton size="xl" type="primary" @tap="onTap('left')">左侧抽屉</KdButton>
      <KdButton size="xl" type="primary" @tap="onTap('right')">右侧抽屉</KdButton>
    </View>
  </KdPage>
  <KdDrawer :show="showTop" placement="top" :height="300" @change="onChange">
    <View style="height: 100px; background-color: lightblue"></View>
    <View style="height: 100px; background-color: lightcoral"></View>
    <View style="height: 100px; background-color: lightcyan"></View>
    <View style="height: 100px; background-color: lightgray"></View>
    <View style="height: 100px; background-color: lightblue"></View>
    <View style="height: 100px; background-color: lightcoral"></View>
    <View style="height: 100px; background-color: lightcyan"></View>
    <View style="height: 100px; background-color: lightgray"></View>
    <View style="height: 100px; background-color: lightblue"></View>
    <View style="height: 100px; background-color: lightcoral"></View>
    <View style="height: 100px; background-color: lightcyan"></View>
    <View style="height: 100px; background-color: lightgray"></View>
  </KdDrawer>
  <KdDrawer :show="showBottom" placement="bottom" :height="300" @change="onChange">
    <View style="height: 100px; background-color: lightblue"></View>
    <View style="height: 100px; background-color: lightcoral"></View>
    <View style="height: 100px; background-color: lightcyan"></View>
    <View style="height: 100px; background-color: lightgray"></View>
    <View style="height: 100px; background-color: lightblue"></View>
    <View style="height: 100px; background-color: lightcoral"></View>
    <View style="height: 100px; background-color: lightcyan"></View>
    <View style="height: 100px; background-color: lightgray"></View>
    <View style="height: 100px; background-color: lightblue"></View>
    <View style="height: 100px; background-color: lightcoral"></View>
    <View style="height: 100px; background-color: lightcyan"></View>
    <View style="height: 100px; background-color: lightgray"></View>
  </KdDrawer>
  <KdDrawer :show="showLeft" placement="left" :width="300" @change="onChange">
    <View style="height: 100px; background-color: lightblue"></View>
    <View style="height: 100px; background-color: lightcoral"></View>
    <View style="height: 100px; background-color: lightcyan"></View>
    <View style="height: 100px; background-color: lightgray"></View>
    <View style="height: 100px; background-color: lightblue"></View>
    <View style="height: 100px; background-color: lightcoral"></View>
    <View style="height: 100px; background-color: lightcyan"></View>
    <View style="height: 100px; background-color: lightgray"></View>
    <View style="height: 100px; background-color: lightblue"></View>
    <View style="height: 100px; background-color: lightcoral"></View>
    <View style="height: 100px; background-color: lightcyan"></View>
    <View style="height: 100px; background-color: lightgray"></View>
  </KdDrawer>
  <KdDrawer :show="showRight" placement="right" :width="300" @change="onChange">
    <View style="height: 100px; background-color: lightblue"></View>
    <View style="height: 100px; background-color: lightcoral"></View>
    <View style="height: 100px; background-color: lightcyan"></View>
    <View style="height: 100px; background-color: lightgray"></View>
    <View style="height: 100px; background-color: lightblue"></View>
    <View style="height: 100px; background-color: lightcoral"></View>
    <View style="height: 100px; background-color: lightcyan"></View>
    <View style="height: 100px; background-color: lightgray"></View>
    <View style="height: 100px; background-color: lightblue"></View>
    <View style="height: 100px; background-color: lightcoral"></View>
    <View style="height: 100px; background-color: lightcyan"></View>
    <View style="height: 100px; background-color: lightgray"></View>
  </KdDrawer>
</template>

<script setup lang="ts">
import { ref } from '@minivue/core'
import { KdPage, KdButton, KdDrawer } from '@minivue/ui'

const showTop = ref(false)
const showBottom = ref(false)
const showLeft = ref(false)
const showRight = ref(false)

const onTap = (placement: string) => {
  switch (placement) {
    case 'top':
      showTop.value = !showTop.value
      break
    case 'bottom':
      showBottom.value = !showBottom.value
      break
    case 'left':
      showLeft.value = !showLeft.value
      break
    case 'right':
      showRight.value = !showRight.value
      break
  }
}

const onChange = (val: boolean) => {
  if (!val) {
    showTop.value = false
    showBottom.value = false
    showLeft.value = false
    showRight.value = false
  }
}
</script>

<style>
.p-drawer {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 16px;
  overflow: hidden;
}

.p-drawer .kd-button {
  width: 100%;
  margin-bottom: 16px;
}
</style>

<config lang="json">
{
  "navigationBarTitleText": "抽屉组件",
  "disableScroll": true
}
</config>
