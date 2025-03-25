<template>
  <View :class="classes">
    <Checkbox :checked="value" :disabled="disabled" @change="onChange" />
  </View>
</template>

<script setup lang="ts">
import { computed, ref } from '@minivue/core'
import { classObjectToString } from './utils'

defineOptions({
  name: 'KdCheckbox',
})

interface Props {
  /** 是否选中 */
  checked?: boolean
  /** 是否禁用 */
  disabled?: boolean
}

interface Events {
  /** 状态改变 */
  change: [value: boolean]
}

const emit = defineEmits<Events>()

const { checked, disabled } = defineProps<Props>()

const value = ref(checked)

const classes = computed(() =>
  classObjectToString('kd-checkbox', {
    'kd-checkbox--checked': value.value,
    'kd-checkbox--disabled': disabled,
  }),
)

const onChange = (e: WechatMiniprogram.SwitchChange) => {
  value.value = e.detail.value
  emit('change', e.detail.value)
}
</script>

<style>
.kd-checkbox {
  position: relative;
}

.kd-checkbox--disabled {
  opacity: 0.4;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
