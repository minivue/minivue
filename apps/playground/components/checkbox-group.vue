<template>
  <slot />
</template>

<script setup lang="ts">
import { setCheckboxValues } from './utils'

defineOptions({
  name: 'KdCheckboxGroup',
  relations: {
    '../checkbox/checkbox': {
      type: 'child',
      linked: setCheckboxValues,
      linkChanged: setCheckboxValues,
      unlinked: setCheckboxValues,
    },
  },
})

interface Events {
  /** 状态改变 */
  change: [value: string[]]
}

defineEmits<Events>()
</script>

<config lang="json">
{
  "component": true
}
</config>
