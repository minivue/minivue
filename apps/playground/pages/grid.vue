<template>
  <KdPage title="宫格组件">
    <KdGrid :items="items" @action="onAction" />
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdGrid from '@/components/grid.vue'

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

const onAction = (action: string) => {
  console.log(action)
}
</script>

<config lang="json">
{
  "navigationBarTitleText": "宫格组件",
  "disableScroll": true
}
</config>
