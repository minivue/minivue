<template>
  <View :class="classes" :hover-stay-time="200" hover-class="kd-list-menu--pressed">
    <View class="kd-list-menu__prepend">
      <KdIcon type="more" size="22" />
    </View>
    <View class="kd-list-menu__center">
      <View class="kd-list-menu__title">
        <Text overflow="ellipsis" :max-lines="2"> 列表名称 </Text>
      </View>
      <View class="kd-list-menu__subtitle">
        <Text overflow="ellipsis">辅助文本</Text>
      </View>
    </View>
    <View class="kd-list-menu__append">
      <View class="kd-list-menu__desc">
        <Text overflow="ellipsis">描述文本</Text>
      </View>
      <KdIcon type="arrow-right" size="18" />
    </View>
  </View>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'
import KdIcon from './icon.vue'

defineOptions({
  name: 'KdListMenu',
})

interface Props {}

defineProps<Props>()

const classes = computed(() => 'kd-list-menu')
</script>

<style>
.kd-list-menu {
  position: relative;
  display: flex;
  align-items: center;
  align-self: stretch;
  padding-left: 16px;
}

.kd-list-menu::before {
  position: absolute;
  top: 0;
  right: 4px;
  bottom: 0;
  left: 4px;
  content: '';
  background: var(--kd-color-state-pressed);
  background-color: rgba(0, 0, 0, 10%);
  border-radius: var(--kd-border-radius-large);
  opacity: 0;
  transition: opacity 0.2s;
}

.kd-list-menu--pressed::before {
  opacity: 1;
}

.kd-list-menu__prepend {
  display: flex;
  flex-shrink: 0;
  gap: 10px;
  align-items: center;
  padding-right: 12px;
}

.kd-list-menu__center {
  box-sizing: border-box;
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  align-items: flex-start;
  padding: 14px 16px 14px 0;
}

.kd-list-menu__title {
  display: -webkit-box;
  align-self: stretch;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  font-size: var(--kd-font-size-middle);
  line-height: var(--kd-font-line-height-middle);
  color: var(--kd-color-text-primary);
  -webkit-box-orient: vertical;
}

.kd-list-menu__subtitle {
  align-self: stretch;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base,);
  color: var(--kd-color-text-tertiary);
}

.kd-list-menu__append {
  display: flex;
  flex-shrink: 0;
  gap: 2px;
  align-items: center;
  justify-content: flex-end;
  padding: 11px 12px 11px 0;
}

.kd-list-menu__desc {
  flex-shrink: 0;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base);
  color: var(--kd-color-text-tertiary);
  text-align: right;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
