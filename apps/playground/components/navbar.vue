<template>
  <View :class="classes" :style="styles">
    <View style="height: var(--padding-top)"></View>
    <View class="kd-navbar__content">
      <View class="kd-navbar__left">
        <View v-if="buttons.length" class="kd-navbar__actions">
          <View class="kd-navbar__action" v-for="item in buttons" :key="item.action">
            <KdButton :icon="item.icon" only-icon @tap="onActionTap(item.action)" />
          </View>
        </View>
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
import {
  getPages,
  navigateBack,
  getWindowInfo,
  styleObjectToString,
  classObjectToString,
  getMenuButtonBoundingClientRect,
} from './utils'

import KdButton from './button.vue'

defineOptions({
  name: 'KdNavbar',
})

interface Action {
  /** 图标 */
  icon: string
  /** 行为 */
  action: string
}

interface Props {
  /** 标题 */
  title?: string
  /** 左侧按钮 */
  actions?: Action[]
}

interface Events {
  /** 按钮点击 */
  action: [action: string]
}

const emit = defineEmits<Events>()

const { title, actions = [] } = defineProps<Props>()

const { windowWidth } = getWindowInfo()

const { top, left, height } = getMenuButtonBoundingClientRect()

const classes = computed(() => classObjectToString('kd-navbar'))

const styles = computed(() => {
  const offset = (44 - height) / 2
  const paddingTop = top - offset
  return styleObjectToString({
    '--padding-top': `${paddingTop}px`,
    '--padding-width': `${windowWidth - left}px`,
  })
})

const buttons = computed(() => {
  if (actions.length) {
    return actions
  }
  const pages = getPages()
  if (pages.length > 1) {
    return [
      {
        icon: 'back',
        action: 'back',
      },
    ]
  }
  return []
})

const onActionTap = (action: string) => {
  if (action === 'back') {
    navigateBack()
  }
  emit('action', action)
}
</script>

<style>
.kd-navbar__content {
  display: flex;
  align-items: center;
  height: 44px;
}

.kd-navbar__left,
.kd-navbar__right {
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;
  min-width: var(--padding-width);
}

.kd-navbar__actions {
  padding: 0 5px;
}

.kd-navbar__action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
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
