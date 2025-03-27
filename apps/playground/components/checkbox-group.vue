<template>
  <slot />
</template>

<script setup lang="ts">
defineOptions({
  name: 'KdCheckboxGroup',
  relations: {
    '../checkbox/checkbox': {
      type: 'child',
    },
  },
})

interface Events {
  /** 状态改变 */
  change: [value: string[]]
}

defineEmits<Events>()

const value = defineModel('value')

console.log(value)
</script>

<config lang="json">
{
  "component": true
}
</config>
