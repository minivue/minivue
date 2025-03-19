<template>
  <KdPage>
    <View style="padding-top: 60px">
      <KdButton type="primary" dropdown>主要按钮</KdButton>
      <KdButton type="primary" size="l" dropdown loading>主要按钮</KdButton>
      <KdButton type="primary" size="xl" dropdown disabled>主要按钮</KdButton>
    </View>
    <View>
      <KdButton type="primary" ai dropdown>主要按钮</KdButton>
      <KdButton type="primary" size="l" loading dropdown ai>主要按钮</KdButton>
      <KdButton type="primary" size="xl" disabled dropdown ai>主要按钮</KdButton>
    </View>
    <View>
      <KdButton type="primary" danger dropdown>主要按钮</KdButton>
      <KdButton type="primary" size="l" loading danger dropdown>主要按钮</KdButton>
      <KdButton type="primary" size="xl" disabled danger dropdown>主要按钮</KdButton>
    </View>
    <View>
      <KdButton>次要按钮</KdButton>
      <KdButton size="l">次要按钮</KdButton>
      <KdButton size="xl">次要按钮</KdButton>
    </View>
    <View>
      <KdButton highlight dropdown>次要按钮</KdButton>
      <KdButton size="l" highlight dropdown>次要按钮</KdButton>
      <KdButton size="xl" highlight dropdown>次要按钮</KdButton>
    </View>
    <View>
      <KdButton type="light" dropdown>轻浅按钮</KdButton>
      <KdButton type="light" size="l" dropdown>轻浅按钮</KdButton>
      <KdButton type="light" size="xl" dropdown>轻浅按钮</KdButton>
    </View>
    <View>
      <KdButton type="light" highlight dropdown>轻浅按钮</KdButton>
      <KdButton type="light" size="l" highlight dropdown>轻浅按钮</KdButton>
      <KdButton type="light" size="xl" highlight dropdown>轻浅按钮</KdButton>
    </View>
    <View>
      <KdButton type="light" danger dropdown>轻浅按钮</KdButton>
      <KdButton type="light" size="l" danger dropdown>轻浅按钮</KdButton>
      <KdButton type="light" size="xl" danger dropdown>轻浅按钮</KdButton>
    </View>
    <View>
      <KdButton dropdown>次要按钮</KdButton>
      <KdButton size="l" dropdown>次要按钮</KdButton>
      <KdButton size="xl" dropdown>次要按钮</KdButton>
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
