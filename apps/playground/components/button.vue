<template>
  <Button class="kd-button"><slot /></Button>
</template>

<script setup lang="ts">
defineOptions({
  name: 'KdButton',
})
</script>

<style>
.kd-button {
  margin: 0 !important;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
