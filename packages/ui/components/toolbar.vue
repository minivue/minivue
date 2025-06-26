<template>
  <View class="kd-toolbar">
    <KdButton
      v-for="item in items"
      :key="item.text"
      type="light"
      :icon="item.icon"
      vertical
      @tap="onTap(item.action)"
    >
      {{ item.text }}
    </KdButton>
  </View>
</template>

<script setup lang="ts">
import KdButton from './button.vue'

defineOptions({
  name: 'KdToolbar',
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
  items?: Item[]
}

defineProps<Props>()

const emit = defineEmits<Events>()

const onTap = (action: string) => {
  emit('action', action)
}
</script>

<style>
.kd-toolbar {
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 4px;
  align-items: flex-start;
  max-width: 328px;
  padding: 6px;
  background: var(--kd-color-mask-heavy);
  border-radius: 8px;
  backdrop-filter: blur(5px);
}

.kd-toolbar .kd-button {
  flex-shrink: 0;
  width: 60px !important;
  height: 64px !important;
  margin: 0;
  color: var(--kd-color-text-white);
}
</style>

<config lang="json">
{
  "component": true
}
</config>
