<template>
  <KdPage title="进度组件">
    <View style="background-color: #e8e8e8">
      <View style="display: flex; padding: 16px">
        <View style="padding: 5px">
          <KdProgress :percentage="percentage" />
        </View>
        <View style="padding: 5px">
          <KdProgress :percentage="percentage" mode="dark" />
        </View>
      </View>
      <View style="display: flex; padding: 16px">
        <View style="padding: 5px">
          <KdProgress :percentage="percentage" text="加载中..." />
        </View>
        <View style="padding: 5px">
          <KdProgress :percentage="percentage" mode="dark" text="加载中..." />
        </View>
      </View>
      <View style="display: flex; padding: 16px">
        <View style="padding: 5px">
          <KdProgress :percentage="percentage" horizontal text="加载中..." />
        </View>
        <View style="padding: 5px">
          <KdProgress :percentage="percentage" mode="dark" horizontal text="加载中..." />
        </View>
      </View>
      <View style="padding: 16px">
        <View style="padding: 5px">
          <KdProgress :percentage="percentage" type="track" />
        </View>
        <View style="padding: 5px">
          <KdProgress :percentage="percentage" type="track" mode="dark" />
        </View>
      </View>
      <View style="padding: 16px">
        <View style="padding: 5px">
          <KdProgress :percentage="percentage" type="track" text="加载中..." />
        </View>
        <View style="padding: 5px">
          <KdProgress :percentage="percentage" type="track" mode="dark" text="加载中..." />
        </View>
      </View>
      <View style="padding: 16px">
        <View style="padding: 5px">
          <KdProgress :percentage="percentage" type="track" horizontal text="加载中..." />
        </View>
        <View style="padding: 5px">
          <KdProgress
            :percentage="percentage"
            type="track"
            mode="dark"
            horizontal
            text="加载中..."
          />
        </View>
      </View>
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import { ref } from '@minivue/core'
import { KdPage, KdProgress } from '@minivue/ui'

const percentage = ref(0)

setInterval(() => {
  if (percentage.value < 80) {
    percentage.value += 10
  }
}, 100)
</script>

<config lang="json">
{
  "navigationBarTitleText": "进度组件",
  "disableScroll": true
}
</config>
