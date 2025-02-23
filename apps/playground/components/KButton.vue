<template>
  <button>{{ name }}</button>
</template>

<script setup lang="ts">
import { onReady } from '@minivue/core'
const name = 'KButton'
onReady(() => {
  console.log('onReady')
})
</script>

<config lang="json">
{
  "component": true
}
</config>
