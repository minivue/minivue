<template>
  <KdPage title="徽标组件">
    <View class="p-badge__box">
      <View class="p-badge__item">
        有消息
        <KdBdage />
      </View>
    </View>
    <View class="p-badge__box">
      <View class="p-badge__item">
        有消息
        <KdBdage content="1" />
      </View>
    </View>
    <View class="p-badge__box">
      <View class="p-badge__item">
        有消息
        <KdBdage content="99" />
      </View>
    </View>
    <View class="p-badge__box">
      <View class="p-badge__item">
        有消息
        <KdBdage content="99+" />
      </View>
    </View>
    <View class="p-badge__box">
      <View class="p-badge__item">
        有消息
        <KdBdage content="NEW" />
      </View>
    </View>
    <View class="p-badge__box">
      <View class="p-badge__item">
        有消息
        <KdBdage content="1" ellipsis />
      </View>
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import KdBdage from '@/components/bdage.vue'
import KdPage from '@/components/page.vue'
</script>

<style>
.p-badge__box {
  padding: 16px;
}

.p-badge__item {
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
