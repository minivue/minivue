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
        <View class="kd-tabs__nav-items" id="parent">
          <View class="kd-tabs__nav-edge" id="left" style="left: 0"></View>
          <View class="kd-tabs__nav-item kd-tabs__nav-item--active" id="navitem0" @tap="onTap(0)">
            <Text>总结汇报</Text>
            <View class="kd-tabs__nav-indicator" id="indicator0"></View>
          </View>
          <View class="kd-tabs__nav-item" id="navitem1" @tap="onTap(1)">
            <Text>教学课件</Text>
            <View class="kd-tabs__nav-indicator" id="indicator1"></View>
          </View>
          <View class="kd-tabs__nav-item" id="navitem2" @tap="onTap(2)">
            <Text>明细帐</Text>
            <View class="kd-tabs__nav-indicator" id="indicator2"></View>
          </View>
          <View class="kd-tabs__nav-item" id="navitem3" @tap="onTap(3)">
            <Text>房屋出租合同</Text>
            <View class="kd-tabs__nav-indicator" id="indicator3"></View>
          </View>
          <View class="kd-tabs__nav-item" id="navitem4" @tap="onTap(4)">
            <Text>其它乱七八糟</Text>
            <View class="kd-tabs__nav-indicator" id="indicator4"></View>
          </View>
          <View class="kd-tabs__nav-edge" id="right" style="right: 0"></View>
          <View class="kd-tabs__nav-indicator" :style="indicatorStyle"></View>
        </View>
      </ScrollView>
      <View v-if="showRight" class="kd-tabs__nav-right"></View>
    </View>
    <Swiper style="flex: 1" :current="current" @change="onChange">
      <SwiperItem class="kd-tabs__content">
        <Text>总结汇报</Text>
      </SwiperItem>
      <SwiperItem class="kd-tabs__content">
        <Text>教学课件</Text>
      </SwiperItem>
      <SwiperItem class="kd-tabs__content">
        <Text>明细帐</Text>
      </SwiperItem>
      <SwiperItem class="kd-tabs__content">
        <Text>房屋出租合同</Text>
      </SwiperItem>
      <SwiperItem class="kd-tabs__content">
        <Text>其它乱七八糟</Text>
      </SwiperItem>
    </Swiper>
    <View class="kd-tabs__panel"> </View>
  </View>
</template>

<script setup lang="ts">
import { ComponentInstance, getCurrentInstance, ref, onAttached, computed } from '@minivue/core'
import {
  getRect,
  getWindowInfo,
  getRelativeRect,
  styleObjectToString,
  observeViewportIntersection,
  scrollIntoView,
} from './utils'

defineOptions({
  name: 'KdTabs',
})

const ctx = getCurrentInstance<ComponentInstance>()
const current = ref(0)
const showLeft = ref(false)
const showRight = ref(false)
const indicatorLeft = ref(0)
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
  const indicatorRect = await getRelativeRect(ctx, indicator, '#parent')
  current.value = index
  indicatorLeft.value = indicatorRect.left
  scrollIntoView(ctx, '#view', navitem)
}

const onTap = (index: number) => {
  change(index)
}

const onChange = (e: WechatMiniprogram.SwiperChange) => {
  change(e.detail.current)
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
}

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
