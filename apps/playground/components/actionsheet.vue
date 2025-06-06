<template>
  <KdDrawer :show="show">
    <View class="kd-actionsheet">
      <View class="kd-actionsheet__title">推荐用简短标题</View>
      <KdDivider />
      <KdButton type="light" size="xl">操作按钮</KdButton>
      <KdDivider />
      <KdButton type="light" size="xl">操作按钮</KdButton>
      <KdDivider />
      <KdButton type="light" size="xl">操作按钮</KdButton>
      <KdDivider />
      <View class="kd-actionsheet__split"></View>
      <KdButton type="light" size="xl">取消</KdButton>
    </View>
  </KdDrawer>
</template>

<script setup lang="ts">
import KdDrawer from './drawer.vue'
import KdButton from './button.vue'
import KdDivider from './divider.vue'

defineOptions({
  name: 'KdActionsheet',
})

interface Props {
  show?: boolean
  title?: string
}

defineProps<Props>()
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
  border-radius: 0;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
