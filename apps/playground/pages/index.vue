<template>
  <KdPage title="WPS灵犀">
    <View slot="navbar_left" style="display: inline-block">test</View>
    <KdButton type="light" highlight dropdown>轻浅按钮</KdButton>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdButton from '@/components/button.vue'
</script>

<config lang="json">
{
  "navigationBarTitleText": "WPS灵犀",
  "disableScroll": true
}
</config>
