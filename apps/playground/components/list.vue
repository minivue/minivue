<template>
  <View class="kd-list">
    <slot />
  </View>
</template>

<script setup lang="ts">
defineOptions({
  name: 'KdList',
})
</script>

<style>
.kd-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  padding: 12px;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
