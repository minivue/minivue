<template>
  <View :class="classes">
    <View v-if="innerIcon" class="kd-message-bar__icon">
      <KdIcon :type="innerIcon" size="22" />
    </View>
    <View class="kd-message-bar__content">
      <View v-if="title" class="kd-message-bar__title">
        {{ title }}
      </View>
      <View class="kd-message-bar__text">
        <slot />
      </View>
    </View>
    <View v-if="action" class="kd-message-bar__actions">
      <View class="kd-message-bar__action">
        <KdButton type="light" highlight @tap="onActionTap">{{ action }}</KdButton>
      </View>
      <View v-if="closeable" class="kd-message-bar__close">
        <KdButton icon="close" size="s" only-icon @tap="onCloseTap"></KdButton>
      </View>
    </View>
  </View>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'
import KdIcon from './icon.vue'
import KdButton from './button.vue'
import { classObjectToString } from './utils'

interface Events {
  hide: []
  close: []
  action: []
}

interface Props {
  /** 类型（传了类型，图标就是固定的） */
  type?: 'info' | 'success' | 'warning' | 'error'
  /** 图标 */
  icon?: 'info' | 'success' | 'warning' | 'error' | (string & {})
  /** 标题 */
  title?: string
  /** 操作文案 */
  action?: string
  /** 是否系统bar */
  system?: boolean
  /** 是否显示关闭按钮 */
  closeable?: boolean
}

defineOptions({
  name: 'KdMessageBar',
})

const emit = defineEmits<Events>()

const { type, icon, system } = defineProps<Props>()

const innerType = computed(() => type || 'info')

const innerIcon = computed(() => type || icon)

const classes = computed(() =>
  classObjectToString(`kd-message-bar kd-message-bar--${innerType.value}`, {
    'kd-message-bar--system': system,
  }),
)

const onActionTap = () => {
  emit('action')
}

const onCloseTap = () => {
  emit('close')
}
</script>

<style>
.kd-message-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
}

.kd-message-bar--system {
  border-radius: 0;
}

.kd-message-bar--info {
  background-color: var(--kd-color-info-light);
}

.kd-message-bar--success {
  background-color: var(--kd-color-success-light);
}

.kd-message-bar--warning {
  background-color: var(--kd-color-warning-light);
}

.kd-message-bar--error {
  background-color: var(--kd-color-error-light);
}

.kd-message-bar__icon {
  display: flex;
  flex-shrink: 0;
  align-items: flex-start;
  align-self: stretch;
  justify-content: center;
  padding: 12px 12px 0 16px;
  color: var(--kd-color-icon-primary);
}

.kd-message-bar__content {
  display: flex;
  flex: 1;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  min-width: 50%;
  max-width: 100%;
  padding: 12px 16px;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base);
  color: var(--kd-color-text-primary);
  word-break: break-all;
}

.kd-message-bar__icon ~ .kd-message-bar__content {
  min-width: calc(50% - 50px);
  padding-left: 0;
}

.kd-message-bar__title {
  font-weight: 600;
}

.kd-message-bar__text {
  width: 100%;
}

.kd-message-bar__actions {
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  justify-content: center;
  padding: 1px 5px 0 4px;
}

.kd-message-bar__action {
  display: flex;
  align-items: center;
  height: 44px;
}

.kd-message-bar__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 44px;
}

.kd-message-bar__action .kd-button {
  font-weight: 600;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
