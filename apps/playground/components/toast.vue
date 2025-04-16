<template>
  <View :class="classes">
    <View class="kd-toast__icon">
      <KdIcon v-if="icon" :type="icon" size="22" />
    </View>
    <View class="kd-toast__text">
      <Text>这是一个轻量级反馈</Text>
    </View>
    <View class="kd-toast__action">
      <KdButton type="light" highlight>{{ action }}</KdButton>
      <KdButton icon="menu" only-icon size="m"></KdButton>
    </View>
  </View>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'
import KdIcon from './icon.vue'
import KdButton from './button.vue'

interface Props {
  /** 图标 */
  icon?: 'warn' | 'info' | 'error' | 'success'
  action?: string
}

defineOptions({
  name: 'KdToast',
})

defineProps<Props>()

const classes = computed(() => `kd-toast`)
</script>

<style>
.kd-toast {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  pointer-events: all;
  background-color: var(--kd-color-mask-heavy);
  border-radius: 12px;
  backdrop-filter: blur(5px);
}

.kd-toast__icon {
  display: flex;
  padding: 14px 12px 14px 16px;
}

.kd-toast__text {
  display: flex;
  flex-shrink: 0;
  padding: 14px 16px 14px 0;
  font-size: var(--kd-font-size-base);
  line-height: var(--t-kd-font-line-height-base);
  color: var(--kd-color-text-white);
}

.kd-toast__action {
  display: flex;
  align-items: center;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
