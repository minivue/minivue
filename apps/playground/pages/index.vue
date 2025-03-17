<template>
  <KdPage>
    <View class="p-view" style="padding-top: 60px">
      <KdButton type="primary" icon="deepseek">主要按钮</KdButton>
      <KdButton type="primary" size="l">主要按钮</KdButton>
      <KdButton type="primary" size="xl" disabled>主要按钮</KdButton>
    </View>
    <View>
      <KdButton>次要按钮</KdButton>
      <KdButton size="l">次要按钮</KdButton>
      <KdButton size="xl">次要按钮</KdButton>
    </View>
    <View>
      <KdButton type="light">轻浅按钮</KdButton>
      <KdButton type="light" size="l">轻浅按钮</KdButton>
      <KdButton type="light" size="xl">轻浅按钮</KdButton>
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdButton from '@/components/button.vue'
</script>

<style>
.p-index {
  padding-top: 100px;
}
</style>

<config lang="json">
{
  "navigationBarTitleText": "首页",
  "disableScroll": true
}
</config>
