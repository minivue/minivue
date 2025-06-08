<template>
  <KdPage title="操作菜单组件">
    <KdButton @tap="onTap">显示操作菜单</KdButton>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdButton from '@/components/button.vue'
import { showActionSheet } from '@/api'

const onTap = () => {
  showActionSheet({
    title: '推荐用简短标题',
    items: [
      {
        text: '操作按钮',
        action: 'action1',
      },
      {
        text: '操作按钮',
        danger: true,
        action: 'action2',
      },
      {
        text: '操作按钮',
        disabled: true,
        action: 'action3',
      },
    ],
    onAction: (action) => {
      console.log('action', action)
    },
    onCancel: () => {
      console.log('action cancel')
    },
  })
}
</script>

<config lang="json">
{
  "navigationBarTitleText": "操作菜单组件",
  "disableScroll": true
}
</config>
