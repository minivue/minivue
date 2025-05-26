<template>
  <KdPage title="气泡组件">
    <View style="display: flex; align-items: center; justify-content: center; height: 100%">
      <KdPopover>
        <KdButton>气泡</KdButton>
        <View slot="content">hello world</View>
      </KdPopover>
    </View>
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
