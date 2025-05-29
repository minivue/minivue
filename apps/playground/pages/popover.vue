<template>
  <KdPage title="弹出层组件">
    <KdPopover
      placement="bottom"
      reference="touch"
      trigger="longpress"
      style="display: flex; align-items: center; justify-content: center; height: 100%"
    >
      <View> 长按任何地方 </View>
      <KdHoverToolbar :items="items" slot="content" />
    </KdPopover>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdPopover from '@/components/popover.vue'
import KdHoverToolbar from '@/components/hover-toolbar.vue'

const items = [
  {
    icon: 'dialog',
    text: '编辑',
  },
  {
    icon: 'dialog',
    text: '复制',
  },
  {
    icon: 'dialog',
    text: '高亮',
  },
  {
    icon: 'dialog',
    text: '下划线',
  },
  {
    icon: 'dialog',
    text: '删除批注',
  },
  {
    icon: 'dialog',
    text: '词典',
  },
  {
    icon: 'dialog',
    text: '查找',
  },
  {
    icon: 'dialog',
    text: '朗读',
  },
  {
    icon: 'dialog',
    text: '分享',
  },
  {
    icon: 'dialog',
    text: '添加附注',
  },
]
</script>

<config lang="json">
{
  "navigationBarTitleText": "弹窗层组件",
  "disableScroll": true
}
</config>
