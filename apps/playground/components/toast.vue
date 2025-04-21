<template>
  <View class="kd-toast-wrapper">
    <View :class="classes">
      <View v-if="icon" class="kd-toast__icon">
        <KdLoading v-if="icon === 'loading'" mode="dark" />
        <KdProgress v-else-if="icon === 'progress'" size="22" mode="dark" :percentage="25" />
        <KdIcon v-else :type="icon" size="22" />
      </View>
      <View class="kd-toast__text"> {{ content }} </View>
      <View v-if="action" class="kd-toast__actions">
        <View class="kd-toast__action">
          <KdButton type="light" highlight>{{ action }}</KdButton>
        </View>
        <View class="kd-toast__close">
          <KdButton icon="close" size="s" only-icon></KdButton>
        </View>
      </View>
    </View>
  </View>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'
import KdIcon from './icon.vue'
import KdButton from './button.vue'
import KdLoading from './loading.vue'
import KdProgress from './progress.vue'
import { classObjectToString } from './utils'

interface Props {
  /** 图标 */
  icon?: 'warn' | 'info' | 'error' | 'success' | string
  /** 操作文案 */
  action?: string
  /** 文本内容 */
  content: string
}

defineOptions({
  name: 'KdToast',
})

const { action } = defineProps<Props>()

const classes = computed(() =>
  classObjectToString('kd-toast', {
    'kd-toast--full': action,
  }),
)
</script>

<style>
/* 加这次是为了防止kd-toast宽度益处问题 */
.kd-toast-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 8px;
}

.kd-toast {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  max-width: 520px;
  min-height: 50px;
  pointer-events: all;
  background-color: var(--kd-color-mask-heavy);
  border-radius: 12px;
  backdrop-filter: blur(5px);
}

.kd-toast--full {
  flex-wrap: wrap;
  width: 100%;
}

.kd-toast__icon {
  display: flex;
  flex-shrink: 0;
  align-items: flex-start;
  align-self: stretch;
  justify-content: center;
  padding: 14px 12px 0 16px;
}

.kd-toast__text {
  display: flex;
  flex: 1;
  flex-shrink: 0;
  align-items: flex-start;
  align-self: stretch;
  max-width: 100%;
  padding: 14px 16px;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base);
  color: var(--kd-color-text-white);
  word-break: break-all;
}

.kd-toast__icon ~ .kd-toast__text {
  padding-left: 0;
}

.kd-toast--full .kd-toast__text {
  min-width: 50%;
}

.kd-toast--full .kd-toast__icon ~ .kd-toast__text {
  min-width: calc(50% - 50px);
}

.kd-toast__actions {
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  justify-content: center;
  padding: 3px 5px 0 4px;
}

.kd-toast__action {
  display: flex;
  align-items: center;
  height: 44px;
}

.kd-toast__action .kd-button {
  font-weight: 600;
  color: rgb(var(--kd-color-blue-5)) !important;
}

.kd-toast__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 44px;
}

.kd-toast__close .kd-button {
  color: var(--kd-color-text-white);
}
</style>

<config lang="json">
{
  "component": true
}
</config>
