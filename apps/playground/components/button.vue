<template>
  <Button @tap="onTap(obj)"> <slot />{{ tmp }} </Button>
</template>

<script setup lang="ts">
import { computed, onReady } from '@minivue/core'

const emit = defineEmits<{
  /**
   * 操
   */
  fuck: [p1: number, p2: string, p3: boolean]
}>()

const props = defineProps<{
  index?: number
}>()

const obj: object = { hello: '你好' }

const tmp = computed(() => {
  return 'i' + props.index
})

onReady(() => {
  emit('fuck', 1, '', true)
  console.log('onReady', props.index)
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
