<template>
  <View class="kd-tabs">
    <View class="kd-tabs__nav">
      <View class="kd-tabs__nav-left"></View>
      <ScrollView
        id="view"
        enhanced
        scroll-x
        enable-flex
        enable-passive
        upper-threshold="1"
        lower-threshold="1"
        :show-scrollbar="false"
        :min-drag-distance="0"
        class="kd-tabs__nav-scroll"
      >
        <View class="kd-tabs__nav-items">
          <View class="kd-tabs__nav-item kd-tabs__nav-item--active" id="start">
            <Text>总结汇报</Text>
            <View class="kd-tabs__nav-indicator"></View>
          </View>
          <View class="kd-tabs__nav-item">
            <Text>教学课件</Text>
            <View class="kd-tabs__nav-indicator"></View>
          </View>
          <View class="kd-tabs__nav-item">
            <Text>明细帐</Text>
            <View class="kd-tabs__nav-indicator"></View>
          </View>
          <View class="kd-tabs__nav-item">
            <Text>房屋出租合同</Text>
            <View class="kd-tabs__nav-indicator"></View>
          </View>
          <View class="kd-tabs__nav-item" id="end" style="background-color: red">
            <Text>其它乱七八糟</Text>
            <View class="kd-tabs__nav-indicator"></View>
          </View>
        </View>
      </ScrollView>
      <View class="kd-tabs__nav-right"></View>
    </View>
  </View>
</template>

<script type="wxs" lang="ts">
function onScroll(e: any, ownerInstance: any) {
  const s = ownerInstance.getComputedStyle('.kd-tabs')
  console.log('onScroll', JSON.stringify(s))
  console.log('onScroll', JSON.stringify(e.detail))
}

function onToUpper() {
  console.log('onToUpper')
}

function onToLower() {
  console.log('onToLower')
}

export const _ = {
  onScroll,
  onToUpper,
  onToLower,
}
</script>

<script setup lang="ts">
import { ComponentInstance, getCurrentInstance } from '@minivue/core'

defineOptions({
  name: 'KdTabs',
})

const ctx = getCurrentInstance<ComponentInstance>()

ctx
  .createIntersectionObserver({})
  .relativeToViewport({ left: -10, right: -10 })
  .observe('#start', (res) => {
    console.warn('start:', !!res.intersectionRatio)
  })

ctx
  .createIntersectionObserver({})
  .relativeToViewport({ left: -10, right: -10 })
  .observe('#end', (res) => {
    console.warn('end', !!res.intersectionRatio)
  })
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
  display: flex;
  flex-wrap: nowrap;
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
  background: var(--kd-color-line-public);
  border-radius: 1px;
  opacity: 0;
  transform: translateX(-50%);
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
