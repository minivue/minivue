<template>
  <KdDrawer :show="innerShow" :scrollable="false" @change="onChange">
    <View class="kd-actionsheet">
      <Block v-if="innerTitle">
        <View class="kd-actionsheet__title">{{ innerTitle }}</View>
        <KdDivider />
      </Block>
      <Block v-for="item in innerItems || []" :key="item.action">
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
import { KdActionSheetItem, KdActionSheetOptions } from '../type'
import { getPage } from './utils'
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
const { show, title = '', items = [] } = defineProps<Props>()

const innerShow = ref(show)
const innerTitle = ref(title)
const innerItems = ref(items)
let actionsheetCallback: (action: string) => void = () => undefined
let actionsheetCancel: () => void = () => undefined

const onTap = (action: string) => {
  innerShow.value = false
  emit('action', action)
  actionsheetCallback(action)
}

const onChange = (val: boolean) => {
  innerShow.value = val
  emit('change', val)
}

const onCancelTap = () => {
  innerShow.value = false
  emit('cancel')
  actionsheetCancel()
}

// 这一写是为了不要把page对象在setup函数里面return出去
const exposeApi = () => {
  const page = getPage()
  page.$showActionSheet = (options: KdActionSheetOptions<string>) => {
    actionsheetCallback = options.onAction || (() => undefined)
    actionsheetCancel = options.onCancel || (() => undefined)
    innerTitle.value = options.title || ''
    innerItems.value = options.items || []
    innerShow.value = true
  }
}

watch(
  () => show,
  () => {
    innerShow.value = show
  },
)

exposeApi()
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
