<template>
  <View :class="classes">
    <Checkbox
      style="opacity: 0"
      :value="value"
      :checked="innerChecked"
      :disabled="disabled"
      @tap="onChange"
    />
  </View>
</template>

<script setup lang="ts">
import { computed, ref, watch, getCurrentInstance, ComponentInstance } from '@minivue/core'
import { classObjectToString } from './utils'

defineOptions({
  name: 'KdCheckbox',
  relations: {
    '../checkbox-group/checkbox-group': {
      type: 'parent',
      linked(target: any) {
        // @ts-ignore
        this.parent = target
      },
    },
  },
})

interface Props {
  /** 是否选中 */
  checked?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否为半选状态 */
  indeterminate?: boolean
  /** checkbox标识，选中时触发checkbox-group的 change 事件，并携带 checkbox 的 value */
  value?: string
}

interface Events {
  /** 状态改变 */
  change: [value: boolean]
}

const emit = defineEmits<Events>()

const { value, checked, disabled, indeterminate } = defineProps<Props>()

const innerChecked = ref(checked)

const currentContext = getCurrentInstance<ComponentInstance & { parent: ComponentInstance }>()

const classes = computed(() =>
  classObjectToString('kd-checkbox', {
    'kd-checkbox--checked': innerChecked.value,
    'kd-checkbox--disabled': disabled,
    'kd-checkbox--indeterminate': !innerChecked.value && indeterminate,
  }),
)

const onChange = () => {
  innerChecked.value = !innerChecked.value
  emit('change', innerChecked.value)
  // const parent = currentContext?.parent
  // if (parent) {
  //   // 延时执行，等innerChecked更新
  //   setTimeout(() => {
  //     setCheckboxValues.call(parent)
  //     parent.emit?.('change', parent.values)
  //   })
  // }
}

watch(
  () => {
    return currentContext?.parent?.value
  },
  (newValue) => {
    console.log('value:', newValue)
  },
)
</script>

<style>
.kd-checkbox {
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  border: solid 1.5px var(--kd-color-line-medium);
  border-radius: var(--kd-border-radius-circle);
}

.kd-checkbox--checked,
.kd-checkbox--indeterminate {
  background-color: var(--kd-color-public-normal) !important;
  border-color: var(--kd-color-public-normal) !important;
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
