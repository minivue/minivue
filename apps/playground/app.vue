<template>
  <NuxtPage />
</template>

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
