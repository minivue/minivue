<template>
  <Button :class="buttonClass" hover-class="kd-button--pressed"><slot /></Button>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'

interface Props {
  /** 按钮类型 */
  type?: 'primary' | 'secondary' | 'light'
  /** 按钮尺寸 */
  size?: 'xl' | 'l' | 'm'
}

defineOptions({
  name: 'KdButton',
})

const { type = 'secondary', size = 'm' } = defineProps<Props>()

const buttonClass = computed(() => `kd-button kd-button--${type} kd-button--${size}`)
</script>

<style>
.kd-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto !important;
  font-weight: 400;
  border-radius: 8px;
}

.kd-button--secondary {
  color: var(--kd-color-text-primary);
  background-color: var(--kd-color-state-hover);
}

.kd-button--m {
  min-width: 56px;
  padding: 5px 12px;
  font-size: 14px;
  line-height: var(--kd-font-line-height-middle);
}

.kd-button--secondary.kd-button--pressed {
  color: var(--kd-color-text-primary);
  background-color: var(--kd-color-state-pressed);
}

/* button {
    border-radius: 4px;
    font-size: 17px;
    font-weight: 700;
    line-height: 1.41176471;
    padding: 8px 24px;
}

button {
    background-color: #343434;
    color: #d6d6d6;
}

button {
    -webkit-tap-highlight-color: transparent;
    background-color: #f8f8f8;
    border-radius: 5px;
    box-sizing: border-box;
    color: #000;
    cursor: pointer;
    display: block;
    font-size: 18px;
    line-height: 2.55555556;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    padding-left: 14px;
    padding-right: 14px;
    position: relative;
    text-align: center;
    text-decoration: none;
} */
</style>

<config lang="json">
{
  "component": true
}
</config>
