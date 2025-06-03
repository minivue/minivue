<template>
  <KdPage title="抽屉组件"> </KdPage>
  <KdDrawer :show="show">
    <View> 什么鬼 </View>
  </KdDrawer>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdDrawer from '@/components/drawer.vue'
import { onAttached, ref } from '@minivue/core'

const show = ref(true)

onAttached(() => {
  show.value = true
})
</script>

<config lang="json">
{
  "navigationBarTitleText": "抽屉组件",
  "disableScroll": true
}
</config>
