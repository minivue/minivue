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
  mask-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOCAxOCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIxMS40MjklIiB5MT0iNzkuMDMyJSIgeDI9IjExLjQyOSUiIHkyPSIxMy43MSUiIGlkPSJhIj48c3RvcCBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1vcGFjaXR5PSIuNSIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9IjYwLjQxOSUiIHkxPSIxMDAlIiB4Mj0iNjIuNSUiIHkyPSI4LjMzMyUiIGlkPSJiIj48c3RvcCBzdG9wLW9wYWNpdHk9IjAiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLW9wYWNpdHk9Ii41IiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNy43NSAxMy41YTEgMSAwIDEgMCAwIDJ2LTJ6bTAtMTEuNWE1Ljc1IDUuNzUgMCAwIDEgNS43NSA1Ljc1aDJBNy43NSA3Ljc1IDAgMCAwIDcuNzUgMHYyem0wIDEzLjVhNy43NSA3Ljc1IDAgMCAwIDcuNzUtNy43NWgtMmE1Ljc1IDUuNzUgMCAwIDEtNS43NSA1Ljc1djJ6IiBmaWxsPSJ1cmwoI2EpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjI1IDEuMjUpIi8+PHBhdGggZD0iTTcuNzUgMHYyYTUuNzUgNS43NSAwIDEgMCAwIDExLjV2MmE3Ljc1IDcuNzUgMCAxIDEgMC0xNS41eiIgZmlsbD0idXJsKCNiKSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS4yNSAxLjI1KSIvPjwvc3ZnPg==');
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
