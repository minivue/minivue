<template>
  <View :msg="_.showMessage('vue')">About {{ _.showMessage('vue') }}</View>
</template>

<script type="wxs" lang="ts">
const showMessage = (message: string) => {
  return 'hello from ' + message
}

export const _ = { showMessage }
</script>

<script setup lang="ts">
import { fuck } from './common/util'
fuck()
</script>
