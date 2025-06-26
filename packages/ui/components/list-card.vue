<template>
  <View class="kd-list-card">
    <slot />
  </View>
</template>

<script setup lang="ts">
defineOptions({
  name: 'KdListCard',
})
</script>

<style>
.kd-list-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  padding: 4px 0;
  overflow: hidden;
  background: var(--kd-color-background-bottom);
  border-radius: 12px;
}

.kd-list-card + .kd-list-card {
  margin-top: 8px;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
