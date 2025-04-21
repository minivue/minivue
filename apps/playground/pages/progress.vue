<template>
  <KdPage title="进度组件">
    <KdProgress :percentage="50" />
    <KdProgress :percentage="50" mode="dark" text="加载中..." />
    <KdProgress :percentage="50" horizontal />
    <KdProgress :percentage="50" mode="dark" horizontal />
    <KdProgress :percentage="50" horizontal type="track" />
    <KdProgress :percentage="50" mode="dark" horizontal type="track" text="加载中..." />
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdProgress from '@/components/progress.vue'
</script>

<config lang="json">
{
  "navigationBarTitleText": "进度组件",
  "disableScroll": true
}
</config>
