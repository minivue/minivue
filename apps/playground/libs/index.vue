<template>
  <login
    app-name="lingxi_wx_app"
    :bind-phone-info="phoneInfo"
    applet-app-id="wx0b247efc57f7cc58"
    wpsua="V1BTVUEvMS4wICh3cHNkb2NzX3d4X2FwcDo0LjAuMDsgZGV2dG9vbHM6aU9TIDEwLjAuMTsgNzczNDFmZGUtODFlYy00NTk1LWUxODYtNDc1MmIzMDYyM2I1OlpHVjJkRzl2YkhNZ0lHbFFhRzl1WlNBMkx6Y3ZPQT09KSBkZXZ0b29scy9pUGhvbmUgNi83Lzg%3D"
    agreement-names="wps_online_service,kdocs,kdocs_privacy_protection"
    @openUrlByWebview="onOpen"
    @loginCallback="onLogin"
  />
</template>

<script setup lang="ts">
const phoneInfo = {}

function onLogin(e: WechatMiniprogram.CustomEvent) {
  if (e.detail.result === 'cancel') {
    console.log('login cancel')
    wx.navigateBack()
  } else {
    console.log('login success', e)
    wx.navigateBack()
  }
}

function onOpen(e: WechatMiniprogram.CustomEvent) {
  console.log('onOpen', e)
}
</script>

<config lang="json">
{
  "usingComponents": {
    "login": "plugin://account/login-component"
  },
  "renderer": "webview"
}
</config>
