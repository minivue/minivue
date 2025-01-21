<template>
  <h1 class="about">about</h1>
  <NuxtLink to="/">index</NuxtLink>
  <KButton>test</KButton>
</template>

<script setup lang="ts">

import KButton from '@/components/KButton.vue';

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