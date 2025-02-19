<template>
  <NuxtView />
</template>

<script lang="ts">
import {
  defineApp,
  onAppShow,
  onAppHide,
  onAppError,
  onAppLaunch,
  onPageNotFound,
  onUnhandledRejection,
} from '@minivue/core'

export default defineApp({
  setup() {
    onAppLaunch((options) => {
      console.log('App launched', options)
    })
    onAppShow((options) => {
      console.log('App showed', options)
    })
    onAppHide(() => {
      console.log('App hided')
    })
    onAppError((error) => {
      console.error('App error', error)
    })
    onPageNotFound((options) => {
      console.log('Page not found', options)
    })
    onUnhandledRejection((error) => {
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
