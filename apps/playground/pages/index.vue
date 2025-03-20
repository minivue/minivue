<template>
  <KdPage>
    <View style="padding: 100px">
      <KdProgress />
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdProgress from '@/components/progress.vue'
</script>

<config lang="json">
{
  "navigationBarTitleText": "首页",
  "disableScroll": true
}
</config>
