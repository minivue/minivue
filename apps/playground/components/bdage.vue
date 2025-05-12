<template>
  <View :class="classes">{{ innerContent }}</View>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'
import { classObjectToString } from './utils'

interface Props {
  /** 数量 */
  content?: string
  /** 是否有消息 */
  ellipsis?: boolean
}

defineOptions({
  name: 'KdBdage',
})

const { content, ellipsis } = defineProps<Props>()

const innerContent = computed(() => (ellipsis ? '' : content))

const classes = computed(() =>
  classObjectToString('kd-bdage', {
    'kd-bdage--content': innerContent.value,
    'kd-bdage--ellipsis': ellipsis,
  }),
)
</script>

<style>
.kd-bdage {
  position: absolute;
  top: 0;
  right: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  font-size: 10px;
  line-height: 100%;
  color: var(--kd-color-text-white);
  background-color: var(--kd-color-error-normal);
  border: 2px solid var(--kd-color-line-white);
  border-radius: 999px;
  transform: translate(50%, -50%);
}

.kd-bdage--content {
  width: auto;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  padding: 4px;
}

.kd-bdage--ellipsis {
  width: 26px;
  height: 20px;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0ibm9uZSI+PGcgZmlsbD0iI2ZmZiI+PGNpcmNsZSBjeD0iNiIgY3k9IjgiIHI9IjEiLz48Y2lyY2xlIGN4PSIxMSIgY3k9IjgiIHI9IjEiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjgiIHI9IjEiLz48L2c+PC9zdmc+');
  background-repeat: no-repeat;
  background-position: center center;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
