<template>
  <RootPortal v-if="show">
    <View :class="themes">
      <View class="kd-drawer-mask"></View>
      <Swiper
        class="kd-drawer"
        :duration="200"
        :current="current"
        vertical
        @animationfinish="onHide"
      >
        <SwiperItem @touchmove.stop="onNoop" skip-hidden-item-layout> </SwiperItem>
        <SwiperItem class="kd-drawer__item" skip-hidden-item-layout>
          <View> 什么鬼 </View>
        </SwiperItem>
      </Swiper>
    </View>
  </RootPortal>
</template>

<script setup lang="ts">
import { ref, watch, computed, onAttached, onDetached } from '@minivue/core'
import { getAppBaseInfo, onThemeChange, offThemeChange } from './utils'

defineOptions({
  name: 'KdDrawer',
})

interface Props {}
defineProps<Props>()

const appBaseInfo = getAppBaseInfo()
const current = ref(0)
const theme = ref(appBaseInfo.theme)
const themes = computed(() => `kd-theme--default kd-theme--${theme.value}`)

const show = ref(false)
const setTheme = (res: { theme: 'dark' | 'light' }) => (theme.value = res.theme)

const onNoop = () => {
  // noop
}
const onHide = (e: WechatMiniprogram.SwiperAnimationFinish) => {
  console.log('onHide', e.detail.current)
  // if (e.detail.current === 0) {
  //   show.value = false
  // }
}

watch(show, (val) => {
  setTimeout(() => {
    console.log('val', val)
    current.value = val ? 1 : 0
  }, 1000)
})

onAttached(() => {
  show.value = true
  onThemeChange(setTheme)
})

onDetached(() => {
  offThemeChange(setTheme)
})
</script>

<style>
.kd-drawer-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--kd-color-mask-regular);
}

.kd-drawer {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 300px;
  overflow: hidden;
  touch-action: pan-y;
  border-radius: 12px 12px 0 0;
}

.kd-drawer__item {
  overflow: hidden;
  background: var(--kd-color-background-middle);
  border-radius: 12px 12px 0 0;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
