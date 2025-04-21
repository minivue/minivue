<template>
  <KdPage title="链接组件">
    <KdLink size="s">链接</KdLink>
    <KdLink size="m">链接</KdLink>
    <KdLink size="l">Link text</KdLink>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdLink from '@/components/link.vue'
</script>

<config lang="json">
{
  "navigationBarTitleText": "链接组件",
  "disableScroll": true
}
</config>
