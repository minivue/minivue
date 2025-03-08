<template>
  <View>About {{ tools.showMessage('vue') }}</View>
</template>

<script type="wxs" lang="ts">
const showMessage = (message: string) => {
  return 'hello from ' + message
}

export const tools = { showMessage }
</script>

<script setup lang="ts"></script>
