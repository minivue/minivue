<template>
  <KdPage title="文本输入框组件">
    <View style="padding: 16px">
      <KdInput
        placeholder="请输入文本"
        tips="辅助文本"
        :value="value"
        clearable
        focus
        @input="onInput"
        @clear="onClear"
      >
        <KdIcon type="search" slot="prefix" />
      </KdInput>
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="请输入文本"
        tips="辅助文本"
        :value="value"
        clearable
        focus
        error
        @input="onInput"
        @clear="onClear"
      >
        <KdIcon type="search" slot="prefix" />
      </KdInput>
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="请输入文本"
        tips="辅助文本"
        :value="value"
        clearable
        rounded
        @input="onInput"
        @clear="onClear"
      >
        <KdIcon type="search" slot="prefix" />
      </KdInput>
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="请输入文本"
        tips="辅助文本"
        :value="value"
        @input="onInput"
        @clear="onClear"
      >
        <KdIcon type="info" slot="prefix" />
        <KdIcon type="warning" slot="suffix" />
      </KdInput>
    </View>
    <!-- <View style="padding: 16px">
      <KdInput
        placeholder="请输入文本"
        tips="辅助文本"
        :value="value"
        size="l"
        clearable
        @input="onInput"
        @clear="onClear"
      />
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="请输入文本"
        tips="辅助文本"
        value="禁用输入框"
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
        value="只读输入框"
        size="l"
        readonly
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
        white
        disabled
        @input="onInput"
        @clear="onClear"
      />
    </View> -->
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdIcon from '@/components/icon.vue'
import KdInput from '@/components/input.vue'
import { ref } from '@minivue/core'

const value = ref('')

const onInput = (e: WechatMiniprogram.Input) => {
  console.log('onInput', e.detail.value)
  value.value = e.detail.value
}

const onClear = () => {
  console.log('onClear')
  value.value = ''
}
</script>

<config lang="json">
{
  "navigationBarTitleText": "文本输入框组件",
  "disableScroll": true
}
</config>
