<template>
  <View class="p-index">
    <Text user-select>{{ message }}</Text>
    <KdButton :obj="obj">按钮</KdButton>
  </View>
</template>

<script setup lang="ts">
import KdButton from '@/components/button.vue'
import { ref } from '@minivue/core'
const obj = ref({ inner: { msg: 1 } })
const message = 'Hello World'
setInterval(() => {
  obj.value.inner.msg++
}, 1000)
</script>

<style>
.p-index {
  padding-top: 60px;
}
</style>

<config lang="json">
{
  "navigationBarTitleText": "首页"
}
</config>
