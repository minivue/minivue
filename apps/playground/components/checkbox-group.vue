<template>
  <CheckboxGroup @change="onChange">
    <slot />
  </CheckboxGroup>
</template>

<script setup lang="ts">
defineOptions({
  name: 'KdCheckboxGroup',
})

interface Events {
  /** 状态改变 */
  change: [value: string[]]
}

const emit = defineEmits<Events>()

const onChange = (e: WechatMiniprogram.CheckboxGroupChange) => {
  console.log('onChange:', e.detail.value)
  emit('change', e.detail.value)
}
</script>

<style>
.kd-checkbox {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: var(--kd-border-radius-circle);
  box-shadow: inset 0 0 0 1.5px var(--kd-color-line-medium);
}

.kd-checkbox--checked,
.kd-checkbox--indeterminate {
  background-color: var(--kd-color-public-normal) !important;
  box-shadow: none;
}

.kd-checkbox--checked {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 22' fill='none'%3E%3Cpath d='M6 10.628l3.691 3.925L16 8' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}

.kd-checkbox--disabled {
  background-color: var(--kd-color-line-regular);
  opacity: 0.4;
}

.kd-checkbox--indeterminate {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 22' fill='none'%3E%3Cpath d='M6 11h10' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}
</style>

<config lang="json">
{
  "component": true
}
</config>
