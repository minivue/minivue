<template>
  <div>
    <h1 class="about">about</h1>
    <NuxtLink to="/">index</NuxtLink>
    <KButton>test</KButton>
  </div>
</template>

<script setup lang="ts">
import KButton from '@/components/KButton.vue'
const x = 1
console.log(x)
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
