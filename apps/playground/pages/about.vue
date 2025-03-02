<template>
  <div>
    <Teleport to="body">
      <div>test</div>
    </Teleport>
    <h1 class="about">{{ msg }}</h1>
    <NuxtLink to="/">index</NuxtLink>
    <View :hover-start-time="1">test</View>
    <KButton @click="onTap">test</KButton>
  </div>
</template>

<script setup lang="ts">
import KButton from '@/components/KButton.vue'
import { ref } from '@minivue/core'
const msg = ref('about')

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

function onTap() {
  msg.value = 'fuck'
}
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
