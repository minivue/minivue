<template>
  <KdPage title="骨架屏组件">
    <View style="padding: 16px">
      <KdSkeleton />
      <KdSkeleton style="width: 50%; margin-top: 16px" />
      <KdSkeleton style="width: 50%; margin-top: 16px" />
      <KdSkeleton shape="square" style="margin-top: 16px" />
      <KdSkeleton shape="square" style="width: 60px; height: 60px; margin-top: 16px" />
      <KdSkeleton shape="circle" style="margin-top: 16px" />
      <KdSkeleton shape="circle" style="width: 60px; height: 60px; margin-top: 16px" />
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import { KdPage, KdSkeleton } from '@minivue/ui'
</script>

<config lang="json">
{
  "navigationBarTitleText": "骨架屏组件",
  "disableScroll": true
}
</config>
