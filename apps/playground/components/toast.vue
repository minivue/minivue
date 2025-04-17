<template>
  <View class="kd-toast-area">
    <View :class="classes">
      <View v-if="icon" class="kd-toast__icon">
        <KdIcon :type="icon" size="22" />
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
import { classObjectToString } from './utils'

interface Props {
  /** 图标 */
  icon?: 'warn' | 'info' | 'error' | 'success'
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
.kd-toast-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 62px 16px 0;
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
  align-items: flex-start;
  align-self: stretch;
  max-width: 100%;
  padding: 14px 16px;
  font-size: var(--kd-font-size-base);
  line-height: var(--t-kd-font-line-height-base);
  color: var(--kd-color-text-white);
  word-break: break-all;
}

.kd-toast__icon ~ .kd-toast__text {
  padding-left: 0;
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
