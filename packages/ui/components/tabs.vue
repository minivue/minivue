<template>
  <View class="kd-tabs">
    <View class="kd-tabs__nav">
      <View v-if="showLeft" class="kd-tabs__nav-left"></View>
      <ScrollView
        id="view"
        scroll-x
        enhanced
        enable-flex
        :show-scrollbar="false"
        class="kd-tabs__nav-scroll"
      >
        <View class="kd-tabs__nav-items" id="nav">
          <View class="kd-tabs__nav-edge" id="left" style="left: 0"></View>
          <View
            v-for="(item, index) in tabs"
            :id="'navitem' + index"
            :key="item.key"
            :class="
              'kd-tabs__nav-item' + (index === innerCurrent ? ' kd-tabs__nav-item--active' : '')
            "
            @tap="onTap(index)"
          >
            <Text>{{ item.label }}</Text>
            <View class="kd-tabs__nav-indicator" :id="'indicator' + index"></View>
          </View>
          <View class="kd-tabs__nav-edge" id="right" style="right: 0"></View>
          <View class="kd-tabs__nav-indicator" :style="indicatorStyle"></View>
        </View>
      </ScrollView>
      <View v-if="showRight" class="kd-tabs__nav-right"></View>
    </View>
    <Swiper style="flex: 1" :current="innerCurrent" @change="onChange">
      <SwiperItem v-for="item in tabs" :key="item.key" class="kd-tabs__content">
        <slot name="{{item.key}}" />
      </SwiperItem>
    </Swiper>
    <View class="kd-tabs__panel"> </View>
  </View>
</template>

<script setup lang="ts">
import {
  ComponentInstance,
  getCurrentInstance,
  ref,
  onAttached,
  computed,
  watch,
} from '@minivue/core'
import {
  getRect,
  getWindowInfo,
  getRelativeRect,
  styleObjectToString,
  observeViewportIntersection,
  scrollIntoView,
} from '../utils'

interface TabItem {
  key: string
  label: string
}

interface Props {
  current?: number
  tabs: TabItem[]
}

defineOptions({
  name: 'KdTabs',
})

const { current = 0 } = defineProps<Props>()

const ctx = getCurrentInstance<ComponentInstance>()
const showLeft = ref(false)
const showRight = ref(false)
const indicatorLeft = ref(0)
const innerCurrent = ref(current)
const indicatorStyle = computed(() =>
  styleObjectToString({
    left: 0,
    opacity: 1,
    marginLeft: 0,
    transform: `translateX(${indicatorLeft.value}px)`,
  }),
)

const change = async (index: number) => {
  const indicator = `#indicator${index}`
  const navitem = `#navitem${index}`
  const indicatorRect = await getRelativeRect(ctx, indicator, '#nav')
  innerCurrent.value = index
  indicatorLeft.value = indicatorRect.left
  scrollIntoView(ctx, '#view', navitem)
}

const onTap = (index: number) => {
  change(index)
}

const onChange = ({ detail: { source, current } }: WechatMiniprogram.SwiperChange) => {
  if (source) {
    change(current)
  }
}

const onReachLeft = (result: WechatMiniprogram.IntersectionObserverObserveCallbackResult) => {
  showLeft.value = !result.intersectionRatio
}

const onReachRight = (result: WechatMiniprogram.IntersectionObserverObserveCallbackResult) => {
  showRight.value = !result.intersectionRatio
}

const init = async () => {
  const { windowWidth } = getWindowInfo()
  const rect = await getRect(ctx, '#view')
  const left = rect.left * -1
  const right = (windowWidth - rect.right) * -1
  const margin = { left, right }
  observeViewportIntersection(ctx, '#left', margin, onReachLeft)
  observeViewportIntersection(ctx, '#right', margin, onReachRight)
  change(current)
}

watch(
  () => current,
  (val) => (innerCurrent.value = val),
)

onAttached(init)
</script>

<style>
.kd-tabs {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
}

.kd-tabs__nav {
  position: relative;
  height: 44px;
}

.kd-tabs__nav-edge {
  position: absolute;
  top: 0;
  width: 1px;
  height: 100%;
}

.kd-tabs__nav-left,
.kd-tabs__nav-right {
  position: absolute;
  top: 2px;
  z-index: 1;
  width: 24px;
  height: 40px;
  pointer-events: none;
  background-image: linear-gradient(
    270deg,
    var(--kd-color-background-middle) 0%,
    rgba(255, 255, 255, 0%) 100%
  );
}

.kd-tabs__nav-left {
  left: 0;
  transform: rotate(180deg);
}

.kd-tabs__nav-right {
  right: 0;
}

.kd-tabs__nav-scroll {
  height: 100%;
}

.kd-tabs__nav-items {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  width: max-content;
  height: 100%;
}

.kd-tabs__nav-item {
  position: relative;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: var(--kd-font-size-middle);
  line-height: var(--kd-font-line-height-middle);
  color: var(--kd-color-text-primary);
  text-align: center;
  border-radius: 4px;
}

.kd-tabs__nav-item + .kd-tabs__nav-item {
  margin-left: 24px;
}

.kd-tabs__nav-item--active {
  font-weight: 600;
}

.kd-tabs__nav-indicator {
  position: absolute;
  bottom: 4px;
  left: 50%;
  width: 24px;
  height: 2px;
  margin-left: -12px;
  pointer-events: none;
  background: var(--kd-color-line-public);
  border-radius: 1px;
  opacity: 0;
  transition: transform 0.2s ease-out;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
