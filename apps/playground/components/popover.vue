<template>
  <View class="kd-popover-trigger" @tap="onTap">
    <slot />
  </View>
  <RootPortal>
    <View class="kd-popover" :style="style">
      <slot name="content" />
    </View>
  </RootPortal>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, computed, onAttached, ComponentInstance } from '@minivue/core'
import { getPopoverRect, styleObjectToString } from './utils'

interface Props {
  /** 相对参考物 */
  reference?: 'anchor' | 'pointer'
}

defineOptions({
  name: 'KdPopover',
})

defineProps<Props>()

const top = ref(0)
const left = ref(0)

const style = computed(() =>
  styleObjectToString({
    top: `${top.value}px`,
    left: `${left.value}px`,
  }),
)

// const show = ref(false)
const ctx = getCurrentInstance<ComponentInstance>()

const onTap = () => {
  // show.value = !show.value
}

onAttached(async () => {
  const popoverRect = await getPopoverRect(ctx, '.kd-popover-trigger', '.kd-popover', 'top')
  console.warn('popover', popoverRect)
  top.value = popoverRect.top
  left.value = popoverRect.left
})
</script>

<style>
.kd-popover-trigger {
  display: inline-flex;
}

.kd-popover {
  position: fixed;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
