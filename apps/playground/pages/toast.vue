<template>
  <KdPage title="Toast组件">
    <Button @tap="onTap" style="margin-top: 100px">check</Button>
    <!-- <KdToast
      :show="show"
      content="情報通知に関するグローバル ヒント"
      action="ボタン"
      @hide="onHide"
    /> -->
    <!-- <KdToast icon="loading" hud />
    <KdToast icon="loading" content="加载中" hud />
    <KdToast icon="success" content="加载成功" hud />
    <KdToast icon="error" content="加载失败" hud />
    <KdToast icon="loading" content="一段长文本，推荐最多2行" hud />
    <KdToast content="这是一个轻量级反馈" />
    <KdToast icon="loading" content="这是一个轻量级反馈这是一个轻量级反馈这是一个轻量级反馈" />
    <KdToast icon="loading" content="这是一个轻量级反馈" action="操作按钮" />
    <KdToast icon="progress" :percentage="50" content="这是一个轻量级反馈" action="操作按钮" />
    <KdToast content="这是一个轻量级反馈" action="操作按钮" />
    <KdToast content="情報通知に関するグローバル ヒント" action="ボタン" />
    <KdToast content="情報通知に関するグローバル ヒント" action="ボタン" :closeable="false" />
    <KdToast icon="success" content="这是一个轻量级反馈" />
    <KdToast icon="error" content="这是一个轻量级反馈" />
    <KdToast icon="info" content="这是一个轻量级反馈" />
    <KdToast icon="warning" content="这是一个轻量级反馈" action="操作按钮" /> -->
  </KdPage>
</template>

<script setup lang="ts">
import { showToast } from '@/api'
import KdPage from '@/components/page.vue'
let i = 1
const onTap = () => {
  showToast('情報通知に関するグローバル ヒント' + i++)
}
</script>

<config lang="json">
{
  "navigationBarTitleText": "Toast组件",
  "disableScroll": true
}
</config>
