<template>
  <KdPage title="气泡组件">
    <View
      style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%"
    >
      <KdTooltip text="这是一个气泡提示" placement="bottomLeft">
        <KdButton>气泡</KdButton>
      </KdTooltip>
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import { KdPage, KdButton, KdTooltip } from '@minivue/ui'
</script>

<config lang="json">
{
  "navigationBarTitleText": "气泡组件",
  "disableScroll": true
}
</config>
