<template>
  <KdPage title="抽屉组件">
    <KdButton @tap="onTap">打开抽屉</KdButton>
  </KdPage>
  <KdDrawer :show="show" @change="onChange">
    <View style="display: flex; flex-direction: column">
      <KdButton type="primary" size="l">次要按钮</KdButton>
      <KdButton type="primary" size="l">次要按钮</KdButton>
      <KdButton type="primary" size="l">次要按钮</KdButton>
      <KdButton type="primary" size="l">次要按钮</KdButton>
      <KdButton type="primary" size="l">次要按钮</KdButton>
      <KdButton type="primary" size="l">次要按钮</KdButton>
      <KdButton type="primary" size="l">次要按钮</KdButton>
      <KdButton type="primary" size="l">次要按钮</KdButton>
      <KdButton type="primary" size="l">次要按钮</KdButton>
    </View>
  </KdDrawer>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdButton from '@/components/button.vue'
import KdDrawer from '@/components/drawer.vue'
import { ref } from '@minivue/core'

const show = ref(false)

const onTap = () => {
  show.value = true
}

const onChange = (val: boolean) => {
  show.value = val
}
</script>

<config lang="json">
{
  "navigationBarTitleText": "抽屉组件",
  "disableScroll": true
}
</config>
