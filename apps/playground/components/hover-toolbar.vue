<template>
  <View class="kd-hover-toolbar">
    <KdButton type="light" icon="dialog" vertical>编辑</KdButton>
    <KdButton type="light" icon="dialog" vertical>复制</KdButton>
    <KdButton type="light" icon="dialog" vertical>高亮</KdButton>
    <KdButton type="light" icon="dialog" vertical>下划线</KdButton>
    <KdButton type="light" icon="dialog" vertical>删除批注</KdButton>
    <KdButton type="light" icon="dialog" vertical>词典</KdButton>
    <KdButton type="light" icon="dialog" vertical>查找</KdButton>
    <KdButton type="light" icon="dialog" vertical>朗读</KdButton>
    <KdButton type="light" icon="dialog" vertical>分享</KdButton>
    <KdButton type="light" icon="dialog" vertical>添加附注</KdButton>
  </View>
</template>

<script setup lang="ts">
import KdButton from './button.vue'

defineOptions({
  name: 'KdHoverToolbar',
})
</script>

<style>
.kd-hover-toolbar {
  display: flex;
  flex-flow: column wrap;
  flex-direction: row;
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
  color: var(--kd-color-text-white);
}
</style>

<config lang="json">
{
  "component": true
}
</config>
