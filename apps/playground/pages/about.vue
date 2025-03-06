<template>
  <View>About {{ tools.test('1') }}</View>
</template>

<script type="wxs" lang="ts">
import { test } from './mod'
const message = 'Hello Vite + Vue 3 + TypeScript + WindiCSS!'

export const tools = { test, message }
</script>

<script setup lang="ts"></script>
