<template>
  <View :class="classes" @tap.stop="onTap" hover-stop-propagation></View>
</template>

<script setup lang="ts">
import { computed, ref, watch } from '@minivue/core'
import { classObjectToString, vibrateShort } from './utils'

defineOptions({
  name: 'KdSwitch',
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

const innerChecked = ref(checked)

const classes = computed(() =>
  classObjectToString('kd-switch', {
    'kd-switch--checked': innerChecked.value,
    'kd-switch--disabled': disabled,
  }),
)

const onTap = () => {
  if (!disabled) {
    vibrateShort()
    innerChecked.value = !innerChecked.value
    emit('change', innerChecked.value)
  }
}

watch(
  () => checked,
  (newValue) => {
    innerChecked.value = newValue
  },
)
</script>

<style>
.kd-switch {
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  width: 52px;
  height: 28px;
  overflow: hidden;
  vertical-align: middle;
  background-color: var(--kd-color-fill-extra-heavy);
  border-radius: var(--kd-border-radius-circle);
  transition: background-color 0.3s;
}

.kd-switch::before {
  position: absolute;
  top: 2px;
  left: 2px;
  display: block;
  width: 24px;
  height: 24px;
  content: '';
  background-color: rgba(var(--kd-color-white), 1);
  border-radius: 50%;
  box-shadow: 0 1px 4px 0 rgba(13, 13, 13, 10%);
  transition: transform 0.3s;
}

.kd-switch--checked {
  background-color: var(--kd-color-public-normal);
}

.kd-switch--checked::before {
  transform: translateX(24px);
}

.kd-switch--disabled {
  opacity: 0.4;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
