<template>
  <Button @tap="onTap(props)"> <slot />{{ tmp }} </Button>
</template>

<script setup lang="ts">
import { computed, onReady } from '@minivue/core'

defineOptions({
  name: 'KdButton',
})

const emit = defineEmits<{
  /**
   * 操
   */
  fuck: [p1: number, p2: string, p3: boolean]
}>()

const props = defineProps<{
  obj?: {
    inner: {
      msg: number
    }
  }
}>()

const tmp = computed(() => {
  return 'i' + props.obj?.inner.msg
})

onReady(() => {
  emit('fuck', 1, '', true)
})

function onTap(o: object) {
  console.log('test', o)
}
</script>

<config lang="json">
{
  "component": true
}
</config>
