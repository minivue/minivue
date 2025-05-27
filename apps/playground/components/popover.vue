<template>
  <View class="kd-popover-trigger" @tap="onTap">
    <slot />
  </View>
  <RootPortal>
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
  /** 相对参考物 */
  reference?: 'anchor' | 'pointer'
  /** 位置 */
  placement?: Placement
}

defineOptions({
  name: 'KdPopover',
})

const { placement = 'bottom' } = defineProps<Props>()
const appBaseInfo = getAppBaseInfo()
const top = ref(0)
const left = ref(0)
const theme = ref(appBaseInfo.theme)
const themes = computed(() => `kd-theme--default kd-theme--${theme.value}`)

const style = computed(() =>
  styleObjectToString({
    top: `${top.value}px`,
    left: `${left.value}px`,
  }),
)

const classes = computed(() => `kd-popover ${themes.value}`)

// const show = ref(false)
const ctx = getCurrentInstance<ComponentInstance>()

const setPlacement = async () => {
  const [x, y] = await getPopoverRect(ctx, '.kd-popover-trigger', '.kd-popover', placement)
  top.value = y
  left.value = x
}

const setTheme = (res: { theme: 'dark' | 'light' }) => (theme.value = res.theme)

const onTap = () => {
  // show.value = !show.value
}

watch(() => placement, setPlacement)

onAttached(() => {
  onThemeChange(setTheme)
  setPlacement()
})

onDetached(() => {
  offThemeChange(setTheme)
})
</script>

<style>
.kd-popover-trigger {
  display: inline-flex;
}

.kd-popover {
  position: fixed;
  box-sizing: border-box;
  align-items: center;
  min-width: 70px;
  max-width: 320px;
  min-height: 46px;
  max-height: 68px;
  padding: 12px 16px;
  overflow: auto;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base);
  color: var(--kd-color-inverse-base);
  background: var(--kd-color-mask-heavy);
  border-radius: 12px;
  backdrop-filter: blur(5px);
  transition: all 0.2s ease-in-out;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
