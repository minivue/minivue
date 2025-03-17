<template>
  <View :class="classes"><slot /></View>
</template>

<script setup lang="ts">
import { computed, ref } from '@minivue/core'

defineOptions({
  name: 'KdPage',
})

const appBaseInfo = wx.getAppBaseInfo()

const theme = ref(appBaseInfo.theme)

const classes = computed(() => `kd-page kd-theme--default kd-theme--${theme.value}`)

wx.onThemeChange((res) => {
  theme.value = res.theme
})
</script>

<style>
.kd-page {
  background-color: transparent;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
