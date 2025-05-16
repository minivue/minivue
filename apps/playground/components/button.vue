<template>
  <Button :class="classes" :open-type="openType || ''" hover-class="kd-button--pressed">
    <KdLoading v-if="loading" class="kd-icon" :size="loadingSize" :mode="loadingMode" />
    <KdIcon v-else-if="icon" :type="icon" :size="iconSize" />
    <View v-if="!onlyIcon" class="kd-button__content">
      <Text
        overflow="ellipsis"
        style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
      >
        <slot />
      </Text>
      <KdIcon v-if="dropdown" type="dropdown" :size="iconSize" />
    </View>
  </Button>
</template>

<script setup lang="ts" generic="T extends boolean">
import { computed } from '@minivue/core'
import { classObjectToString } from './utils'
import KdIcon from './icon.vue'
import KdLoading from './loading.vue'

defineOptions({
  name: 'KdButton',
})

interface Props<T> {
  /** 是否ai按钮 */
  ai?: boolean
  /** 图标 */
  icon?: string
  /** 是否危险 */
  danger?: boolean
  /** 是否激活 */
  active?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 是否垂直 */
  vertical?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否仅图标 */
  onlyIcon?: T
  /** 是否下拉按钮 */
  dropdown?: boolean
  /** 是否强调 */
  highlight?: boolean
  /** 按钮尺寸(图标按钮才可以设置s) */
  size?: T extends true ? 'm' | 's' : 'm' | 'l' | 'xl'
  /** 按钮类型 */
  type?: 'primary' | 'secondary' | 'light'
  /**
   * 微信开放能力
   *
   * - contact: 打开客服会话，如果用户在会话中点击消息卡片后返回小程序，可以从 bindcontact 回调中获得具体信息，[具体说明](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/customer-message/customer-message.html)。鸿蒙 OS 暂不支持
   * - liveActivity: 通过前端获取[新的一次性订阅消息下发机制](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message-2.html)使用的 code
   * - share: 触发用户转发，使用前建议先阅读[使用指引](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share.html#%E4%BD%BF%E7%94%A8%E6%8C%87%E5%BC%95)
   * - getPhoneNumber: 手机号快速验证，向用户申请，并在用户同意后，快速填写和验证手机，[具体说明](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html) （*小程序插件中不能使用*）
   * - getRealtimePhoneNumber: 手机号实时验证，向用户申请，并在用户同意后，快速填写和实时验证手机号。[具体说明](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getRealtimePhoneNumber.html) （*小程序插件中不能使用*）
   * - getUserInfo: 获取用户信息，可以从bindgetuserinfo回调中获取到用户信息 （*小程序插件中不能使用*）
   * - launchApp: 打开APP，可以通过app-parameter属性设定向APP传的参数[具体说明](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/launchApp.html)。鸿蒙 OS 暂不支持
   * - openSetting: 打开授权设置页
   * - feedback: 打开“意见反馈”页面，用户可提交反馈内容并上传[日志](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/wx.getLogManager.html)，开发者可以登录小程序管理后台后进入左侧菜单“客服反馈”页面获取到反馈内容
   * - chooseAvatar: 获取用户头像，可以从bindchooseavatar回调中获取到头像信息
   * - agreePrivacyAuthorization: 用户同意隐私协议按钮。用户点击一次此按钮后，所有已声明过的隐私接口可以正常调用。可通过 bindagreeprivacyauthorization 监听用户同意隐私协议事件。隐私合规开发指南详情可见[《小程序隐私协议开发指南》](https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/PrivacyAuthorize.html)
   */
  openType?:
    | 'contact'
    | 'liveActivity'
    | 'share'
    | 'getPhoneNumber'
    | 'getRealtimePhoneNumber'
    | 'getUserInfo'
    | 'launchApp'
    | 'openSetting'
    | 'feedback'
    | 'chooseAvatar'
    | 'agreePrivacyAuthorization'
}

const {
  type = 'secondary',
  size = 'm',
  icon = '',
  ai,
  active,
  danger,
  loading,
  onlyIcon,
  vertical,
  disabled,
  dropdown,
  highlight,
} = defineProps<Props<T>>()

const buttonSize = computed(() => (vertical ? 'l' : size))

const buttonType = computed(() => (onlyIcon ? 'light' : type))

const iconSize = computed(() => {
  if (onlyIcon) {
    return buttonSize.value === 's' ? 18 : 22
  }
  return buttonSize.value === 'm' ? 18 : 22
})

const loadingSize = computed(() => (buttonSize.value === 'm' ? 's' : 'm'))

const loadingMode = computed(() => (type === 'primary' ? 'dark' : 'light'))

const classes = computed(() =>
  classObjectToString(`kd-button kd-button--${buttonType.value} kd-button--${buttonSize.value}`, {
    'kd-button--ai': ai,
    'kd-button--active': active,
    'kd-button--danger': danger,
    'kd-button--loading': loading,
    'kd-button--onlyicon': onlyIcon,
    'kd-button--vertical': vertical,
    'kd-button--disabled': disabled,
    'kd-button--dropdown': dropdown,
    'kd-button--highlight': highlight,
  }),
)
</script>

<style>
.kd-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto !important;
  overflow: visible;
  font-weight: 400;
  vertical-align: middle;
  border: none;
}

/* 点击热区限制最小要44px */
.kd-button::after {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 100%;
  min-width: 44px;
  height: var(--kd-button-hotspot, 44px);
  content: '';
  border: none;
  transform: translate(-50%, -50%);
}

.kd-button__content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.kd-button--primary {
  color: var(--kd-color-text-white);
  background-color: var(--kd-color-public-normal);
}

.kd-button--primary.kd-button--ai {
  background-color: var(--kd-color-ai-normal);
}

.kd-button--primary.kd-button--danger {
  background-color: var(--kd-color-error-normal);
}

.kd-button--secondary {
  color: var(--kd-color-text-primary);
  background-color: var(--kd-color-state-hover);
}

.kd-button--secondary.kd-button--highlight {
  color: var(--kd-color-text-public);
  background-color: var(--kd-color-state-pressed-public);
}

.kd-button--light {
  color: var(--kd-color-text-primary);
  background-color: transparent;
}

.kd-button--light.kd-button--highlight {
  color: var(--kd-color-text-public);
}

.kd-button--light.kd-button--danger {
  color: var(--kd-color-text-error);
}

.kd-button--primary.kd-button--pressed {
  background-color: var(--kd-color-public-pressed);
}

.kd-button--primary.kd-button--ai.kd-button--pressed {
  background-color: var(--kd-color-ai-pressed);
}

.kd-button--primary.kd-button--danger.kd-button--pressed {
  background-color: var(--kd-color-error-pressed);
}

.kd-button--secondary.kd-button--pressed {
  background-color: var(--kd-color-state-pressed);
}

.kd-button--secondary.kd-button--highlight.kd-button--pressed {
  background-color: rgba(var(--kd-color-blue-2), 1);
}

.kd-button--light.kd-button--pressed {
  background-color: var(--kd-color-state-pressed);
}

.kd-button--m {
  min-width: 56px;
  height: 32px;
  padding: 5px 12px;
  font-size: var(--kd-font-size-base);
  line-height: var(--kd-font-line-height-base);
  border-radius: 8px;
}

.kd-button--l {
  min-width: 64px;
  height: 40px;
  padding: 8px 16px;
  font-size: var(--kd-font-size-middle);
  line-height: var(--kd-font-line-height-middle);
  border-radius: 8px;
}

.kd-button--xl {
  min-width: 72px;
  height: 48px;
  padding: 12px 20px;
  font-size: var(--kd-font-size-middle);
  line-height: var(--kd-font-line-height-middle);
  border-radius: 12px;
}

.kd-button--m .kd-icon {
  margin-right: 6px;
}

.kd-button--l .kd-icon {
  margin-right: 8px;
}

.kd-button--xl .kd-icon {
  margin-right: 8px;
}

.kd-button.kd-button--onlyicon {
  padding: 0;
}

.kd-button--s.kd-button--onlyicon {
  min-width: 28px;
  min-height: 28px;
}

.kd-button--m.kd-button--onlyicon {
  min-width: 32px;
  min-height: 32px;
}

.kd-button--onlyicon .kd-icon {
  margin-right: 0;
}

.kd-button .kd-icon--dropdown {
  margin-right: 0;
  margin-left: 2px;
  transition: transform 0.3s;
}

.kd-button--vertical {
  flex-direction: column;
  min-width: 0 !important;
  height: auto !important;
  padding: 8px 4px 4px !important;
  font-size: 11px;
  line-height: 20px;
}

.kd-button--vertical .kd-icon {
  margin-right: 0;
  margin-bottom: 2px;
}

.kd-button--vertical .kd-button__content {
  width: 100%;
}

.kd-button--vertical.kd-button--dropdown {
  padding: 8px 2px 4px 4px !important;
}

.kd-button--vertical .kd-icon--dropdown {
  width: 14px !important;
  height: 14px !important;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
  font-size: 14px !important;
}

.kd-button--active .kd-icon--dropdown {
  transform: rotate(180deg);
}

.kd-button--loading,
.kd-button--disabled {
  pointer-events: none;
  opacity: 0.4;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
