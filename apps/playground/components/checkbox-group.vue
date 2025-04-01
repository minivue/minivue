<template>
  <slot />
</template>

<script setup lang="ts" generic="T extends any[]">
/** 状态改变 */
interface Events<T> {
  change: [value: T]
}

defineEmits<Events<T>>()

defineOptions({
  name: 'KdCheckboxGroup',
  relations: {
    '../checkbox/checkbox': {
      type: 'child',
    },
  },
})

defineProps<{ value: T }>()
</script>

<config lang="json">
{
  "component": true
}
</config>
