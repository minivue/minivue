<template>
  <Button> <slot />{{ obj.inner.msg }} </Button>
</template>

<script setup lang="ts">
defineOptions({
  name: 'KdButton',
})

defineProps<{
  obj: {
    inner: {
      msg: number
    }
  }
}>()
</script>

<style>
.kd-button {
  color: var(--kd-color-text-primary);
}
</style>

<config lang="json">
{
  "component": true
}
</config>
