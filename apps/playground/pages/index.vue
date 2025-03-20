<template>
  <KdPage>
    <KdDivider />
    <KdDivider vertical style="height: 50px; margin-left: 100px" />
    <View style="padding-top: 60px">
      <KdButton type="secondary" icon="deepseek" only-icon></KdButton>
      <KdButton type="primary" size="l">主要按钮</KdButton>
      <KdButton type="primary" size="xl" disabled dropdown>主要按钮</KdButton>
    </View>
    <View>
      <KdButton type="primary" ai dropdown>主要按钮</KdButton>
      <KdButton type="primary" size="l" loading ai>主要按钮</KdButton>
      <KdButton type="primary" size="xl" disabled dropdown ai>主要按钮</KdButton>
    </View>
    <View>
      <KdButton type="primary" danger dropdown>主要按钮</KdButton>
      <KdButton type="primary" size="l" loading danger>主要按钮</KdButton>
      <KdButton type="primary" size="xl" disabled danger dropdown>主要按钮</KdButton>
    </View>
    <View>
      <KdButton>次要按钮</KdButton>
      <KdButton size="l">次要按钮</KdButton>
      <KdButton size="xl" loading>次要按钮</KdButton>
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
    <View>
      <KdButton type="light" icon="deepseek" vertical>主要按钮</KdButton>
      <KdButton type="secondary" icon="deepseek" size="l" vertical>主要按钮</KdButton>
      <KdButton type="light" icon="deepseek" size="xl" vertical loading>主要按钮</KdButton>
    </View>
    <View>
      <KdButton type="light" icon="deepseek" vertical dropdown>主要按钮</KdButton>
      <KdButton type="secondary" icon="deepseek" vertical dropdown>主要按钮</KdButton>
      <KdButton type="light" icon="deepseek" vertical loading dropdown>主要按钮</KdButton>
    </View>
    <View class="group">
      <KdButton type="primary" size="xl">次要按钮</KdButton>
      <KdButton type="primary" size="xl">次要按钮</KdButton>
      <KdButton type="primary" size="xl">次要按钮</KdButton>
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdButton from '@/components/button.vue'
import KdDivider from '@/components/divider.vue'
</script>

<style>
.group {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 12px 16px;
  background: var(--kd-color-background-middle);
}
</style>

<config lang="json">
{
  "navigationBarTitleText": "首页",
  "disableScroll": true
}
</config>
