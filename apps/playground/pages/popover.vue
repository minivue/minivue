<template>
  <KdPage title="气泡组件">
    <View style="display: flex; align-items: center; justify-content: center; height: 100%">
      <KdPopover :placement="placement">
        <KdButton>气泡</KdButton>
        <View slot="content"
          >工具提示工具提示工具提示工具提示工具提示工具提示工具提示工具提示工具提示工具提示工具提示工具提示</View
        >
      </KdPopover>
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdButton from '@/components/button.vue'
import KdPopover from '@/components/popover.vue'
import { ref } from '@minivue/core'

type Placement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'right'
  | 'rightTop'
  | 'rightBottom'
  | 'bottom'
  | 'bottomRight'
  | 'bottomLeft'
  | 'left'
  | 'leftTop'
  | 'leftBottom'

const placement = ref<Placement>('bottom')
// const allPosition = [
//   'topRight',
//   'top',
//   'topLeft',
//   'rightBottom',
//   'right',
//   'rightTop',
//   'bottomLeft',
//   'bottom',
//   'bottomRight',
//   'leftTop',
//   'left',
//   'leftBottom',
// ]
// let index = 0
// setInterval(() => {
//   placement.value = allPosition[index++ % allPosition.length] as Placement
// }, 200)
</script>

<config lang="json">
{
  "navigationBarTitleText": "气泡组件",
  "disableScroll": true
}
</config>
