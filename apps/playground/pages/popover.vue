<template>
  <KdPage title="气泡组件">
    <KdPopover>
      <KdButton>气泡</KdButton>
      <View slot="content">hello world</View>
    </KdPopover>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdButton from '@/components/button.vue'
import KdPopover from '@/components/popover.vue'
</script>

<config lang="json">
{
  "navigationBarTitleText": "气泡组件",
  "disableScroll": true
}
</config>
