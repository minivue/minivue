<template>
  <KdPage title="抽屉组件">
    <KdButton @tap="onTap">打开抽屉</KdButton>
  </KdPage>
  <KdDrawer :show="show" @change="onChange">
    <View style="display: flex; flex-direction: column"> 你好 </View>
  </KdDrawer>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdButton from '@/components/button.vue'
import KdDrawer from '@/components/drawer.vue'
import { ref } from '@minivue/core'

const show = ref(false)

const onTap = () => {
  show.value = true
}

const onChange = (val: boolean) => {
  show.value = val
}
</script>

<config lang="json">
{
  "navigationBarTitleText": "抽屉组件",
  "disableScroll": true
}
</config>
