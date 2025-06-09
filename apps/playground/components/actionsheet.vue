<template>
  <KdDrawer :show="innerShow" :scrollable="false" @change="onChange">
    <View class="kd-actionsheet">
      <Block v-if="title">
        <View class="kd-actionsheet__title">{{ title }}</View>
        <KdDivider />
      </Block>
      <Block v-for="item in items" :key="item.action">
        <KdButton
          type="light"
          size="xl"
          :icon="item.icon"
          :danger="item.danger"
          :disabled="item.disabled"
          :open-type="item.openType"
          @tap="onTap(item.action)"
        >
          {{ item.text }}
        </KdButton>
        <KdDivider />
      </Block>
      <View class="kd-actionsheet__split"></View>
      <KdButton type="light" size="xl" @tap="onCancelTap">取消</KdButton>
    </View>
  </KdDrawer>
</template>

<script setup lang="ts">
import { ref, watch } from '@minivue/core'
import KdDrawer from './drawer.vue'
import KdButton from './button.vue'
import KdDivider from './divider.vue'
import { KdActionSheetItem } from '../type'

defineOptions({
  name: 'KdActionsheet',
})

interface Events {
  /** 状态改变 */
  change: [value: boolean]
  /** 点击行为 */
  action: [action: string]
  /** 点击取消 */
  cancel: []
}

interface Props {
  show?: boolean
  title?: string
  items?: KdActionSheetItem<string>[]
}

const emit = defineEmits<Events>()
const { show } = defineProps<Props>()

const innerShow = ref(show)

const onTap = (action: string) => {
  innerShow.value = false
  emit('action', action)
}

const onChange = (val: boolean) => {
  innerShow.value = val
  emit('change', val)
}

const onCancelTap = () => {
  innerShow.value = false
  emit('cancel')
}

watch(
  () => show,
  () => {
    innerShow.value = show
  },
)
</script>

<style>
.kd-actionsheet {
  display: flex;
  flex-direction: column;
  background: var(--kd-color-background-middle);
}

.kd-actionsheet__title {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  align-self: stretch;
  justify-content: center;
  padding: 12px 16px;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base);
  color: var(--kd-color-text-tertiary);
  text-align: center;
}

.kd-actionsheet__split {
  height: 8px;
  background: var(--kd-color-fill-light);
}

.kd-actionsheet .kd-button {
  width: 100% !important;
  height: 56px;
  padding: 16px;
  border-radius: 0;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
