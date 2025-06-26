<template>
  <View :class="classes"><slot /></View>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'
import { classObjectToString } from '../utils'

defineOptions({
  name: 'KdButtonGroup',
})

interface Props {
  /** 是否垂直 */
  vertical?: boolean
}

const { vertical } = defineProps<Props>()

const classes = computed(() =>
  classObjectToString('kd-button-group', {
    'kd-button-group--vertical': vertical,
    'kd-button-group--horizontal': !vertical,
  }),
)
</script>

<style>
.kd-button-group {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--kd-color-background-middle);
}

.kd-button-group--horizontal {
  justify-content: flex-end;
}

.kd-button-group--horizontal .kd-button--xl {
  flex: 1;
}

.kd-button-group--horizontal .kd-button--l {
  margin-right: 0;
}

.kd-button-group--horizontal .kd-button--l + .kd-button--l {
  margin-left: 8px;
}

.kd-button-group--horizontal .kd-button--xl + .kd-button--xl {
  margin-left: 12px;
}

.kd-button-group--vertical {
  flex-direction: column;
}

.kd-button-group--vertical .kd-button {
  width: 100% !important;
}

.kd-button-group--vertical .kd-button--l + .kd-button--l {
  margin-top: 8px;
}

.kd-button-group--vertical .kd-button--xl + .kd-button--xl {
  margin-top: 12px;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
