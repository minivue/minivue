<template>
  <View :class="classes" @tap.stop="onChange"></View>
</template>

<script setup lang="ts" generic="T extends any">
import { computed, getCurrentInstance, ComponentInstance, ref, watch } from '@minivue/core'
import { classObjectToString, getRelationNodes } from './utils'

defineOptions({
  name: 'KdRadio',
  relations: {
    '../label/label': {
      type: 'ancestor',
    },
    '../radio-group/radio-group': {
      type: 'ancestor',
      linked: function (target: any) {
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
  /** radio标识，选中时触发radio-group的 change 事件，并携带 radio 的 value */
  value?: T
}

interface Events {
  /** 状态改变 */
  change: [value: boolean]
}

const emit = defineEmits<Events>()

const { value, checked, disabled } = defineProps<Props>()

const innerChecked = ref(checked)

const ctx = getCurrentInstance<ComponentInstance & { parent: ComponentInstance }>()

const classes = computed(() =>
  classObjectToString('kd-radio', {
    'kd-radio--checked': innerChecked.value,
    'kd-radio--disabled': disabled,
  }),
)

const onChange = () => {
  if (disabled || innerChecked.value) {
    return
  }
  innerChecked.value = true
  emit('change', true)
  const parent = ctx?.parent
  if (parent) {
    const radios = getRelationNodes(parent, '../radio/radio')
    radios.forEach((radio) => {
      const props = radio.__props__ as Props
      props.checked = ctx === radio
    })
    parent.emit('change', value)
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
.kd-radio {
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  overflow: hidden;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-size: cover;
  border: solid 1.5px var(--kd-color-line-medium);
  border-radius: var(--kd-border-radius-circle);
}

.kd-radio::after {
  display: inline-flex;
  width: 12px;
  height: 12px;
  content: '';
}

.kd-radio--checked {
  border-color: var(--kd-color-public-normal);
}

.kd-radio--checked::after {
  background-color: var(--kd-color-public-normal);
  border-radius: var(--kd-border-radius-circle);
}

.kd-radio--disabled {
  background-color: var(--kd-color-fill-extra-heavy);
  opacity: 0.4;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
