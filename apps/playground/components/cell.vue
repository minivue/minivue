<template>
  <View
    :class="classes"
    :hover-stay-time="200"
    :hover-class="hover ? 'kd-cell--pressed' : ''"
    @tap="onTap"
  >
    <View v-if="prepend || icon" class="kd-cell__prepend">
      <slot name="prepend" />
      <KdIcon v-if="icon" :type="icon" size="22" />
    </View>
    <View class="kd-cell__center">
      <slot />
      <View v-if="title" class="kd-cell__title">
        <Text overflow="ellipsis" :max-lines="2"> {{ title }} </Text>
      </View>
      <View v-if="desc" class="kd-cell__desc">
        <Text overflow="ellipsis">{{ desc }}</Text>
      </View>
    </View>
    <View v-if="append || note || arrow" :class="appendClass">
      <slot name="append" />
      <View v-if="note" class="kd-cell__note">
        <Text overflow="ellipsis">{{ note }}</Text>
      </View>
      <KdIcon v-if="arrow" type="arrow" size="18" />
    </View>
    <KdDivider />
  </View>
</template>

<script setup lang="ts">
import { computed } from '@minivue/core'
import KdIcon from './icon.vue'
import KdDivider from './divider.vue'
import { classObjectToString } from './utils'

defineOptions({
  name: 'KdCell',
  relations: {
    '../radio/radio': {
      type: 'descendant',
      linked: function (target: any) {
        // @ts-ignore
        this.onTap = target.onTap.bind(target)
      },
    },
    '../checkbox/checkbox': {
      type: 'descendant',
      linked: function (target: any) {
        // @ts-ignore
        this.onTap = target.onTap.bind(target)
      },
    },
  },
})

interface Props {
  /** 尺寸 */
  size?: 'm' | 's'
  /** 图标 */
  icon?: string
  /** 是否有箭头 */
  arrow?: boolean
  /** 标题呢人 */
  title?: string
  /** 右侧说明 */
  note?: string
  /** 描述 */
  desc?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否有前置元素 */
  prepend?: boolean
  /** 是否有后置元素 */
  append?: boolean
  /** 后置元素类型(因为不同元素内边距不一样，所有需要设置) */
  appendType?: 'normal' | 'switch' | 'icon' | 'avatar' | 'button' | 'text'
  /** 是否开启点击反馈 */
  hover?: boolean
}

const {
  size = 'm',
  hover = true,
  disabled,
  prepend,
  append,
  appendType = 'normal',
} = defineProps<Props>()

const classes = computed(() =>
  classObjectToString('kd-cell', `kd-cell--${size}`, {
    'kd-cell--disabled': disabled,
  }),
)

const appendClass = computed(() =>
  classObjectToString('kd-cell__append', `kd-cell__append--${appendType}`),
)

// eslint-disable-next-line
const onTap = () => {}
</script>

<style>
.kd-cell {
  position: relative;
  display: flex;
  align-items: center;
  align-self: stretch;
  padding-left: 16px;
}

.kd-cell::before {
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

.kd-cell--pressed::before {
  opacity: 1;
}

.kd-cell--disabled {
  pointer-events: none;
  opacity: 0.4;
}

.kd-cell__prepend {
  display: flex;
  flex-shrink: 0;
  gap: 10px;
  align-items: center;
  padding-right: 12px;
}

.kd-cell__center {
  box-sizing: border-box;
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  align-items: flex-start;
}

.kd-cell__title {
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

.kd-cell__desc {
  align-self: stretch;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base,);
  color: var(--kd-color-text-tertiary);
}

.kd-cell__append {
  display: flex;
  flex-shrink: 0;
  gap: 2px;
  align-items: center;
  justify-content: flex-end;
  color: var(--kd-color-text-tertiary);
}

.kd-cell__append--normal {
  padding: 11px 12px 11px 0;
}

.kd-cell__append--switch {
  padding: 8px 16px 8px 0;
}

.kd-cell__append--icon {
  padding-right: 5px;
}

.kd-cell__append--button {
  gap: 20px;
  padding-right: 4px;
}

.kd-cell__append--text {
  gap: 2px;
  padding: 11px 16px 11px 0;
}

.kd-cell__append--avatar {
  gap: 2px;
  height: 44px;
  padding-right: 12px;
}

.kd-cell__note {
  flex-shrink: 0;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base);
  text-align: right;
}

.kd-cell .kd-divider {
  position: absolute;
  right: 0;
  bottom: 0;
}

.kd-cell--s .kd-cell__center {
  padding: 10px 16px 10px 0;
}

.kd-cell--m .kd-cell__center {
  padding: 14px 16px 14px 0;
}

.kd-cell--s .kd-divider {
  left: 16px;
}

.kd-cell--m .kd-divider {
  left: 50px;
}

.kd-cell:last-child .kd-divider {
  display: none;
}

.kd-cell__append .kd-button--light {
  color: var(--kd-color-text-tertiary);
}
</style>

<config lang="json">
{
  "component": true
}
</config>
