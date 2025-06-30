<template>
  <KdPage title="加载组件">
    <View style="background-color: #ccc">
      <KdLoading text="加载中…" size="s" />
      <KdLoading text="加载中…" size="m" />
      <KdLoading text="加载中…" size="l" />
      <KdLoading text="加载中…" mode="dark" />
      <KdLoading text="加载中…" size="s" vertical />
      <KdLoading text="加载中…" size="m" vertical />
      <KdLoading text="加载中…" size="l" vertical />
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import { KdPage, KdLoading } from '@minivue/ui'
</script>

<config lang="json">
{
  "navigationBarTitleText": "加载组件",
  "disableScroll": true
}
</config>
