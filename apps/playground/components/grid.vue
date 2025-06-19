<template>
  <View class="kd-grid">
    <View v-for="(array, index) in innerItems" :key="index" class="kd-grid__row">
      <KdButton
        v-for="item in array"
        :key="item.action"
        type="light"
        :icon="item.icon"
        vertical
        @tap="onTap(item.action)"
      >
        {{ item.text }}
      </KdButton>
      <View class="kd-grid__item" v-for="i in columns - array.length" :key="i"></View>
    </View>
  </View>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'
import KdButton from '@/components/button.vue'
import { chunkArray } from './utils'

defineOptions({
  name: 'KdGrid',
})

interface Events {
  /** 点击动作 */
  action: [value: string]
}

interface Item {
  /** 图标 */
  icon: string
  /** 文字 */
  text: string
  /** 动作 */
  action: string
}

interface Props {
  /** 操作项 */
  items: Item[]
  /** 列数 */
  columns?: number
}

const emit = defineEmits<Events>()
const { items = [], columns = 5 } = defineProps<Props>()
const innerItems = computed(() => chunkArray(items, columns))

const onTap = (action: string) => {
  emit('action', action)
}
</script>

<style>
.kd-grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  align-self: stretch;
}

.kd-grid__row {
  display: flex;
  gap: 4px;
  align-items: flex-start;
  align-self: stretch;
  padding: 0 4px;
}

.kd-grid__row .kd-button {
  flex: 1;
}

.kd-grid__item {
  flex: 1;
  height: 100%;
  padding: 8px 4px 4px;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
