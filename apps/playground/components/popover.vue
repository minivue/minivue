<template>
  <View class="kd-popover-trigger" @tap="onTap">
    <slot />
  </View>
  <RootPortal v-if="mounted">
    <View :class="classes" :style="style">
      <slot name="content" />
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
  getPopoverRect,
  styleObjectToString,
  onThemeChange,
  offThemeChange,
  classObjectToString,
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

interface Props {
  /** 位置偏移 */
  gap?: number
  /** 相对参考物 */
  reference?: 'anchor' | 'pointer'
  /** 位置 */
  placement?: Placement
}

defineOptions({
  name: 'KdPopover',
})

const { placement = 'bottom', gap = 0 } = defineProps<Props>()

const ctx = getCurrentInstance<ComponentInstance>()

const appBaseInfo = getAppBaseInfo()
const top = ref(0)
const left = ref(0)
const show = ref(false)
const mounted = ref(false)
const theme = ref(appBaseInfo.theme)
const themes = computed(() => `kd-theme--default kd-theme--${theme.value}`)

const style = computed(() =>
  styleObjectToString({
    top: `${top.value}px`,
    left: `${left.value}px`,
  }),
)

const classes = computed(() =>
  classObjectToString(`kd-popover ${themes.value}`, {
    'kd-popover--show': show.value,
  }),
)

const setPlacement = async () => {
  const [x, y] = await getPopoverRect(ctx, '.kd-popover-trigger', '.kd-popover', placement, gap)
  top.value = y
  left.value = x
}

const setTheme = (res: { theme: 'dark' | 'light' }) => (theme.value = res.theme)

const onTap = async () => {
  mounted.value = true
  await setPlacement()
  show.value = true
}

watch(() => placement, setPlacement)

onAttached(() => onThemeChange(setTheme))

onDetached(() => offThemeChange(setTheme))
</script>

<style>
.kd-popover-trigger {
  position: relative;
  display: inline-flex;
}

.kd-popover {
  position: fixed;
  overflow: hidden;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'PingFang SC',
    'Noto Sans', 'Noto Sans CJK SC', 'Microsoft YaHei', '微软雅黑', sans-serif;
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
