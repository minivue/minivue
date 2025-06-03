<template>
  <RootPortal>
    <View v-if="show" :class="classes">
      <View class="kd-drawer__mask"></View>
      <Swiper
        class="kd-drawer__panel"
        :duration="200"
        :current="current"
        vertical
        @animationfinish="onHide"
      >
        <SwiperItem skip-hidden-item-layout> </SwiperItem>
        <SwiperItem class="kd-drawer__item" skip-hidden-item-layout>
          <View> 什么鬼 </View>
        </SwiperItem>
      </Swiper>
    </View>
  </RootPortal>
</template>

<script setup lang="ts">
import { ref, watch, computed, onAttached, onDetached } from '@minivue/core'
import { getAppBaseInfo, onThemeChange, offThemeChange, classObjectToString } from './utils'

defineOptions({
  name: 'KdDrawer',
})

interface Props {}
defineProps<Props>()

const appBaseInfo = getAppBaseInfo()
const current = ref(0)
const theme = ref(appBaseInfo.theme)
const classes = computed(() =>
  classObjectToString(`kd-drawer kd-theme--default kd-theme--${theme.value}`, {
    'kd-drawer--show': show.value,
  }),
)

const show = ref(false)
const setTheme = (res: { theme: 'dark' | 'light' }) => (theme.value = res.theme)
const onHide = (e: WechatMiniprogram.SwiperAnimationFinish) => {
  console.log('onHide', e.detail.current)
  // if (e.detail.current === 0) {
  //   show.value = false
  // }
}

watch(show, (val) => {
  current.value = val ? 1 : 0
})

onAttached(() => {
  onThemeChange(setTheme)
})

onDetached(() => {
  offThemeChange(setTheme)
})
</script>

<style>
/* .kd-drawer {
  display: none;
}

.kd-drawer--show {
  display: block;
} */

.kd-drawer__mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--kd-color-mask-regular);
}

.kd-drawer__panel {
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
  position: relative;
  background: var(--kd-color-background-middle);
  border-radius: 12px 12px 0 0;
}

.kd-drawer__item::before {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  background: var(--kd-color-background-middle);
}
</style>

<config lang="json">
{
  "component": true
}
</config>
