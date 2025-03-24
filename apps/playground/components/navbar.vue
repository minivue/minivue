<template>
  <View :class="classes" :style="styles">
    <View style="height: var(--padding-top)"></View>
    <View class="kd-navbar__content">
      <View class="kd-navbar__left">
        <slot name="left" />
      </View>
      <View class="kd-navbar__center">
        <Text class="kd-navbar__title" v-if="title" overflow="ellipsis">{{ title }}</Text>
        <slot />
      </View>
      <View class="kd-navbar__right">
        <slot name="right" />
      </View>
    </View>
  </View>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'
import { classObjectToString, getMenuButtonBoundingClientRect, styleObjectToString } from './utils'

defineOptions({
  name: 'KdNavbar',
})

interface Props {
  title?: string
}

const { title } = defineProps<Props>()

const { top, bottom, left, right, width, height } = getMenuButtonBoundingClientRect()
console.log(top, bottom, left, right, width, height)

const classes = computed(() => classObjectToString('kd-navbar'))

const styles = computed(() => {
  const offset = (44 - height) / 2
  const paddingTop = top - offset
  return styleObjectToString({
    '--padding-top': `${paddingTop}px`,
    '--padding-width': `calc(100% - ${left}px)`,
  })
})
</script>

<style>
.kd-navbar__content {
  display: flex;
  align-items: center;
  height: 44px;
}

.kd-navbar__left,
.kd-navbar__right {
  flex-shrink: 0;
  min-width: var(--padding-width);
}

.kd-navbar__center {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
}

.kd-navbar__title {
  font-size: var(--kd-font-size-middle);
  line-height: var(--kd-font-line-height-middle);
  color: var(--kd-color-text-primary);
}
</style>

<config lang="json">
{
  "component": true
}
</config>
