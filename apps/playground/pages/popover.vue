<template>
  <KdPage title="弹出层组件">
    <KdPopover
      placement="top"
      reference="touch"
      trigger="longpress"
      style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%"
    >
      <View> 长按任何地方 </View>
      <KdToolbar :items="items" slot="content" />
    </KdPopover>
  </KdPage>
</template>

<script setup lang="ts">
import { KdPage, KdPopover, KdToolbar } from '@minivue/ui'

const items = [
  {
    icon: 'dialog',
    text: '编辑',
    action: 'a1',
  },
  {
    icon: 'dialog',
    text: '复制',
    action: 'a2',
  },
  {
    icon: 'dialog',
    text: '高亮',
    action: 'a3',
  },
  {
    icon: 'dialog',
    text: '下划线',
    action: 'a4',
  },
  {
    icon: 'dialog',
    text: '删除批注',
    action: 'a5',
  },
  {
    icon: 'dialog',
    text: '词典',
    action: 'a6',
  },
  {
    icon: 'dialog',
    text: '查找',
    action: 'a7',
  },
  {
    icon: 'dialog',
    text: '朗读',
    action: 'a8',
  },
  {
    icon: 'dialog',
    text: '分享',
    action: 'a9',
  },
]
</script>

<config lang="json">
{
  "navigationBarTitleText": "弹窗层组件",
  "disableScroll": true
}
</config>
