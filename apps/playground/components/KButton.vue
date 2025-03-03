<template>
  <Button @tap="onTap(obj)">
    <slot />
  </Button>
</template>

<script setup lang="ts">
import { onReady } from '@minivue/core'

const emit = defineEmits<{
  /**
   * 操
   */
  fuck: [p1: number, p2: string, p3: boolean]
}>()

const props = defineProps<{
  likes?: number
}>()

const obj: object = { hello: '你好' }

onReady(() => {
  emit('fuck', 1, '', true)
  console.log('onReady', props.likes)
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
