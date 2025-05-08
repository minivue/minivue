<template>
  <View class="kd-bdage">{{ count }}</View>
</template>

<script setup lang="ts">
interface Props {
  /** 数量 */
  count?: number
}

defineOptions({
  name: 'KdBdage',
})

defineProps<Props>()
</script>

<style>
.kd-bdage {
  position: absolute;
  top: -2px;
  right: -2px;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  font-size: 10px;
  line-height: 100%;
  color: var(--kd-color-text-white);
  background-color: var(--kd-color-error-normal);
  border: 2px solid var(--kd-color-background-bottom);
  border-radius: 999px;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
