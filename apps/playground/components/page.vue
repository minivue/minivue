<template>
  <View :class="classes">
    <KdNavbar :title="title">
      <slot slot="left" name="navbar_left" />
      <KdButton slot="left" icon="back" type="light" only-icon />
    </KdNavbar>
    <ScrollView class="kd-page__content" scroll-y><slot /></ScrollView>
  </View>
</template>

<script setup lang="ts">
import { computed, ref } from '@minivue/core'
import { getAppBaseInfo, onThemeChange } from './utils'
import KdNavbar from './navbar.vue'
import KdButton from './button.vue'

defineOptions({
  name: 'KdPage',
})

interface Props {
  /** 页面标题 */
  title?: string
}

const appBaseInfo = getAppBaseInfo()

const { title } = defineProps<Props>()

const theme = ref(appBaseInfo.theme)

const classes = computed(() => `kd-page kd-theme--default kd-theme--${theme.value}`)

onThemeChange((res) => {
  theme.value = res.theme
})
</script>

<style>
.kd-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--kd-color-background-middle);
}

.kd-page__content {
  flex: 1;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
