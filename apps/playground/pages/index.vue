<template>
  <KdPage title="minivue组件库">
    <View class="p-index">
      <KdButton type="primary" size="xl" @tap="onTap('/pages/button/button')"> 按钮组件 </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/controls/controls')">
        控制组件
      </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/divider/divider')">
        分割线组件
      </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/link/link')"> 链接组件 </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/loading/loading')">
        加载组件
      </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/progress/progress')">
        进度组件
      </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/toast/toast')"> 轻提示组件 </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/message-bar/message-bar')">
        消息横幅组件
      </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/badge/badge')"> 徽标组件 </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/skeleton/skeleton')">
        骨架屏组件
      </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/input/input')">
        文本输入框组件
      </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/avatar/avatar')"> 头像组件 </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/tabbar/tabbar')">
        标签栏组件
      </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/toolbar/toolbar')">
        悬浮工具栏
      </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/tooltip/tooltip')">
        气泡组件
      </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/popover/popover')">
        弹出层组件
      </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/drawer/drawer')"> 抽屉组件 </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/actionsheet/actionsheet')">
        操作菜单组件
      </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/tabs/tabs')"> 选项卡组件 </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/dialog/dialog')"> 弹窗组件 </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/cell/cell')"> 单元格组件 </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/grid/grid')"> 宫格组件 </KdButton>
      <KdButton type="primary" size="xl" @tap="onTap('/pages/list/list')"> 列表组件 </KdButton>
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import { KdPage, KdButton } from '@minivue/ui'

function onTap(url: string) {
  wx.navigateTo({ url })
}
</script>

<style>
.p-index {
  padding: 16px;
}

.p-index .kd-button {
  width: 100% !important;
  margin-bottom: 10px;
}
</style>

<config lang="json">
{
  "navigationBarTitleText": "minivue组件库",
  "disableScroll": true
}
</config>
