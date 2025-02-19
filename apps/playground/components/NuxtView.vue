<template>
  <NuxtPage :page-key="getPageKey" />
</template>

<script setup lang="ts">
function getPageKey() {
  return 'page' + (import.meta.client ? history.state.position : 0)
}
</script>
