<template>
  <KdPage title="WPS灵犀">
    <View style="padding: 16px">
      <Navigator url="/pages/button/button">按钮组件</Navigator>
      <Navigator url="/pages/controls/controls">控制组件</Navigator>
      <Navigator url="/pages/divider/divider">分割线组件</Navigator>
      <Navigator url="/pages/link/link">链接组件</Navigator>
      <Navigator url="/pages/loading/loading">加载组件</Navigator>
      <Navigator url="/pages/progress/progress">进度组件</Navigator>
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
</script>

<style>
navigator {
  display: block;
  padding: 10px;
  margin-bottom: 16px;
  color: var(--kd-color-text-white);
  text-align: center;
  background-color: var(--kd-color-public-normal);
  border-radius: 8px;
}
</style>

<config lang="json">
{
  "navigationBarTitleText": "WPS灵犀",
  "disableScroll": true
}
</config>
