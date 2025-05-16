<template>
  <KdMatchMedia @match="onScreenMatch" :max-width="500">
    <View :class="classes">
      <View class="kd-tabbar__wrapper">
        <KdButton type="light" icon="menu" :vertical="vertical">文本1</KdButton>
        <KdButton type="light" icon="menu" :vertical="vertical">文本</KdButton>
        <KdButton type="light" icon="menu" :vertical="vertical">文本</KdButton>
        <KdButton type="light" icon="menu" :vertical="vertical">Template findin</KdButton>
        <KdButton type="light" icon="menu" :vertical="vertical">文本</KdButton>
      </View>
    </View>
  </KdMatchMedia>
</template>

<script setup lang="ts">
import { ref, computed } from '@minivue/core'
import { classObjectToString } from './utils'
import KdButton from './button.vue'
import KdMatchMedia from './match-media.vue'

const vertical = ref(true)

const classes = computed(() =>
  classObjectToString('kd-tabbar', {
    'kd-tabbar--vertical': vertical.value,
  }),
)

const onScreenMatch = (e: boolean) => (vertical.value = e)
</script>

<style>
.kd-tabbar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: env(safe-area-inset-bottom);
  background-color: var(--kd-color-background-middle);
}

.kd-tabbar__wrapper {
  box-sizing: border-box;
  display: flex;
  gap: 4px;
  align-items: flex-start;
  align-self: stretch;
  justify-content: center;
  height: 54px;
  padding: 4px;
}

.kd-tabbar .kd-button {
  flex: 1;
  min-height: 100%;
}

.kd-tabbar--vertical .kd-tabbar__wrapper {
  height: 64px;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
