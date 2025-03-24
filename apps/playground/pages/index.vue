<template>
  <KdPage title="WPS灵犀" :actions="[{ icon: 'menu', action: 'menu' }]" @action="onActionTap">
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'

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
