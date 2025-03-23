<template>
  <KdPage>
    <View style="padding: 30px">
      <KdProgress :percentage="percentage" mode="dark" text="加载中..." />
      <KdProgress :percentage="percentage" type="track" mode="dark" text="加载中..." />
      <KdProgress :percentage="percentage" type="track" text="加载中..." horizontal />
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import { ref } from '@minivue/core'
import KdPage from '@/components/page.vue'
import KdProgress from '@/components/progress.vue'

const percentage = ref(0)

setInterval(() => {
  percentage.value += 5
}, 200)
</script>

<config lang="json">
{
  "navigationBarTitleText": "首页",
  "disableScroll": true
}
</config>
