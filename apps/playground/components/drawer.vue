<template>
  <RootPortal>
    <View :class="classes">
      <View class="kd-drawer__mask" @tap="onClose"></View>
      <Swiper
        class="kd-drawer__panel"
        vertical
        :style="styles"
        :duration="250"
        :current="current || 0"
        :cache-extent="1"
        @change="onChange"
        @animationfinish="onAnimationFinish"
      >
        <SwiperItem />
        <SwiperItem class="kd-drawer__box">
          <VerticalDragGestureHandler
            native-view="scroll-view"
            worklet:should-accept-gesture="shouldAcceptGesture"
            worklet:should-response-on-move="shouldResponse"
          >
            <ScrollView class="kd-drawer__view" scroll-y worklet:onscrollupdate="onScroll">
              <View class="kd-drawer__content"><slot /></View>
            </ScrollView>
          </VerticalDragGestureHandler>
        </SwiperItem>
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
  getAppBaseInfo,
  onThemeChange,
  offThemeChange,
  classObjectToString,
  getRect,
  styleObjectToString,
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
  /** 位置 */
  placement?: Placement
}

interface ShareValue {
  deltaY: { value: number }
  scrollTop: { value: number }
}

defineOptions({
  name: 'KdDrawer',
  methods: {
    onScroll(this: ShareValue, e: WechatMiniprogram.ScrollViewScroll) {
      'worklet'
      this.scrollTop.value = e.detail.scrollTop
    },
    shouldAcceptGesture(this: ShareValue) {
      'worklet'
      const deltaY = this.deltaY.value
      const scrollTop = this.scrollTop.value
      if (deltaY > 0 && scrollTop <= 0) {
        return false
      }
      return true
    },
    shouldResponse(this: ShareValue, e: { deltaY: number }) {
      'worklet'
      this.deltaY.value = e.deltaY
      return true
    },
  },
  lifetimes: {
    created(this: ShareValue) {
      this.deltaY = sharedValue(0)
      this.scrollTop = sharedValue(0)
    },
  },
})

const emit = defineEmits<Events>()
const { show, height = 0, placement = 'bottom' } = defineProps<Props>()
const ctx = getCurrentInstance<ComponentInstance>()
const appBaseInfo = getAppBaseInfo()
const current = ref(0)
const theme = ref(appBaseInfo.theme)
const innerShow = ref(show)
const innerHeight = ref(height || 100)
const styles = computed(() =>
  styleObjectToString({
    height: `${innerHeight.value}px`,
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
    innerHeight.value = rect.height
    await new Promise((resolve) => setTimeout(resolve, 50))
  }
}

const onAnimationFinish = () => {
  innerShow.value = current.value !== 0
}

const onChange = (e: WechatMiniprogram.SwiperChange) => {
  current.value = e.detail.current
}

const onShowChange = async (val: boolean) => {
  await setHeight()
  innerShow.value = val
}

const onClose = () => {
  current.value = 0
}

watch(innerShow, (val) => {
  emit('change', val)
  current.value = val ? 1 : 0
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
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  overflow: hidden;
  touch-action: pan-y;
  border-radius: 12px 12px 0 0;
}

.kd-drawer__box {
  position: relative;
  overflow: visible;
  background: var(--kd-color-background-middle);
  border-radius: 12px 12px 0 0;
}

.kd-drawer__box::before {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  background: var(--kd-color-background-middle);
}

.kd-drawer__view {
  width: 100%;
  height: 100%;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
