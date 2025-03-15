<template>
  <KdPage>
    <View style="padding-top: 100px">
      <KdButton>按钮</KdButton>
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdButton from '@/components/button.vue'
wx.onThemeChange((res) => {
  console.log('theme changed', res)
})
</script>

<style>
.p-index {
  padding-top: 100px;
}
</style>

<config lang="json">
{
  "navigationBarTitleText": "首页",
  "disableScroll": true
}
</config>
