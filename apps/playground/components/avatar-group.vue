<template>
  <View :class="classes" :style="style">
    <KdAvatar v-for="url in data" :key="url" :src="url" />
    <View class="kd-avatar-group__more" v-if="showCount">
      <KdIcon v-if="more" :size="iconSize" type="more" />
      <Block v-else>{{ countValue }}</Block>
    </View>
  </View>
</template>

<script setup lang="ts" generic="T extends boolean">
import KdIcon from './icon.vue'
import KdAvatar from './avatar.vue'
import { computed } from '@minivue/core'
import { classObjectToString } from './utils'

interface Props {
  data: string[]
  group?: T
  size?: T extends true ? 'm' | 'l' : 's' | 'm' | 'l'
  circle?: T extends true ? boolean : false
  count?: number
  more?: boolean
}

defineOptions({
  name: 'KdAvatarGroup',
})

const { data = [], size = 'm', count = 0, group, circle } = defineProps<Props>()
const sizes = { s: 12, m: 16, l: 20 }
const dataCount = computed(() => count || data.length)
const countValue = computed(() => (dataCount.value > 99 ? 99 : dataCount.value))
const iconSize = computed(() => sizes[size])
const showCount = computed(() => !group && dataCount.value > data.length)
const classes = computed(() =>
  classObjectToString(`kd-avatar-group kd-avatar-group--${size}`, {
    'kd-avatar-group--group': group,
    'kd-avatar-group--circle': group && circle,
  }),
)
const style = computed(() => {
  const size = dataCount.value > 4 ? '33.33%' : dataCount.value > 1 ? '50%' : '100%'
  return `--size: ${size}`
})
</script>

<style>
.kd-avatar-group {
  display: inline-flex;
  flex-shrink: 0;
}

.kd-avatar-group--circle {
  border-radius: 50% !important;
}

.kd-avatar-group__more {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--kd-color-text-secondary);
  background-color: var(--kd-color-fill-regular);
}

.kd-avatar-group__more .kd-icon {
  color: var(--kd-color-icon-primary);
}

.kd-avatar-group--group .kd-avatar {
  width: var(--size) !important;
  height: var(--size) !important;
  margin: 0 !important;
  border: none !important;
  border-radius: 0 !important;
}

.kd-avatar-group .kd-avatar,
.kd-avatar-group__more {
  border: 1px solid var(--kd-color-background-bottom);
  border-radius: 50%;
}

.kd-avatar-group--s .kd-avatar,
.kd-avatar-group--s .kd-avatar-group__more {
  width: 22px;
  height: 22px;
  font-size: 10px;
  line-height: 100%;
}

.kd-avatar-group--m .kd-avatar,
.kd-avatar-group--m .kd-avatar-group__more {
  width: 26px;
  height: 26px;
  font-size: var(--kd-font-size-small);
  line-height: var(--kd-font-line-height-small);
}

.kd-avatar-group--l .kd-avatar,
.kd-avatar-group--l .kd-avatar-group__more {
  width: 40px;
  height: 40px;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base);
  border-width: 2px;
}

.kd-avatar-group--l .kd-avatar ~ .kd-avatar,
.kd-avatar-group--l .kd-avatar-group__more {
  margin-left: -8px;
}

.kd-avatar-group .kd-avatar ~ .kd-avatar,
.kd-avatar-group .kd-avatar-group__more {
  margin-left: -5px;
}

.kd-avatar-group--group {
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 4px;
}

.kd-avatar-group--group.kd-avatar-group--m {
  width: 28px;
  height: 28px;
}

.kd-avatar-group--group.kd-avatar-group--l {
  width: 36px;
  height: 36px;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
