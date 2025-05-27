<template>
  <KdPage title="气泡组件">
    <View style="display: flex; align-items: center; justify-content: center; height: 100%">
      <KdPopover :placement="placement">
        <KdButton>气泡</KdButton>
        <View class="content" slot="content">
          <View class="text">
            <Text overflow="ellipsis" :max-lines="2">
              asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
            </Text>
          </View>
        </View>
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

<style>
.content {
  min-width: 70px;
  max-width: 320px;
  min-height: 46px;
  max-height: 68px;
  padding: 12px 16px;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base);
  color: var(--kd-color-text-white);
  background: var(--kd-color-mask-heavy);
  border-radius: 12px;
  backdrop-filter: blur(5px);
}

.content .text {
  box-sizing: border-box;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
</style>

<config lang="json">
{
  "navigationBarTitleText": "气泡组件",
  "disableScroll": true
}
</config>
