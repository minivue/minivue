<template>
  <KdPage title="气泡组件">
    <View>
      <KdTooltip text="这是一个气泡提示" placement="top">
        <KdButton>气泡</KdButton>
      </KdTooltip>
      <KdButton>气泡</KdButton>
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdButton from '@/components/button.vue'
import KdTooltip from '@/components/tooltip.vue'
</script>

<config lang="json">
{
  "navigationBarTitleText": "气泡组件",
  "disableScroll": true
}
</config>
