<template>
  <KdPage title="轻提示组件">
    <View class="p-toast">
      <KdButton
        v-for="example in examples || []"
        :key="example.title"
        @tap="onTap(example.options)"
        size="xl"
        type="primary"
        style="width: 100% !important; margin-top: 10px"
      >
        {{ example.title }}
      </KdButton>
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import { showToast, hideToast } from '@/api'
import KdButton from '@/components/button.vue'
import KdPage from '@/components/page.vue'
import { KdToastOptions } from '@/type'

const examples: {
  title: string
  options: KdToastOptions<boolean>
}[] = [
  {
    title: '基本用法',
    options: {
      content: '信息通知',
    },
  },
  {
    title: '基本用法,长内容',
    options: {
      content: '这是一个轻量级反馈,随着文本自适应宽度，撑满屏幕宽度，左右留 16 安全间距',
    },
  },
  {
    title: '警告',
    options: {
      content: '这是一个轻量级反馈',
      icon: 'warning',
      followUp: true,
    },
  },
  {
    title: '成功',
    options: {
      content: '这是一个轻量级反馈',
      icon: 'success',
      followUp: true,
    },
  },
  {
    title: '错误',
    options: {
      content: '这是一个轻量级反馈',
      icon: 'error',
      followUp: true,
    },
  },
  {
    title: '信息',
    options: {
      content: '这是一个轻量级反馈',
      icon: 'info',
      followUp: true,
    },
  },
  {
    title: '带图标,长内容',
    options: {
      content: '这是一个轻量级反馈,随着文本自适应宽度，撑满屏幕宽度，左右留 16 安全间距',
      icon: 'info',
    },
  },
  {
    title: '加载中',
    options: {
      content: '加载中',
      icon: 'loading',
    },
  },
  {
    title: '进度',
    options: {
      id: 'progress',
      content: '文件上传中',
      icon: 'progress',
      percentage: 0,
    },
  },
  {
    title: '带操作按钮',
    options: {
      content: '这是一个轻量级反馈',
      action: '我知道了',
      onAction() {
        console.log('onAction:', '我知道了')
      },
    },
  },
  {
    title: '带操作按钮和关闭按钮',
    options: {
      content: '这是一个轻量级反馈',
      action: '我知道了',
      closeable: true,
      onAction() {
        console.log('onAction:', '我知道了')
      },
    },
  },
  {
    title: '带图标和操作按钮和关闭按钮',
    options: {
      icon: 'info',
      content: '这是一个轻量级反馈',
      action: '我知道了',
      closeable: true,
      onAction() {
        console.log('onAction:', '我知道了')
      },
    },
  },
  {
    title: '操作按钮和关闭按钮和长内容',
    options: {
      content: '这是一个轻量级反馈,随着文本自适应宽度，撑满屏幕宽度，左右留 16 安全间距',
      action: '我知道了',
      closeable: true,
      onAction() {
        console.log('onAction:', '我知道了')
      },
    },
  },
  {
    title: '长内容，长操作按钮',
    options: {
      content: '这是一个轻量级反馈,随着文本自适应宽度，撑满屏幕宽度，左右留 16 安全间距',
      action: '操作文本行数超过1行',
      closeable: true,
      onAction() {
        console.log('onAction:', '我知道了')
      },
    },
  },
  {
    title: '加载中hud',
    options: {
      hud: true,
      content: '加载中',
      icon: 'loading',
    },
  },
  {
    title: '成功hud',
    options: {
      hud: true,
      content: '成功',
      icon: 'success',
    },
  },
  {
    title: '成功hud，没有文本',
    options: {
      hud: true,
      icon: 'success',
    },
  },
  {
    title: '失败hud',
    options: {
      hud: true,
      content: '一段长文本，推荐最多2行',
      icon: 'error',
    },
  },
]

let interval: NodeJS.Timeout

const onTap = (options: KdToastOptions<boolean>) => {
  if (options.icon === 'loading') {
    showToast(options)
    setTimeout(() => {
      hideToast()
    }, 2000)
  } else if (options.icon === 'progress') {
    clearInterval(interval)
    options.percentage = 0
    showToast(options)
    interval = setInterval(() => {
      options.percentage = options.percentage! + 10
      if (options.percentage! >= 100) {
        clearInterval(interval)
        hideToast()
      } else {
        showToast(options)
      }
    }, 1000)
  } else {
    showToast(options)
  }
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
  "navigationBarTitleText": "轻提示组件",
  "disableScroll": true
}
</config>
