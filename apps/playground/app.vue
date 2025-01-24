<template>
  <NuxtPage />
</template>

<script>
import { defineApp, onAppLaunch } from '@minivue/core'

defineApp({
  setup() {
    onAppLaunch((options) => {
      console.log('App launched', options)
    })
  },
})
</script>

<style>
body {
  margin: 0;
}
</style>

<config lang="json">
{
  "pages": ["pages/index/index", "pages/about/about"],
  "window": {
    "navigationBarTitleText": "WPS 灵犀",
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTextStyle": "black"
  },
  "darkmode": true,
  "resizable": false,
  "frameset": false,
  "lazyCodeLoading": "requiredComponents"
}
</config>
