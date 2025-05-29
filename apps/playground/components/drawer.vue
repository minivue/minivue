<template>
  <RootPortal>
    <View :class="themes">
      <View class="kd-drawer-mask"></View>
      <Swiper class="kd-drawer" :duration="200" :current="current" vertical>
        <SwiperItem class="kd-drawer__item" @touchmove.stop="onNoop" skip-hidden-item-layout>
        </SwiperItem>
        <SwiperItem class="kd-drawer__item" style="background: red" skip-hidden-item-layout>
        </SwiperItem>
      </Swiper>
    </View>
  </RootPortal>
</template>

<script setup lang="ts">
import { ref, computed, onAttached, onDetached } from '@minivue/core'
import { getAppBaseInfo, onThemeChange, offThemeChange } from './utils'

defineOptions({
  name: 'KdDrawer',
})

interface Props {}
defineProps<Props>()

const appBaseInfo = getAppBaseInfo()
const current = ref(1)
const theme = ref(appBaseInfo.theme)
const themes = computed(() => `kd-theme--default kd-theme--${theme.value}`)

const setTheme = (res: { theme: 'dark' | 'light' }) => (theme.value = res.theme)

const onNoop = () => {
  // noop
}

onAttached(() => {
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
}

.kd-drawer__item {
  position: relative;
  height: 100%;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
