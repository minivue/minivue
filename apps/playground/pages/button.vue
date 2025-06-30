<template>
  <KdPage title="按钮组件">
    <View>
      <KdButton type="secondary" icon="menu" only-icon></KdButton>
      <KdButton type="primary" icon="menu" size="l">主要按钮</KdButton>
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
      <KdButton highlight dropdown :active="active" @tap="onActive">次要按钮</KdButton>
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
      <KdButton type="light" icon="menu" vertical>主要按钮</KdButton>
      <KdButton type="secondary" icon="menu" size="l" vertical>主要按钮</KdButton>
      <KdButton type="light" icon="menu" size="xl" vertical loading>主要按钮</KdButton>
    </View>
    <View>
      <KdButton type="light" icon="menu" vertical dropdown>主要按钮</KdButton>
      <KdButton type="secondary" icon="menu" vertical dropdown>主要按钮</KdButton>
      <KdButton type="light" icon="menu" vertical loading dropdown>主要按钮</KdButton>
    </View>
    <KdButtonGroup>
      <KdButton size="xl">次要按钮</KdButton>
      <KdButton type="primary" size="xl">次要按钮</KdButton>
    </KdButtonGroup>
    <KdButtonGroup vertical>
      <KdButton type="primary" size="xl">次要按钮</KdButton>
      <KdButton size="xl">次要按钮</KdButton>
    </KdButtonGroup>
    <KdButtonGroup>
      <KdButton size="l">次要按钮</KdButton>
      <KdButton size="l">次要按钮</KdButton>
      <KdButton type="primary" size="l">次要按钮</KdButton>
    </KdButtonGroup>
    <KdButtonGroup vertical>
      <KdButton type="primary" size="l">次要按钮</KdButton>
      <KdButton size="l">次要按钮</KdButton>
    </KdButtonGroup>
  </KdPage>
</template>

<script setup lang="ts">
import { ref } from '@minivue/core'
import { KdPage, KdButton, KdButtonGroup } from '@minivue/ui'

const active = ref(false)

const onActive = () => {
  active.value = !active.value
}
</script>

<config lang="json">
{
  "navigationBarTitleText": "按钮组件",
  "disableScroll": true
}
</config>
