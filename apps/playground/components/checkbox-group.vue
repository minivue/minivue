<template>
  <slot />
</template>

<script setup lang="ts" generic="T extends any[]">
import { watch, getCurrentInstance, ComponentInstance } from '@minivue/core'

/** 状态改变 */
interface Events<T> {
  change: [value: T]
}

interface Props {
  value: T
}

defineOptions({
  name: 'KdCheckboxGroup',
  relations: {
    '../checkbox/checkbox': {
      type: 'child',
    },
  },
})

defineEmits<Events<T>>()

const { value } = defineProps<Props>()

const ctx = getCurrentInstance<ComponentInstance>()

watch(
  () => value,
  (val) => {
    const checkboxes = ctx.getRelationNodes('../checkbox/checkbox')
    checkboxes.forEach((checkbox) => {
      const props = checkbox.__props__
      if (props.master) {
        const allCount = checkboxes.length - 1
        if (val.length > 0 && val.length < allCount) {
          props.indeterminate = true
          props.checked = false
        } else {
          props.indeterminate = false
          props.checked = val.length === allCount
        }
      } else {
        props.checked = val.includes(props.value)
      }
    })
  },
)
</script>

<config lang="json">
{
  "component": true
}
</config>
