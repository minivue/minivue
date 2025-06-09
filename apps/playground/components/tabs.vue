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
        <View class="kd-tabs__nav-items">
          <View class="kd-tabs__nav-edge" id="left"></View>
          <View class="kd-tabs__nav-item kd-tabs__nav-item--active" @tap="onTap(1)">
            <Text>总结汇报</Text>
            <View class="kd-tabs__nav-indicator" id="indicator1"></View>
          </View>
          <View class="kd-tabs__nav-item" @tap="onTap(2)">
            <Text>教学课件</Text>
            <View class="kd-tabs__nav-indicator" id="indicator2"></View>
          </View>
          <View class="kd-tabs__nav-item" @tap="onTap(3)">
            <Text>明细帐</Text>
            <View class="kd-tabs__nav-indicator" id="indicator3"></View>
          </View>
          <View class="kd-tabs__nav-item" @tap="onTap(4)">
            <Text>房屋出租合同</Text>
            <View class="kd-tabs__nav-indicator" id="indicator4"></View>
          </View>
          <View class="kd-tabs__nav-item" @tap="onTap(5)">
            <Text>其它乱七八糟</Text>
            <View class="kd-tabs__nav-indicator" id="indicator5"></View>
          </View>
          <View class="kd-tabs__nav-edge" id="right"></View>
        </View>
      </ScrollView>
      <View v-if="showRight" class="kd-tabs__nav-right"></View>
    </View>
  </View>
</template>

<script setup lang="ts">
import { ComponentInstance, getCurrentInstance, ref, onAttached } from '@minivue/core'
import { getRect, getWindowInfo, observeViewportIntersection } from './utils'

defineOptions({
  name: 'KdTabs',
})

const ctx = getCurrentInstance<ComponentInstance>()
const showLeft = ref(false)
const showRight = ref(false)

const onTap = async (index: number) => {
  const indicator = `#indicator${index}`
  const indicatorRect = await getRect(ctx, indicator)

  console.log('tap', indicatorRect)
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

.kd-tabs__nav-edge:first-child {
  left: 0;
}

.kd-tabs__nav-edge:last-child {
  right: 0;
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
  background: var(--kd-color-line-public);
  border-radius: 1px;
  opacity: 0;
}

.kd-tabs__nav-item--active .kd-tabs__nav-indicator {
  opacity: 1;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
