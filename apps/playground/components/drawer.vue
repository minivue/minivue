<template>
  <RootPortal>
    <View :class="classes" :style="'font-family:' + fontFamily">
      <View class="kd-drawer__mask" @tap="onClose"></View>
      <Swiper
        class="kd-drawer__panel"
        :vertical="isVertical"
        :style="styles"
        :duration="250"
        :current="current || 0"
        :cache-extent="1"
        @change="onChange"
        @animationfinish="onAnimationFinish"
      >
        <SwiperItem v-if="isUp" />
        <SwiperItem class="kd-drawer__swiper">
          <View class="kd-drawer__box">
            <View v-if="isDown || !isVertical" class="kd-drawer__safearea"></View>
            <View class="kd-drawer__view">
              <VerticalDragGestureHandler
                native-view="scroll-view"
                worklet:should-accept-gesture="shouldAcceptGesture"
                worklet:should-response-on-move="shouldResponse"
              >
                <ScrollView
                  class="kd-drawer__scroll"
                  :scroll-y="scrollable"
                  worklet:onscrollupdate="onScroll"
                >
                  <View class="kd-drawer__content"><slot /></View>
                </ScrollView>
              </VerticalDragGestureHandler>
            </View>
            <View v-if="isUp || !isVertical" class="kd-drawer__safearea"></View>
          </View>
        </SwiperItem>
        <SwiperItem v-if="isDown" />
      </Swiper>
    </View>
  </RootPortal>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  computed,
  onAttached,
  onDetached,
  getCurrentInstance,
  ComponentInstance,
} from '@minivue/core'
import {
  fontFamily,
  getAppBaseInfo,
  onThemeChange,
  offThemeChange,
  classObjectToString,
  getRect,
  styleObjectToString,
  delay,
} from './utils'
import { sharedValue } from '../../../packages/core/src/utils'

type Placement = 'top' | 'right' | 'bottom' | 'left'

interface Events {
  /** 状态改变 */
  change: [value: boolean]
}

interface Props {
  /** 是否显示 */
  show?: boolean
  /** 高度(不设置则自动设置高度) */
  height?: number
  /** 宽度(不设置默认200，其只有placement为left或right的时候才生效)  */
  width?: number
  /** 最大高度(不设置默认600) */
  maxHeight?: number
  /** 位置 */
  placement?: Placement
  /** 是否开启滚动(默认开启) */
  scrollable?: boolean
}

interface Context {
  height: { value: number }
  deltaY: { value: number }
  isReachTop: { value: boolean }
  isReachBottom: { value: boolean }
  placement: { value: Placement }
  properties: {
    placement: Placement
  }
}

defineOptions({
  name: 'KdDrawer',
  methods: {
    onScroll(this: Context, e: WechatMiniprogram.ScrollViewScroll) {
      'worklet'
      const { scrollTop, scrollHeight } = e.detail
      this.isReachTop.value = scrollTop <= 0
      this.isReachBottom.value = scrollHeight - scrollTop <= this.height.value
    },
    shouldAcceptGesture(this: Context) {
      'worklet'
      const deltaY = this.deltaY.value
      const isReachTop = this.isReachTop.value
      const isReachBottom = this.isReachBottom.value
      const placement = this.placement.value
      if (placement === 'top' || placement === 'bottom') {
        if (placement === 'bottom') {
          if (deltaY > 0 && isReachTop) {
            return false
          }
        } else if (deltaY < 0 && isReachBottom) {
          return false
        }
      }
      return true
    },
    shouldResponse(this: Context, e: { deltaY: number }) {
      'worklet'
      this.deltaY.value = e.deltaY
      return true
    },
  },
  lifetimes: {
    attached(this: Context) {
      this.height = sharedValue(0)
      this.placement = sharedValue(this.properties.placement)
      this.deltaY = sharedValue(0)
      this.isReachTop = sharedValue(true)
      this.isReachBottom = sharedValue(false)
    },
  },
})

const emit = defineEmits<Events>()
const {
  show,
  height = 0,
  width = 200,
  maxHeight = 600,
  placement = 'bottom',
  scrollable = true,
} = defineProps<Props>()
const ctx = getCurrentInstance<ComponentInstance>()
const appBaseInfo = getAppBaseInfo()
const isDown = computed(() => placement === 'top' || placement === 'left')
const isUp = computed(() => placement === 'bottom' || placement === 'right')
const isVertical = computed(() => placement === 'bottom' || placement === 'top')
const initIndex = computed(() => (isUp.value ? 0 : 1))
const current = ref(initIndex.value)
const theme = ref(appBaseInfo.theme)
const innerShow = ref(show)
const innerHeight = ref(height || 100)
const styles = computed(() =>
  styleObjectToString({
    '--kd-drawer-width': `${width}px`,
    '--kd-drawer-height': `${innerHeight.value}px`,
  }),
)
const classes = computed(() =>
  classObjectToString(
    'kd-drawer',
    `kd-drawer--${placement}`,
    'kd-theme--default',
    `kd-theme--${theme.value}`,
    {
      'kd-drawer--show': innerShow.value,
    },
  ),
)

const setTheme = (res: { theme: 'dark' | 'light' }) => (theme.value = res.theme)

const setHeight = async () => {
  if (!height) {
    const rect = await getRect(ctx, '.kd-drawer__content')
    innerHeight.value = Math.min(rect.height, maxHeight)
    await delay(50)
  }
}

const onAnimationFinish = () => {
  innerShow.value = current.value !== initIndex.value
}

const onChange = (e: WechatMiniprogram.SwiperChange) => {
  current.value = e.detail.current
}

const onShowChange = async (val: boolean) => {
  if (val) {
    await setHeight()
    innerShow.value = val
  } else {
    current.value = isDown.value ? 1 : 0
  }
}

const onClose = () => {
  current.value = initIndex.value
}

watch(
  innerHeight,
  (val) => {
    ctx.height.value = val
  },
  {
    immediate: true,
  },
)

watch(innerShow, (val) => {
  emit('change', val)
  if (isDown.value) {
    current.value = val ? 0 : 1
  } else {
    current.value = val ? 1 : 0
  }
})

watch(() => show, onShowChange)

onAttached(() => onThemeChange(setTheme))

onDetached(() => offThemeChange(setTheme))
</script>

<style>
.kd-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(100%);
}

.kd-drawer--show {
  transform: translateY(0);
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
  display: flex;
  overflow: hidden;
}

.kd-drawer--top .kd-drawer__panel {
  top: 0;
  left: 0;
  width: 100%;
  height: calc(var(--kd-drawer-height) + env(safe-area-inset-top));
  border-radius: 0 0 12px 12px;
}

.kd-drawer--bottom .kd-drawer__panel {
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(var(--kd-drawer-height) + env(safe-area-inset-bottom));
  border-radius: 12px 12px 0 0;
}

.kd-drawer--left .kd-drawer__panel {
  top: 0;
  left: 0;
  width: var(--kd-drawer-width);
  height: 100%;
  border-radius: 0 12px 12px 0;
}

.kd-drawer--right .kd-drawer__panel {
  top: 0;
  right: 0;
  width: var(--kd-drawer-width);
  height: 100%;
  border-radius: 12px 0 0 12px;
}

.kd-drawer__swiper {
  position: relative;
  overflow: visible;
}

.kd-drawer__swiper::before {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  content: '';
  background: var(--kd-color-background-middle);
}

.kd-drawer--top .kd-drawer__swiper::before {
  transform: translateY(-100%);
}

.kd-drawer--bottom .kd-drawer__swiper::before {
  transform: translateY(100%);
}

.kd-drawer--left .kd-drawer__swiper::before {
  transform: translateX(-100%);
}

.kd-drawer--right .kd-drawer__swiper::before {
  transform: translateX(100%);
}

.kd-drawer__box {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--kd-color-background-middle);
}

.kd-drawer--top .kd-drawer__box {
  border-radius: 0 0 12px 12px;
}

.kd-drawer--bottom .kd-drawer__box {
  border-radius: 12px 12px 0 0;
}

.kd-drawer--left .kd-drawer__box {
  border-radius: 0 12px 12px 0;
}

.kd-drawer--right .kd-drawer__box {
  border-radius: 12px 0 0 12px;
}

.kd-drawer__view {
  position: relative;
  flex: 1;
}

.kd-drawer__scroll {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.kd-drawer__safearea {
  flex-shrink: 0;
}

.kd-drawer--top .kd-drawer__safearea {
  height: env(safe-area-inset-top);
}

.kd-drawer--bottom .kd-drawer__safearea {
  height: env(safe-area-inset-bottom);
}

.kd-drawer--left .kd-drawer__safearea:first-child,
.kd-drawer--right .kd-drawer__safearea:first-child {
  height: env(safe-area-inset-top);
}

.kd-drawer--left .kd-drawer__safearea:last-child,
.kd-drawer--right .kd-drawer__safearea:last-child {
  height: env(safe-area-inset-bottom);
}
</style>

<config lang="json">
{
  "component": true
}
</config>
