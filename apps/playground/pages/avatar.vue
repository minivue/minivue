<template>
  <KdPage title="头像组件">
    <View class="p-avatar">
      <View class="p-avatar__single">
        <KdAvatar :src="src" size="xs" />
        <KdAvatar :src="src" size="s" />
        <KdAvatar :src="src" size="m" />
        <KdAvatar :src="src" size="l" />
        <KdAvatar :src="src" size="xl" />
        <KdAvatar :src="src" size="2xl" />
      </View>
      <View class="p-avatar__single">
        <KdAvatar :src="src" size="xs" circle />
        <KdAvatar :src="src" size="s" circle />
        <KdAvatar :src="src" size="m" circle />
        <KdAvatar :src="src" size="l" circle />
        <KdAvatar :src="src" size="xl" circle />
        <KdAvatar :src="src" size="2xl" circle />
      </View>
      <View style="padding-top: 16px">
        <KdAvatarGroup :data="srcs" />
        <KdAvatarGroup :data="srcs" size="m" style="margin-left: 10px" />
        <KdAvatarGroup :data="srcs" size="l" style="margin-left: 10px" />
      </View>
      <View style="padding-top: 16px">
        <KdAvatarGroup :data="srcs" :count="99" />
        <KdAvatarGroup :data="srcs" :count="99" size="m" style="margin-left: 10px" />
        <KdAvatarGroup :data="srcs" :count="99" size="l" style="margin-left: 10px" />
      </View>
      <View style="padding-top: 16px">
        <KdAvatarGroup :data="srcs" :count="99" more />
        <KdAvatarGroup :data="srcs" :count="99" size="m" more style="margin-left: 10px" />
        <KdAvatarGroup :data="srcs" :count="99" size="l" more style="margin-left: 10px" />
      </View>
      <View style="display: flex; padding-top: 16px">
        <KdAvatarGroup :data="srcs1" group />
        <KdAvatarGroup :data="srcs2" group style="margin-left: 5px" />
        <KdAvatarGroup :data="srcs3" group style="margin-left: 5px" />
        <KdAvatarGroup :data="srcs4" group style="margin-left: 5px" />
        <KdAvatarGroup :data="srcs5" group style="margin-left: 5px" />
        <KdAvatarGroup :data="srcs6" group style="margin-left: 5px" />
        <KdAvatarGroup :data="srcs7" group style="margin-left: 5px" />
        <KdAvatarGroup :data="srcs8" group style="margin-left: 5px" />
        <KdAvatarGroup :data="srcs9" group style="margin-left: 5px" />
      </View>
      <View style="display: flex; padding-top: 16px">
        <KdAvatarGroup :data="srcs1" size="l" group />
        <KdAvatarGroup :data="srcs2" size="l" group style="margin-left: 2px" />
        <KdAvatarGroup :data="srcs3" size="l" group style="margin-left: 2px" />
        <KdAvatarGroup :data="srcs4" size="l" group style="margin-left: 2px" />
        <KdAvatarGroup :data="srcs5" size="l" group style="margin-left: 2px" />
        <KdAvatarGroup :data="srcs6" size="l" group style="margin-left: 2px" />
        <KdAvatarGroup :data="srcs7" size="l" group style="margin-left: 2px" />
        <KdAvatarGroup :data="srcs8" size="l" group style="margin-left: 2px" />
        <KdAvatarGroup :data="srcs9" size="l" group style="margin-left: 2px" />
      </View>
      <View style="display: flex; padding-top: 16px">
        <KdAvatarGroup :data="srcs1" size="l" group circle />
        <KdAvatarGroup :data="srcs2" size="l" group circle style="margin-left: 2px" />
        <KdAvatarGroup :data="srcs3" size="l" group circle style="margin-left: 2px" />
        <KdAvatarGroup :data="srcs4" size="l" group circle style="margin-left: 2px" />
        <KdAvatarGroup :data="srcs5" size="l" group circle style="margin-left: 2px" />
        <KdAvatarGroup :data="srcs6" size="l" group circle style="margin-left: 2px" />
        <KdAvatarGroup :data="srcs7" size="l" group circle style="margin-left: 2px" />
        <KdAvatarGroup :data="srcs8" size="l" group circle style="margin-left: 2px" />
        <KdAvatarGroup :data="srcs9" size="l" group circle style="margin-left: 2px" />
      </View>
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdAvatar from '@/components/avatar.vue'
import KdAvatarGroup from '@/components/avatar-group.vue'

const src = 'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png'
const srcs = [
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
]

const srcs1 = ['https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png']

const srcs2 = [
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
]

const srcs3 = [
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
]

const srcs4 = [
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
]

const srcs5 = [
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
]

const srcs6 = [
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
]

const srcs7 = [
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
]

const srcs8 = [
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
]

const srcs9 = [
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
]
</script>

<style>
.p-avatar {
  padding: 16px;
}

.p-avatar__single {
  padding-bottom: 16px;
}

.p-avatar__single .kd-avatar {
  margin-right: 16px;
}
</style>

<config lang="json">
{
  "navigationBarTitleText": "头像组件",
  "disableScroll": true
}
</config>
