<template>
  <View :class="classes"></View>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'

interface Props {
  shape?: 'rectangle' | 'circle' | 'square'
}

defineOptions({
  name: 'KdSkeleton',
})

const { shape = 'rectangle' } = defineProps<Props>()

const classes = computed(() => `kd-skeleton kd-skeleton--${shape}`)
</script>

<style>
.kd-skeleton {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  overflow: hidden;
  background-color: rgba(145, 145, 145, 12%);
}

.kd-skeleton--rectangle {
  height: 14px;
  border-radius: 6px;
}

.kd-skeleton--square {
  width: 48px;
  height: 48px;
  border-radius: 6px;
}

.kd-skeleton--circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.kd-skeleton::before {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  content: '';
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0%) 0%,
    rgba(255, 255, 255, 60%) 54.17%,
    rgba(255, 255, 255, 0%) 100%
  );
  background-repeat: no-repeat;
  background-position: 0 center;
  background-size: 50% 100%;
  animation: 1.4s infinite kd-skeleton-loading;
}

.kd-skeleton--square::before,
.kd-skeleton--circle::before {
  width: 212.5%;
}

@keyframes kd-skeleton-loading {
  0% {
    background-position: -100% center;
  }

  100% {
    background-position: 200% center;
  }
}
</style>

<config lang="json">
{
  "component": true
}
</config>
