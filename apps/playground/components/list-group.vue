<template>
  <View :class="classes">
    <View v-if="title" class="kd-list-group__top">
      <View class="kd-list-group__title">
        <Text overflow="ellipsis">{{ title }}</Text>
      </View>
      <View class="kd-list-group__append" @tap="onMoreTap">
        <slot name="append" />
        <View class="kd-list-group__desc">
          <Text overflow="ellipsis">{{ note }}</Text>
        </View>
        <KdIcon v-if="more" type="arrow" size="18" />
      </View>
    </View>
    <slot />
    <View v-if="tips" class="kd-list-group__tips">
      {{ tips }}
    </View>
  </View>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'
import { classObjectToString } from './utils'
import KdIcon from './icon.vue'

defineOptions({
  name: 'KdListGroup',
})

interface Props {
  /** 标题 */
  title?: string
  /** 右侧描述 */
  note?: string
  /** 底部提示 */
  tips?: string
  /** 是否显示右边箭头，true则可以触发more事件 */
  more?: boolean
}

interface Events {
  more: []
}

const emit = defineEmits<Events>()
const { more } = defineProps<Props>()

const classes = computed(() => classObjectToString('kd-list-group'))

const onMoreTap = () => {
  if (more) {
    emit('more')
  }
}
</script>

<style>
.kd-list-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
}

.kd-list-group + .kd-list-group {
  margin-top: 16px;
}

.kd-list-group__top {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  align-self: stretch;
  justify-content: center;
  padding: 1px 16px;
  margin-bottom: 4px;
}

.kd-list-group__title {
  flex: 1 0 0;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base);
  color: var(--kd-color-text-primary);
}

.kd-list-group__append {
  display: flex;
  flex-shrink: 0;
  gap: 2px;
  align-items: center;
  color: var(--kd-color-text-tertiary);
}

.kd-list-group__desc {
  flex-shrink: 0;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base);
}

.kd-list-group__tips {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  align-self: stretch;
  padding: 1px 16px;
  margin-top: 4px;
  font-size: var(--kd-font-size-small);
  line-height: var(--kd-font-line-height-small);
  color: var(--kd-color-text-tertiary);
}
</style>

<config lang="json">
{
  "component": true
}
</config>
