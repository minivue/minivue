<template>
  <View>About {{ tools.test('1') }}</View>
</template>

<script type="wxs" lang="ts">
export const message = 'Hello Vite + Vue 3 + TypeScript + WindiCSS!'
export const test = function (d: string) {
  console.log('test', d)
}
export const tools = { test, message }
</script>

<script setup lang="ts"></script>
