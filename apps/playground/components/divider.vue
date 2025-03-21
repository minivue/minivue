<template>
  <View :class="classes"></View>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'
import { classObjectToString } from './utils'

defineOptions({
  name: 'KdDivider',
})

interface Props {
  /** 是否垂直 */
  vertical?: boolean
}

const { vertical } = defineProps<Props>()

const classes = computed(() =>
  classObjectToString('kd-divider', {
    'kd-divider--vertical': vertical,
  }),
)
</script>

<style>
.kd-divider {
  display: flex;
  flex-shrink: 0;
  align-self: stretch;
  height: 0.5px;
  background: var(--kd-color-line-light);
}

.kd-divider--vertical {
  width: 0.5px;
  height: auto;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
