<template>
  <View :class="classes">
    <KdIcon type="link" />
    <Text class="kd-link__text"><slot /></Text>
  </View>
</template>

<script setup lang="ts">
import KdIcon from './icon.vue'
import { computed } from '@minivue/core'

defineOptions({
  name: 'KdButton',
})

interface Props {
  /** 尺寸 */
  size?: 's' | 'm' | 'l'
}

const { size = 'm' } = defineProps<Props>()

const classes = computed(() => `kd-link kd-link--${size}`)
</script>

<style>
.kd-link {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  color: var(--kd-color-text-public);
}

.kd-link .kd-icon {
  width: 14px !important;
  height: 14px !important;
  margin-right: 4px;
  font-size: 14px !important;
}

.kd-link--l .kd-icon {
  width: 18px !important;
  height: 18px !important;
  margin-right: 4px;
  font-size: 18px !important;
}

.kd-link__text {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: var(--kd-font-line-height-base);
  text-decoration: underline;
}

.kd-link--s .kd-link__text {
  font-size: 12px;
}

.kd-link--m .kd-link__text {
  font-size: 14px;
}

.kd-link--l .kd-link__text {
  font-size: 16px;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
