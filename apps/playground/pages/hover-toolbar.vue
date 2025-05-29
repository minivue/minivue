<template>
  <KdPage title="悬浮工具栏">
    <KdHoverToolbar :items="items" />
  </KdPage>
</template>

<script setup lang="ts">
import KdHoverToolbar from '@/components/hover-toolbar.vue'
import KdPage from '@/components/page.vue'

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
  // {
  //   icon: 'dialog',
  //   text: '添加附注',
  // },
]
</script>

<config lang="json">
{
  "navigationBarTitleText": "悬浮工具栏",
  "disableScroll": true
}
</config>
