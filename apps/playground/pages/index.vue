<template>
  <View class="p-index">
    <KdButton>按钮</KdButton>
  </View>
</template>

<script setup lang="ts">
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
  "navigationBarTitleText": "首页"
}
</config>
