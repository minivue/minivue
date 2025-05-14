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
        <KdAvatarGroup :srcs="srcs" :max-count="3" />
        <KdAvatarGroup :srcs="srcs" :max-count="3" size="m" style="margin-left: 16px" />
        <KdAvatarGroup :srcs="srcs" :max-count="3" size="l" style="margin-left: 16px" />
      </View>
      <View style="padding-top: 16px">
        <KdAvatarGroup :srcs="srcs" :max-count="3" show-more />
        <KdAvatarGroup :srcs="srcs" :max-count="3" size="m" show-more style="margin-left: 16px" />
        <KdAvatarGroup :srcs="srcs" :max-count="3" size="l" show-more style="margin-left: 16px" />
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
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
  'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png',
]
// https://www.imagehub.cc/image/17.IGOs7S
// https://www.imagehub.cc/image/24.IGOjlL
// https://www.imagehub.cc/image/18.IGOckt
// https://www.imagehub.cc/image/27.IGO8jB
// https://www.imagehub.cc/image/7.IGOJoq
// https://www.imagehub.cc/image/4.IGOUCU
// https://www.imagehub.cc/image/29.IGOiG0
// https://www.imagehub.cc/image/19.IGOkvz
// https://www.imagehub.cc/image/12.IGOyYj
// https://www.imagehub.cc/image/22.IGOQOg
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
