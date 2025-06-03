<template>
  <RootPortal>
    <View :class="classes">
      <View class="kd-drawer__mask"></View>
      <Swiper
        class="kd-drawer__panel"
        :duration="200"
        :current="current"
        vertical
        @change="onChange"
        @animationfinish="onAnimationFinish"
      >
        <SwiperItem skip-hidden-item-layout />
        <SwiperItem class="kd-drawer__item" skip-hidden-item-layout>
          <slot />
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

interface Events {
  /** 状态改变 */
  change: [value: boolean]
}

interface Props {
  /** 是否显示 */
  show?: boolean
}

const emit = defineEmits<Events>()
const { show } = defineProps<Props>()

const appBaseInfo = getAppBaseInfo()
const current = ref(0)
const theme = ref(appBaseInfo.theme)
const innerShow = ref(show)
const classes = computed(() =>
  classObjectToString(`kd-drawer kd-theme--default kd-theme--${theme.value}`, {
    'kd-drawer--show': innerShow.value,
  }),
)

const setTheme = (res: { theme: 'dark' | 'light' }) => (theme.value = res.theme)
const onAnimationFinish = (e: WechatMiniprogram.SwiperAnimationFinish) => {
  if (e.detail.current === 0 && current.value === 0) {
    innerShow.value = false
  }
}

const onChange = (e: WechatMiniprogram.SwiperChange) => {
  current.value = e.detail.current
}

watch(innerShow, (val) => {
  emit('change', val)
  current.value = val ? 1 : 0
})

watch(
  () => show,
  (val) => {
    innerShow.value = val
  },
)

onAttached(() => onThemeChange(setTheme))

onDetached(() => offThemeChange(setTheme))
</script>

<style>
.kd-drawer {
  position: fixed;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100%;
}

.kd-drawer--show {
  top: 0;
}

.kd-drawer__mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--kd-color-mask-regular);
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
}

.kd-drawer--show .kd-drawer__mask {
  opacity: 1;
}

.kd-drawer__panel {
  position: absolute;
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
