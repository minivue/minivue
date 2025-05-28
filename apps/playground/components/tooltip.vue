<template>
  <KdPopover :placement="placement || 'bottom'" :gap="4" @show="onShow" @hide="onHide">
    <slot />
    <View v-if="show" class="kd-tooltip-arrow"></View>
    <View class="kd-tooltip" slot="content">
      <View class="kd-tooltip__text">
        <Text overflow="ellipsis" :max-lines="2">{{ text }}</Text>
      </View>
    </View>
  </KdPopover>
</template>

<script setup lang="ts">
import { ref } from '@minivue/core'
import KdPopover from './popover.vue'
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

interface Props {
  /** 内容 */
  text: string
  /** 位置 */
  placement?: Placement
}

defineOptions({
  name: 'KdTooltip',
})

defineProps<Props>()

const show = ref(false)

const onShow = () => (show.value = true)
const onHide = () => (show.value = false)
</script>

<style>
.kd-tooltip-arrow {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='4'%3E%3Cpath d='M4.336 1.109a3 3 0 0 1 3.328 0L12 4H0l4.336-2.891z' /%3E%3C/svg%3E");

  position: absolute;
  top: 100%;
  left: 50%;
  width: 12px;
  height: 4px;
  margin-left: -6px;
  background: var(--kd-color-mask-heavy);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  -webkit-mask-image: var(--icon);
  mask-image: var(--icon);
}

.kd-tooltip {
  box-sizing: border-box;
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

.kd-tooltip__text {
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
  "component": true
}
</config>
