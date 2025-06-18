<template>
  <KdPage title="弹窗组件">
    <View style="padding: 16px">
      <KdButton @tap="onTap1">打开弹窗</KdButton>
      <KdButton @tap="onTap2" style="margin-left: 16px">打开弹窗(API)</KdButton>
    </View>
    <View slot="dialog">what the fuck!</View>
  </KdPage>
  <KdDialog
    :show="show"
    icon="success"
    title="标题信息"
    image="https://static.fotor.com.cn/assets/projects/pages/fc1479fd-e288-431c-80a7-81d2217b3161_51e2ff74-9e96-4f43-8706-18022a551136_new_thumb.jpg"
    image-width="600"
    image-height="333"
    content="1行正文居中对齐，大于等于2行正文左对齐"
    confirm-text="删除"
    confirm-type="danger"
    @change="onShowChange"
  />
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdDialog from '@/components/dialog.vue'
import KdButton from '@/components/button.vue'
import { showDialog } from '@/api'
import { ref } from '@minivue/core'

const show = ref(false)

const onTap1 = () => {
  show.value = true
}

const onTap2 = () => {
  showDialog({
    slot: 'dialog',
    icon: 'success',
    title: '标题信息',
    image:
      'https://static.fotor.com.cn/assets/projects/pages/fc1479fd-e288-431c-80a7-81d2217b3161_51e2ff74-9e96-4f43-8706-18022a551136_new_thumb.jpg',
    imageWidth: 600,
    imageHeight: 333,
    content: '1行正文居中对齐，大于等于2行正文左对齐',
    confirmText: '删除',
    confirmType: 'danger',
    onCancel() {
      console.warn('onCancel')
    },
    onClose() {
      console.warn('onClose')
    },
    onConfirm() {
      console.warn('onConfirm')
    },
  })
}

const onShowChange = (val: boolean) => {
  show.value = val
}
</script>

<config lang="json">
{
  "navigationBarTitleText": "弹窗组件",
  "disableScroll": true
}
</config>
