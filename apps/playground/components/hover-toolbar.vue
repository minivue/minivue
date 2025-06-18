<template>
  <View class="kd-hover-toolbar">
    <KdButton v-for="item in items" :key="item.text" type="light" :icon="item.icon" vertical>
      {{ item.text }}
    </KdButton>
  </View>
</template>

<script setup lang="ts">
import KdButton from './button.vue'

defineOptions({
  name: 'KdHoverToolbar',
})

interface Item {
  icon: string
  text: string
}

interface Props {
  items?: Item[]
}

defineProps<Props>()
</script>

<style>
.kd-hover-toolbar {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: flex-start;
  max-width: 328px;
  padding: 6px;
  background: var(--kd-color-mask-heavy);
  border-radius: 8px;
  backdrop-filter: blur(5px);
}

.kd-hover-toolbar .kd-button {
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
