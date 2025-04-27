<template>
  <KdPage title="Toast组件">
    <View class="p-toast">
      <KdButton
        @tap="onTap"
        size="xl"
        type="primary"
        style="width: 100% !important; margin-top: 50px"
      >
        check
      </KdButton>
    </View>
    <View class="p-toast">
      <KdButton
        @tap="onFollow"
        size="xl"
        type="primary"
        style="width: 100% !important; margin-top: 50px"
      >
        follow up
      </KdButton>
    </View>
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
import { showProgressToast, showSuccessToast } from '@/api'
import KdButton from '@/components/button.vue'
import KdPage from '@/components/page.vue'
import { ref } from '@minivue/core'
// const i = 1
const percentage = ref(0)
const onTap = () => {
  showProgressToast('信息通知に関するグローバル ヒント', percentage)
  setInterval(() => {
    percentage.value += 10
  }, 1000)
  // showToast({
  //   content: '情報通知に関するグローバル ヒント',
  //   action: '我知道了',
  //   duration: 2000,
  //   closeable: true,
  //   percentage: 50,
  //   onAction() {
  //     console.log('onAction')
  //   },
  //   onClose() {
  //     console.log('onClose')
  //   },
  // })
}

const onFollow = () => {
  showSuccessToast('解析完成', true)
}
</script>

<style>
.p-toast {
  padding: 16px;
}

.p-toast .kd-button {
  width: 100% !important;
  margin-top: 10px;
}
</style>

<config lang="json">
{
  "navigationBarTitleText": "Toast组件",
  "disableScroll": true
}
</config>
