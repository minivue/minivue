<template>
  <View :class="classes" @tap="onTap">
    <View class="kd-input__prefix">
      <slot name="prefix" />
    </View>
    <View class="kd-input__inner">
      <Input
        class="kd-input__text"
        :value="value || ''"
        :type="type"
        :password="password"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :cursor-spacing="cursorSpacing || 18"
        :adjust-position="true"
        :focus="innerFocus"
        :confirm-type="confirmType"
        cursor-color="#1E5FC7"
        hold-keyboard
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        @keyboardheightchange="onKeyboardHeightChange"
      />
    </View>
    <View class="kd-input__suffix">
      <KdButton
        v-if="clearable"
        icon="clear"
        size="s"
        only-icon
        @tap="onClearTap"
        :style="clearStyle"
      />
      <slot name="suffix" />
    </View>
    <View v-if="tips" class="kd-input__tips">{{ tips }}</View>
  </View>
</template>

<script setup lang="ts">
import KdButton from './button.vue'
import { computed, ref } from '@minivue/core'
import { classObjectToString, setKeyboardHeight, styleObjectToString } from '../utils'

interface Props {
  /** 输入框的初始内容 */
  value?: string
  /** 输入框下方的提示信息 */
  tips?: string
  /** 输入框尺寸 */
  size?: 'm' | 'l' | 'xl'
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
  /** 是否显示清除图标 */
  clearable?: boolean
  /** 设置键盘右下角按钮的文字，仅在type='text'时生效 */
  confirmType?: 'send' | 'search' | 'next' | 'go' | 'done'
  /** 报错 */
  error?: boolean
  /** 是否圆角 */
  rounded?: boolean
  /** 是否只读 */
  readonly?: boolean
}

interface Events {
  focus: [e: WechatMiniprogram.InputFocus]
  blur: [e: WechatMiniprogram.InputBlur]
  input: [e: WechatMiniprogram.Input]
  clear: []
}

defineOptions({
  name: 'KdInput',
})

const emit = defineEmits<Events>()

const {
  size = 'm',
  type = 'text',
  placeholder = '',
  confirmType = 'done',
  error,
  focus,
  white,
  rounded,
  readonly,
  disabled,
  maxlength = 140,
} = defineProps<Props>()

const innerValue = ref('')
const innerFocus = ref(focus)

const classes = computed(() =>
  classObjectToString(`kd-input kd-input--${size}`, {
    'kd-input--white': white,
    'kd-input--focus': innerFocus.value,
    'kd-input--error': error,
    'kd-input--rounded': rounded,
    'kd-input--readonly': readonly,
    'kd-input--disabled': disabled,
  }),
)

const clearStyle = computed(() =>
  styleObjectToString({
    opacity: innerValue.value ? 0.35 : 0,
  }),
)

const onTap = () => {
  innerFocus.value = true
}

const onInput = (e: WechatMiniprogram.Input) => {
  innerValue.value = e.detail.value
  emit('input', e)
}

const onFocus = (e: WechatMiniprogram.InputFocus) => {
  innerFocus.value = true
  emit('focus', e)
}

const onBlur = (e: WechatMiniprogram.InputBlur) => {
  setKeyboardHeight(0)
  innerFocus.value = false
  emit('blur', e)
}

const onClearTap = () => {
  innerValue.value = ''
  emit('clear')
}

const onKeyboardHeightChange = (e: WechatMiniprogram.CustomEvent) => {
  setKeyboardHeight(e.detail.height)
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

.kd-input::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  content: '';
  border: 1px solid var(--kd-color-line-public);
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.2s;
}

.kd-input--m {
  height: 36px;
}

.kd-input--l {
  height: 40px;
}

.kd-input--xl {
  height: 48px;
  border-radius: 12px;
}

.kd-input--error::after {
  border-color: var(--kd-color-line-error);
}

.kd-input--disabled {
  pointer-events: none;
  opacity: 0.4;
}

.kd-input--readonly {
  pointer-events: none;
}

.kd-input--rounded {
  border-radius: 24px;
}

.kd-input--white {
  background: var(--kd-color-background-middle);
}

.kd-input--focus::after {
  opacity: 1;
}

.kd-input__inner {
  flex: 1;
  padding: 0 12px;
}

.kd-input--m .kd-input__inner {
  padding: 0 8px;
}

.kd-input__text {
  flex: 1;
  height: 24px;
  font-size: var(--kd-font-size-middle);
  line-height: var(--kd-font-line-height-middle);
  color: var(--kd-color-text-primary);
}

.kd-input__prefix {
  display: flex;
  align-items: center;
  padding-left: 12px;
}

.kd-input__suffix {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
}

.kd-input__prefix:empty,
.kd-input__suffix:empty {
  display: none;
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
