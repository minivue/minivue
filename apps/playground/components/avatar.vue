<template>
  <Image v-if="src" :class="classes" :src="src" mode="aspectFit" />
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'
import { classObjectToString } from './utils'

interface Props {
  src: string
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl'
  circle?: boolean
}

defineOptions({
  name: 'KdAvatar',
})

const { size = 'm', circle } = defineProps<Props>()

const classes = computed(() =>
  classObjectToString(`kd-avatar kd-avatar--${size}`, {
    'kd-avatar--circle': circle,
  }),
)
</script>

<style>
.kd-avatar {
  display: inline-flex;
  background-color: var(--kd-color-fill-regular);
  border-radius: 4px;
}

.kd-avatar--xs {
  width: 16px;
  height: 16px;
}

.kd-avatar--s {
  width: 20px;
  height: 20px;
}

.kd-avatar--m {
  width: 24px;
  height: 24px;
}

.kd-avatar--l {
  width: 32px;
  height: 32px;
}

.kd-avatar--xl {
  width: 36px;
  height: 36px;
  border-radius: 6px;
}

.kd-avatar--2xl {
  width: 40px;
  height: 40px;
  border-radius: 6px;
}

.kd-avatar--circle {
  border-radius: 50%;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
