<template>
  <ScrollView :class="classes" scroll-y><slot /></ScrollView>
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
  width: 100vw;
  height: 100vh;
  background-color: var(--kd-color-background-middle);
}
</style>

<config lang="json">
{
  "component": true
}
</config>
