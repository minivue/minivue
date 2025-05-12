<template>
  <KdPage title="文本输入框组件">
    <View style="padding: 16px">
      <KdInput
        placeholder="请输入文本"
        tips="辅助文本"
        :value="value"
        @input="onInput"
        @clear="onClear"
      />
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="请输入文本"
        tips="辅助文本"
        :value="value"
        size="l"
        @input="onInput"
        @clear="onClear"
      />
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="请输入文本"
        tips="辅助文本"
        :value="value"
        size="l"
        disabled
        @input="onInput"
        @clear="onClear"
      />
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="请输入文本"
        tips="辅助文本"
        :value="value"
        white
        @input="onInput"
        @clear="onClear"
      />
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="请输入文本"
        tips="辅助文本"
        :value="value"
        size="l"
        white
        @input="onInput"
        @clear="onClear"
      />
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="请输入文本"
        tips="辅助文本"
        :value="value"
        size="l"
        white
        disabled
        @input="onInput"
        @clear="onClear"
      />
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdInput from '@/components/input.vue'

import { ref } from '@minivue/core'

const value = ref('')

const onInput = (e: WechatMiniprogram.Input) => {
  value.value = e.detail.value
}

const onClear = () => {
  value.value = ''
}
</script>

<config lang="json">
{
  "navigationBarTitleText": "文本输入框组件",
  "disableScroll": true
}
</config>
