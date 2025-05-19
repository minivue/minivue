<template>
  <KdPage title="悬浮工具栏">
    <KdHoverToolbar />
  </KdPage>
</template>

<script setup lang="ts">
import KdHoverToolbar from '@/components/hover-toolbar.vue'
import KdPage from '@/components/page.vue'
</script>

<config lang="json">
{
  "navigationBarTitleText": "悬浮工具栏",
  "disableScroll": true
}
</config>
