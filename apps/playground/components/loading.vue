<template>
  <Image :class="classes" />
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'

defineOptions({
  name: 'KdLoading',
})

interface Props {
  /** 图标大小 */
  size?: 's' | 'm' | 'l'
  mode?: 'dark' | 'light'
}

const { size = 'm', mode = 'light' } = defineProps<Props>()

const classes = computed(() => `kd-loading kd-loading--${size}  kd-loading--${mode}`)
</script>

<style>
.kd-loading {
  display: inline-flex;
  border-radius: 50%;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3E%3Cdefs%3E%3ClinearGradient x1='11.429%25' y1='79.032%25' x2='11.429%25' y2='13.71%25' id='a'%3E%3Cstop offset='0%25'/%3E%3Cstop stop-opacity='.5' offset='100%25'/%3E%3C/linearGradient%3E%3ClinearGradient x1='60.419%25' y1='100%25' x2='62.5%25' y2='8.333%25' id='b'%3E%3Cstop stop-opacity='0' offset='0%25'/%3E%3Cstop stop-opacity='.5' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M7.75 13.5a1 1 0 1 0 0 2v-2zm0-11.5a5.75 5.75 0 0 1 5.75 5.75h2A7.75 7.75 0 0 0 7.75 0v2zm0 13.5a7.75 7.75 0 0 0 7.75-7.75h-2a5.75 5.75 0 0 1-5.75 5.75v2z' fill='url(%23a)' transform='translate(1.25 1.25)'/%3E%3Cpath d='M7.75 0v2a5.75 5.75 0 1 0 0 11.5v2a7.75 7.75 0 1 1 0-15.5z' fill='url(%23b)' transform='translate(1.25 1.25)'/%3E%3C/svg%3E");
  mask-size: cover;
  animation: kd-loading-spin 0.8s linear 0s infinite;
}

.kd-loading--s {
  width: 18px;
  height: 18px;
}

.kd-loading--m {
  width: 22px;
  height: 22px;
}

.kd-loading--l {
  width: 30px;
  height: 30px;
}

.kd-loading--light {
  background-color: var(--kd-color-public-normal);
}

.kd-loading--dark {
  background-color: var(--kd-color-text-white);
}

@keyframes kd-loading-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

<config lang="json">
{
  "component": true
}
</config>
