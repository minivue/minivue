<template>
  <View class="kd-popover-trigger" @tap="onTap">
    <slot />
  </View>
  <RootPortal>
    <View class="kd-popover">
      <slot name="content" />
    </View>
  </RootPortal>
</template>

<script setup lang="ts">
import { getCurrentInstance, onAttached, ComponentInstance } from '@minivue/core'
import { getPopoverRect } from './utils'

interface Props {
  /** 相对参考物 */
  reference?: 'anchor' | 'pointer'
}

defineOptions({
  name: 'KdPopover',
})

defineProps<Props>()

// const show = ref(false)
const ctx = getCurrentInstance<ComponentInstance>()

const onTap = () => {
  // show.value = !show.value
}

onAttached(async () => {
  const popover = await getPopoverRect(ctx, '.kd-popover-trigger', '.kd-popover', 'top')
  console.warn('popover', popover)
})
</script>

<style>
.kd-popover-trigger {
  display: inline-flex;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
