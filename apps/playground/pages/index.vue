<template>
  <KdPage>
    <View style="padding-top: 60px">
      <KdButton type="primary">主要按钮</KdButton>
      <KdButton type="primary" size="l" loading>主要按钮</KdButton>
      <KdButton type="primary" size="xl" disabled>主要按钮</KdButton>
    </View>
    <View>
      <KdButton type="primary" ai>主要按钮</KdButton>
      <KdButton type="primary" size="l" loading ai>主要按钮</KdButton>
      <KdButton type="primary" size="xl" disabled ai>主要按钮</KdButton>
    </View>
    <View>
      <KdButton type="primary" danger>主要按钮</KdButton>
      <KdButton type="primary" size="l" loading danger>主要按钮</KdButton>
      <KdButton type="primary" size="xl" disabled danger>主要按钮</KdButton>
    </View>
    <View>
      <KdButton>次要按钮</KdButton>
      <KdButton size="l">次要按钮</KdButton>
      <KdButton size="xl">次要按钮</KdButton>
    </View>
    <View>
      <KdButton highlight>次要按钮</KdButton>
      <KdButton size="l" highlight>次要按钮</KdButton>
      <KdButton size="xl" highlight>次要按钮</KdButton>
    </View>
    <View>
      <KdButton type="light">轻浅按钮</KdButton>
      <KdButton type="light" size="l">轻浅按钮</KdButton>
      <KdButton type="light" size="xl">轻浅按钮</KdButton>
    </View>
    <View>
      <KdButton type="light" highlight>轻浅按钮</KdButton>
      <KdButton type="light" size="l" highlight>轻浅按钮</KdButton>
      <KdButton type="light" size="xl" highlight>轻浅按钮</KdButton>
    </View>
    <View>
      <KdButton type="light" danger>轻浅按钮</KdButton>
      <KdButton type="light" size="l" danger>轻浅按钮</KdButton>
      <KdButton type="light" size="xl" danger>轻浅按钮</KdButton>
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdButton from '@/components/button.vue'
</script>

<config lang="json">
{
  "navigationBarTitleText": "首页",
  "disableScroll": true
}
</config>
