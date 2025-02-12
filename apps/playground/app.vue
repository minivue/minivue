<template>
  <NuxtPage />
</template>

<script lang="ts">
import {
  defineApp,
  onAppShow,
  onAppError,
  onAppLaunch,
  onAppPageNotFound,
  onAppUnhandledRejection,
} from '@minivue/core'

export default defineApp({
  setup() {
    onAppLaunch((options) => {
      console.log('App launched', options)
    })
    onAppShow((options) => {
      console.log('App showed', options)
    })
    onAppError((error) => {
      console.error('App error', error)
    })
    onAppPageNotFound((options) => {
      console.log('Page not found', options)
    })
    onAppUnhandledRejection((error) => {
      console.error('Unhandled rejection', error)
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
    "navigationBarTextStyle": "black",
    "navigationStyle": "custom"
  },
  "darkmode": true,
  "resizable": false,
  "frameset": false,
  "renderer": "skyline",
  "componentFramework": "glass-easel",
  "rendererOptions": {
    "skyline": {
      "defaultDisplayBlock": true
    }
  },
  "lazyCodeLoading": "requiredComponents"
}
</config>
