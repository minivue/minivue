<template>
  <KdPopover :placement="placement || 'bottom'" :gap="8">
    <slot />
    <View class="kd-tooltip" slot="content">
      <View class="kd-tooltip__arrow"></View>
      <View class="kd-tooltip__text">
        <Text overflow="ellipsis" :max-lines="2">{{ text }}</Text>
      </View>
    </View>
  </KdPopover>
</template>

<script setup lang="ts">
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
</script>

<style>
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

.kd-tooltip__arrow {
  position: fixed;
  width: 0;
  height: 0;
  border-right: 6px solid transparent;
  border-bottom: 4px solid var(--kd-color-mask-heavy);
  border-left: 6px solid transparent;
  opacity: 0;
}

.kd-popover--show .kd-tooltip__arrow {
  opacity: 1;
}

.kd-popover--top .kd-tooltip__arrow,
.kd-popover--top-left .kd-tooltip__arrow,
.kd-popover--top-right .kd-tooltip__arrow {
  top: calc(var(--target-top) - 4px);
  left: calc(var(--target-left) + (var(--target-right) - var(--target-left)) / 2);
  transform: translate(-50%, -100%) rotate(180deg);
}

.kd-popover--bottom .kd-tooltip__arrow,
.kd-popover--bottom-left .kd-tooltip__arrow,
.kd-popover--bottom-right .kd-tooltip__arrow {
  top: calc(var(--target-bottom) + 4px);
  left: calc(var(--target-left) + (var(--target-right) - var(--target-left)) / 2);
  transform: translate(-50%, 0);
}

.kd-popover--left .kd-tooltip__arrow,
.kd-popover--left-top .kd-tooltip__arrow,
.kd-popover--left-bottom .kd-tooltip__arrow {
  top: calc(var(--target-top) + (var(--target-bottom) - var(--target-top)) / 2);
  left: calc(var(--target-left) - 4px);
  transform: translate(-50%, 0) rotate(90deg);
  transform-origin: center 0;
}

.kd-popover--right .kd-tooltip__arrow,
.kd-popover--right-top .kd-tooltip__arrow,
.kd-popover--right-bottom .kd-tooltip__arrow {
  top: calc(var(--target-top) + (var(--target-bottom) - var(--target-top)) / 2);
  left: calc(var(--target-right) + 4px);
  transform: translate(-50%, 0) rotate(-90deg);
  transform-origin: center 0;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
