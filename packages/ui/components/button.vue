<template>
  <Button>
    <slot />
  </Button>
</template>

<script setup lang="ts">
defineOptions({
  name: 'KdButton',
})
</script>

<style>
.kd-button {
  color: var(--kd-color-text-primary);
}
</style>
