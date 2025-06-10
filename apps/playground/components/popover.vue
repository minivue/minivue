<template>
  <View class="kd-popover-trigger" @tap="onTap" @longpress="onTap">
    <slot />
  </View>
  <RootPortal v-if="mounted">
    <View class="kd-popover-mask" :style="maskStyle" @tap="onClose"></View>
    <View :class="classes" :style="style">
      <slot name="content" />
      <slot name="other" />
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
  getRect,
  getAppBaseInfo,
  getPopoverPosition,
  onThemeChange,
  offThemeChange,
  classObjectToString,
  getPageContainerRect,
  getWindowInfo,
  styleObjectToString,
  camelCaseToBem,
  fontFamily,
} from './utils'

type Placement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'right'
  | 'rightTop'
  | 'rightBottom'
  | 'bottom'
  | 'bottomRight'
  | 'bottomLeft'
  | 'left'
  | 'leftTop'
  | 'leftBottom'

interface Coordinates {
  x: number
  y: number
}

interface Props {
  /** 位置偏移 */
  gap?: number
  /** 相对参考物 */
  reference?: 'anchor' | 'touch'
  /** 位置 */
  placement?: Placement
  /** 触发事件 */
  trigger?: 'tap' | 'longpress'
}

interface Events {
  show: []
  hide: []
}

defineOptions({
  name: 'KdPopover',
})

const {
  placement = 'bottom',
  gap = 0,
  reference = 'anchor',
  trigger = 'tap',
} = defineProps<Props>()
const emit = defineEmits<Events>()

const ctx = getCurrentInstance<ComponentInstance>()

const appBaseInfo = getAppBaseInfo()
const show = ref(false)
const mounted = ref(false)
const style = ref('')
const maskStyle = ref('')
const theme = ref(appBaseInfo.theme)
const themes = computed(() => `kd-theme--default kd-theme--${theme.value}`)
const finalPlacement = ref(placement)

const classes = computed(() =>
  classObjectToString(
    `${themes.value} kd-popover kd-popover--${camelCaseToBem(finalPlacement.value)}`,
    {
      'kd-popover--show': show.value,
    },
  ),
)

const setMaskStyle = async () => {
  const { windowWidth, windowHeight } = getWindowInfo()
  const { top, left, right, bottom } = await getPageContainerRect()
  maskStyle.value = `top:${top}px;left:${left}px;right:${windowWidth - right}px;bottom:${windowHeight - bottom}px;`
}

const setPlacement = async (coordinates?: Coordinates) => {
  const { top, left, bottom, right } = await getRect(ctx, '.kd-popover-trigger')
  const [x, y, bestPlacement] = await getPopoverPosition(
    ctx,
    coordinates || '.kd-popover-trigger',
    '.kd-popover',
    placement,
    gap,
  )
  finalPlacement.value = bestPlacement
  style.value = styleObjectToString({
    fontFamily,
    top: `${y}px`,
    left: `${x}px`,
    '--target-top': `${top}px`,
    '--target-left': `${left}px`,
    '--target-right': `${right}px`,
    '--target-bottom': `${bottom}px`,
  })
}

const setTheme = (res: { theme: 'dark' | 'light' }) => (theme.value = res.theme)

const onTap = async (e: WechatMiniprogram.CustomEvent) => {
  if (e.type !== trigger) {
    return
  }
  mounted.value = true
  setMaskStyle()
  await setPlacement(reference === 'touch' ? (e.detail as { x: number; y: number }) : undefined)
  show.value = true
}

const onClose = () => {
  show.value = false
  mounted.value = false
}

watch(show, (val) => {
  if (val) {
    emit('show')
  } else {
    emit('hide')
  }
})

onAttached(() => onThemeChange(setTheme))

onDetached(() => offThemeChange(setTheme))
</script>

<style>
.kd-popover-trigger {
  position: relative;
  display: inline-flex;
}

.kd-popover-mask {
  position: fixed;
}

.kd-popover {
  position: fixed;
  display: flex;
  pointer-events: none;
  opacity: 0;
}

.kd-popover--show {
  pointer-events: auto;
  opacity: 1;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
