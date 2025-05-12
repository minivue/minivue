<template>
  <View :class="classes">
    <View class="kd-input__inner">
      <Input
        class="kd-input__text"
        :value="value"
        :type="type"
        :password="password"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :cursor-spacing="cursorSpacing"
        :focus="focus"
        :confirm-type="confirmType"
        cursor-color="#1E5FC7"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
      />
    </View>
    <View v-if="value" class="kd-input__clear">
      <KdButton icon="clear" size="s" only-icon @tap="onClearTap"></KdButton>
    </View>
    <View v-if="tips" class="kd-input__tips">{{ tips }}</View>
  </View>
</template>

<script setup lang="ts">
import KdButton from './button.vue'
import { computed, ref } from '@minivue/core'
import { classObjectToString } from './utils'

interface Props {
  /** 输入框的初始内容 */
  value?: string
  /** 输入框下方的提示信息 */
  tips?: string
  /** 输入框尺寸 */
  size?: 'm' | 'l'
  /** 白色背景 */
  white?: boolean
  /** input 的类型 */
  type?: 'text' | 'number' | 'idcard' | 'digit' | 'safe-password' | 'nickname'
  /** 是否是密码类型 */
  password?: boolean
  /** 输入框为空时占位符 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 最大输入长度，设置为 -1 的时候不限制最大长度 */
  maxlength?: number
  /** 指定光标与键盘的距离，取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离 */
  cursorSpacing?: number
  /** 获取焦点 */
  focus?: boolean
  /** 设置键盘右下角按钮的文字，仅在type='text'时生效 */
  confirmType?: 'send' | 'search' | 'next' | 'go' | 'done'
}

interface Events {
  focus: [e: WechatMiniprogram.InputFocus]
  blur: [e: WechatMiniprogram.InputBlur]
  input: [e: WechatMiniprogram.Input]
  clear: []
}

const emit = defineEmits<Events>()

const { size = 'm', focus, white, disabled } = defineProps<Props>()

const innerFocus = ref(false)

const classes = computed(() =>
  classObjectToString(`kd-input kd-input--${size}`, {
    'kd-input--white': white,
    'kd-input--focus': innerFocus.value,
    'kd-input--disabled': disabled,
  }),
)

const onInput = (e: WechatMiniprogram.Input) => {
  emit('input', e)
}

const onFocus = (e: WechatMiniprogram.InputFocus) => {
  innerFocus.value = true
  emit('focus', e)
}

const onBlur = (e: WechatMiniprogram.InputBlur) => {
  innerFocus.value = false
  emit('blur', e)
}

const onClearTap = () => {
  emit('clear')
}
</script>

<style>
.kd-input {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--kd-color-state-hover);
  border-radius: 8px;
}

.kd-input--disabled {
  pointer-events: none;
  opacity: 0.4;
}

.kd-input--l {
  height: 48px;
  border-radius: 12px;
}

.kd-input--white {
  background: var(--kd-color-background-middle);
}

.kd-input--focus::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  border: 1px solid var(--kd-color-line-public);
  border-radius: inherit; /* 继承父元素圆角 */
}

.kd-input__inner {
  flex: 1;
  padding: 8px 12px;
}

.kd-input__text {
  flex: 1;
  height: 24px;
  font-size: var(--kd-font-size-middle);
  line-height: var(--kd-font-line-height-middle);
  color: var(--kd-color-text-primary);
}

.kd-input__clear {
  display: flex;
  align-items: center;
  width: 40px;
  opacity: 0.35;
}

.kd-input__tips {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 2px;
  font-size: var(--kd-font-size-small);
  line-height: var(--kd-font-line-height-small);
  color: var(--kd-color-text-secondary);
}
</style>

<config lang="json">
{
  "component": true
}
</config>
