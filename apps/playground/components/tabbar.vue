<template>
  <KdMatchMedia @match="onScreenMatch" :max-width="500">
    <View :class="classes">
      <View class="kd-tabbar__wrapper">
        <KdButton
          v-for="item in items"
          type="light"
          :icon="item.icon"
          :vertical="vertical"
          :key="item.key"
          :highlight="item.key === activeKey"
          @tap="onTap(item.key)"
        >
          {{ item.text }}
        </KdButton>
      </View>
    </View>
  </KdMatchMedia>
</template>

<script setup lang="ts">
import { ref, computed, watch } from '@minivue/core'
import { classObjectToString } from './utils'
import KdButton from './button.vue'
import KdMatchMedia from './match-media.vue'

interface Item {
  key: string
  icon?: string
  text: string
}

interface Props {
  items?: Item[]
  active?: string
}

interface Events {
  change: [key: string]
}

defineOptions({
  name: 'KdTabbar',
})

const { items = [], active } = defineProps<Props>()
const emit = defineEmits<Events>()

const vertical = ref(true)
const activeKey = ref(active)

const classes = computed(() =>
  classObjectToString('kd-tabbar', {
    'kd-tabbar--vertical': vertical.value,
  }),
)

const onScreenMatch = (e: boolean) => (vertical.value = e)

const onTap = (key: string) => {
  activeKey.value = key
  emit('change', key)
}

watch(
  () => active,
  (newVal) => {
    activeKey.value = newVal
  },
)
</script>

<style>
.kd-tabbar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: env(safe-area-inset-bottom);
  background-color: var(--kd-color-background-middle);
}

.kd-tabbar__wrapper {
  box-sizing: border-box;
  display: flex;
  gap: 4px;
  align-items: flex-start;
  align-self: stretch;
  justify-content: center;
  height: 54px;
  padding: 4px;
}

.kd-tabbar .kd-button {
  flex: 1;
  min-height: 100%;
}

.kd-tabbar--vertical .kd-tabbar__wrapper {
  height: 64px;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
