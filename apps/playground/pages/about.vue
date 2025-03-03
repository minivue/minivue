<template>
  <View>
    <View class="about">{{ msg }}</View>
    <View :hover-start-time="1">test</View>
  </View>
</template>

<script setup lang="ts">
import { getCurrentInstance, onReady, ref } from '@minivue/core'
const msg = ref('about')
const ctx = getCurrentInstance()

const test1 = () => {
  return 1
}

const test2 = function () {
  return 2
}

function test() {
  return 1
}
test1()
test2()
test()

onReady(() => {
  console.log(ctx)
})
</script>

<style>
.about {
  color: red;
}
</style>

<config lang="json">
{
  "navigationBarTitleText": "关于"
}
</config>
