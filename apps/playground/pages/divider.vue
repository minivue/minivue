<template>
  <KdPage title="分割线组件">
    <KdDivider />
    <KdDivider vertical style="height: 50px; margin-left: 100px" />
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdDivider from '@/components/divider.vue'
</script>

<config lang="json">
{
  "navigationBarTitleText": "分割线组件",
  "disableScroll": true
}
</config>
