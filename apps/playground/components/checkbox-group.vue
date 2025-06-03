<template>
  <slot />
</template>

<script setup lang="ts" generic="T extends any[]">
import { watch, getCurrentInstance, ComponentInstance } from '@minivue/core'
import { getRelationNodes } from './utils'

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
      type: 'descendant',
    },
  },
})

defineEmits<Events<T>>()

const { value } = defineProps<Props>()

const ctx = getCurrentInstance<ComponentInstance>()

watch(
  () => value,
  (val) => {
    const checkboxes = getRelationNodes(ctx, '../checkbox/checkbox')
    const allCount = checkboxes.filter((checkbox) => !checkbox.__props__.master).length
    console.warn('[debug] checkbox group value change', allCount)
    checkboxes.forEach((checkbox) => {
      const props = checkbox.__props__
      if (props.master) {
        if (val.length > 0 && val.length < allCount) {
          props.indeterminate = true
          props.checked = false
        } else {
          props.indeterminate = false
          props.checked = val.length === allCount
        }
        // console.warn('[debug] checkbox group value change', val)
        console.warn('[debug] master set: ', JSON.stringify(props))
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
