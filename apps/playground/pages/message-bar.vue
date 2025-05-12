<template>
  <KdPage title="消息横幅组件">
    <KdMessageBar
      v-if="show"
      slot="top"
      type="info"
      action="升价会员"
      closeable
      system
      @close="onClose"
    >
      7天内免费找回，会员可找回90天内文件
    </KdMessageBar>
    <View class="p-message-bar">
      <KdMessageBar> 推荐进入阅读模式，提升阅读体验 </KdMessageBar>
      <KdMessageBar type="info" action="操作按钮" closeable style="margin-top: 10px">
        文本信息
      </KdMessageBar>
      <KdMessageBar type="success" action="操作按钮" closeable style="margin-top: 10px">
        文本信息
      </KdMessageBar>
      <KdMessageBar type="warning" action="操作按钮" closeable style="margin-top: 10px">
        文本信息
      </KdMessageBar>
      <KdMessageBar type="error" action="操作按钮" closeable style="margin-top: 10px">
        文本信息
      </KdMessageBar>
      <KdMessageBar icon="menu" action="操作按钮" closeable style="margin-top: 10px">
        文本信息
      </KdMessageBar>
      <KdMessageBar type="info" style="margin-top: 10px"> 文本信息推荐不超过2行 </KdMessageBar>
      <KdMessageBar type="info" title="标题信息" style="margin-top: 10px">
        文本信息推荐不超过2行
      </KdMessageBar>
      <KdMessageBar type="info" title="标题信息" action="操作按钮" style="margin-top: 10px">
        文本信息推荐不超过2行
      </KdMessageBar>
      <KdMessageBar
        type="info"
        title="标题信息"
        action="操作按钮"
        closeable
        style="margin-top: 10px"
      >
        推荐进入阅读模式，提升阅读体验
      </KdMessageBar>
      <KdMessageBar
        type="info"
        action="超长操作按钮超长操作按钮"
        closeable
        style="margin-top: 10px"
      >
        推荐进入阅读模式，提升阅读体验
      </KdMessageBar>
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdMessageBar from '@/components/message-bar.vue'
import { ref } from '@minivue/core'
const show = ref(true)

const onClose = () => {
  show.value = false
}
</script>

<style>
.p-message-bar {
  padding: 16px;
}
</style>

<config lang="json">
{
  "navigationBarTitleText": "消息横幅组件",
  "disableScroll": true
}
</config>
