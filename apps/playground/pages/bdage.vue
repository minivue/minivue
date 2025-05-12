<template>
  <KdPage title="徽标组件">
    <View class="p-badge">
      有消息
      <KdBdage content="1" ellipsis />
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import KdBdage from '@/components/bdage.vue'
import KdPage from '@/components/page.vue'
</script>

<style>
.p-badge {
  position: relative;
  display: inline-flex;
}
</style>

<config lang="json">
{
  "navigationBarTitleText": "Toast组件",
  "disableScroll": true
}
</config>
