<template>
  <slot />
</template>

<script setup lang="ts">
import { onResize } from '@minivue/core'
import { getWindowInfo } from './utils'

interface Events {
  match: [boolean]
}

interface Props {
  /** 最小宽度 */
  minWidth?: number
  /** 最大宽度 */
  maxWidth?: number
}

defineOptions({
  name: 'KdMatchScreen',
})

const emit = defineEmits<Events>()
const { minWidth, maxWidth } = defineProps<Props>()

const check = () => {
  const { screenWidth } = getWindowInfo()
  if (minWidth && screenWidth < minWidth) {
    return false
  }
  if (maxWidth && screenWidth > maxWidth) {
    return false
  }
  return true
}

emit('match', check())

onResize(() => emit('match', check()))
</script>

<config lang="json">
{
  "component": true
}
</config>
