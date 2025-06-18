<template>
  <View :class="classes">
    <View v-if="title" class="kd-cell-group__top">
      <View class="kd-cell-group__title">
        <Text overflow="ellipsis">{{ title }}</Text>
      </View>
      <View class="kd-cell-group__append" @tap="onMoreTap">
        <slot name="append" />
        <View class="kd-cell-group__desc">
          <Text overflow="ellipsis">{{ desc }}</Text>
        </View>
        <KdIcon v-if="more" type="arrow" size="18" />
      </View>
    </View>
    <View class="kd-cell-group__box">
      <slot />
    </View>
    <View v-if="tips" class="kd-cell-group__tips">
      {{ tips }}
    </View>
  </View>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'
import { classObjectToString } from './utils'
import KdIcon from './icon.vue'

defineOptions({
  name: 'KdCellGroup',
})

interface Props {
  size?: 'm' | 's'
  type?: 'line' | ''
  title?: string
  desc?: string
  tips?: string
  more?: boolean
}

interface Events {
  more: []
}

const emit = defineEmits<Events>()
const { size = 'm', more } = defineProps<Props>()

const classes = computed(() => classObjectToString('kd-cell-group', `kd-cell-group--${size}`))

const onMoreTap = () => {
  if (more) {
    emit('more')
  }
}
</script>

<style>
.kd-cell-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
}

.kd-cell-group + .kd-cell-group {
  margin-top: 16px;
}

.kd-cell-group__top {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  align-self: stretch;
  justify-content: center;
  padding: 1px 16px;
  margin-bottom: 4px;
}

.kd-cell-group__title {
  flex: 1 0 0;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base);
  color: var(--kd-color-text-primary);
}

.kd-cell-group__append {
  display: flex;
  flex-shrink: 0;
  gap: 2px;
  align-items: center;
  color: var(--kd-color-text-tertiary);
}

.kd-cell-group__desc {
  flex-shrink: 0;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base);
}

.kd-cell-group__box {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  padding: 4px 0;
  overflow: hidden;
  background: var(--kd-color-background-bottom);
  border-radius: 12px;
}

.kd-cell-group__tips {
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
