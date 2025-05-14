<template>
  <View :class="classes">
    <KdAvatar v-for="url in urls" :key="url" :src="url" />
    <View class="kd-avatar-group__more" v-if="showCount">
      <KdIcon v-if="showMore" :size="moreSize" type="more" />
      <Block v-else>{{ maxCountValue }}</Block>
    </View>
  </View>
</template>

<script setup lang="ts">
import KdIcon from './icon.vue'
import KdAvatar from './avatar.vue'
import { computed } from '@minivue/core'
import { classObjectToString } from './utils'

interface Props {
  srcs: string[]
  size?: 's' | 'm' | 'l'
  type?: 'normal' | 'group'
  maxCount?: number
  showMore?: boolean
}

defineOptions({
  name: 'KdAvatarGroup',
})

const { srcs = [], size = 's', maxCount } = defineProps<Props>()
const sizes = { s: 12, m: 16, l: 20 }
const urls = computed(() => (maxCount ? srcs.slice(0, maxCount) : srcs))
const count = computed(() => srcs.length)
const maxCountValue = computed(() => (count.value > 99 ? 99 : count.value))
const moreSize = computed(() => sizes[size])
const showCount = computed(() => count.value > urls.value.length)
const classes = computed(() => classObjectToString(`kd-avatar-group kd-avatar-group--${size}`))
</script>

<style>
.kd-avatar-group {
  display: inline-flex;
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

.kd-avatar-group .kd-avatar ~ .kd-avatar,
.kd-avatar-group .kd-avatar-group__more {
  margin-left: -5px;
}

.kd-avatar-group--l .kd-avatar ~ .kd-avatar,
.kd-avatar-group--l .kd-avatar-group__more {
  margin-left: -8px;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
