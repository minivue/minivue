<template>
  <slot />
</template>

<script setup lang="ts">
/** 状态改变 */
interface Events {
  change: [value: any]
}

defineOptions({
  name: 'KdRadioGroup',
  relations: {
    '../radio/radio': {
      type: 'descendant',
    },
  },
})

defineEmits<Events>()
</script>

<config lang="json">
{
  "component": true
}
</config>
