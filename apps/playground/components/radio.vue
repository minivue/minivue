<template>
  <View :class="classes" @tap.stop="onTap"></View>
</template>

<script setup lang="ts" generic="T extends any">
import { computed, getCurrentInstance, ComponentInstance, ref, watch } from '@minivue/core'
import { classObjectToString, getRelationNodes } from './utils'

defineOptions({
  name: 'KdRadio',
  relations: {
    '../cell/cell': {
      type: 'ancestor',
    },
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
  /** 单选勾 */
  mark?: boolean
  /** radio标识，选中时触发radio-group的 change 事件，并携带 radio 的 value */
  value?: T
}

interface Events {
  /** 状态改变 */
  change: [value: boolean]
}

const emit = defineEmits<Events>()

const { value, mark, checked, disabled } = defineProps<Props>()

const innerChecked = ref(checked)

const ctx = getCurrentInstance<ComponentInstance & { parent: ComponentInstance }>()

const classes = computed(() =>
  classObjectToString('kd-radio', {
    'kd-radio--mark': mark,
    'kd-radio--checked': innerChecked.value,
    'kd-radio--disabled': disabled,
  }),
)

// 注意不要改这个名字，有外部调用
const onTap = () => {
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

.kd-radio--mark {
  background-color: transparent;
  border-color: transparent;
}

.kd-radio--mark::after {
  display: none;
}

.kd-radio--mark.kd-radio--checked {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 10.368l5.167 5.495L18 6.69' stroke='%231F69E0' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}
</style>

<config lang="json">
{
  "component": true
}
</config>
