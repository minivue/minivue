<template>
  <View class="p-index">
    <Text user-select>{{ message + index }}</Text>
    <KdButton :index="index">按钮</KdButton>
  </View>
</template>

<script setup lang="ts">
import KdButton from '@/components/button.vue'
import { ref } from '@minivue/core'
const index = ref(0)
const message = 'Hello World'
setInterval(() => {
  index.value++
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
