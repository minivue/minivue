<template>
  <KdPage title="WPS灵犀" :actions="[{ icon: 'menu', action: 'menu' }]" @action="onActionTap">
    <KdLink size="s">链接</KdLink>
    <KdLink size="m">链接</KdLink>
    <KdLink size="l">链接</KdLink>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdLink from '@/components/link.vue'

const onActionTap = (action: string) => {
  console.log('onActionTap:', action)
}
</script>

<config lang="json">
{
  "navigationBarTitleText": "WPS灵犀",
  "disableScroll": true
}
</config>
