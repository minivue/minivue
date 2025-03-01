<template>
  <div>
    <Teleport to="body">
      <div>test</div>
    </Teleport>
    <h1 class="about">{{ msg }}</h1>
    <NuxtLink to="/">index</NuxtLink>
    <view>test</view>
    <KButton @click="onTap">test</KButton>
  </div>
</template>

<script setup lang="ts">
import KButton from '@/components/KButton.vue'
import { ref } from '@minivue/core'
const msg = ref('about')
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
