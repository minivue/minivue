<template>
  <KdPage title="文本输入框组件">
    <View style="padding: 16px">
      <KdInput
        placeholder="请输入文本"
        clearable
        focus
        :value="value"
        @input="onInput"
        @clear="onClear"
      >
      </KdInput>
    </View>
    <View style="padding: 16px">
      <KdInput placeholder="请输入文本" tips="辅助文本" clearable @input="onInput" @clear="onClear">
      </KdInput>
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="前置图标示例"
        tips="辅助文本"
        clearable
        @input="onInput"
        @clear="onClear"
      >
        <KdIcon type="search" slot="prefix" />
      </KdInput>
    </View>
    <View style="padding: 16px">
      <KdInput placeholder="后置图标示例" tips="辅助文本" @input="onInput" @clear="onClear">
        <KdIcon type="warning" slot="suffix" />
      </KdInput>
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="内容错误示例"
        tips="辅助文本"
        error
        clearable
        @input="onInput"
        @clear="onClear"
      >
        <KdIcon type="search" slot="prefix" />
      </KdInput>
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="只读示例"
        tips="辅助文本"
        value="只读示例"
        readonly
        @input="onInput"
        @clear="onClear"
      >
        <KdLoading slot="suffix" />
      </KdInput>
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="请输入文本"
        tips="辅助文本"
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
        placeholder="禁用示例"
        tips="辅助文本"
        clearable
        disabled
        @input="onInput"
        @clear="onClear"
      >
        <KdIcon type="search" slot="prefix" />
      </KdInput>
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="白底输入框"
        tips="辅助文本"
        clearable
        rounded
        white
        @input="onInput"
        @clear="onClear"
      >
        <KdIcon type="search" slot="prefix" />
      </KdInput>
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="大尺寸"
        size="l"
        tips="辅助文本"
        clearable
        @input="onInput"
        @clear="onClear"
      >
        <KdIcon type="search" slot="prefix" />
      </KdInput>
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="超大尺寸"
        size="xl"
        tips="辅助文本"
        clearable
        @input="onInput"
        @clear="onClear"
      >
        <KdIcon type="search" slot="prefix" />
      </KdInput>
    </View>
    <View style="height: 30px"></View>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdIcon from '@/components/icon.vue'
import KdInput from '@/components/input.vue'
import KdLoading from '@/components/loading.vue'
import { ref, onLoad } from '@minivue/core'

const value = ref('')

const onInput = (e: WechatMiniprogram.Input) => {
  console.log('onInput', e.detail.value)
}

const onClear = () => {
  console.log('onClear')
}

onLoad(() => {
  setTimeout(() => {
    value.value = '默认值'
  }, 1000)
})
</script>

<config lang="json">
{
  "navigationBarTitleText": "文本输入框组件",
  "disableScroll": true
}
</config>
