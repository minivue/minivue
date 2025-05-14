<template>
  <KdPage title="文本输入框组件">
    <View style="padding: 16px">
      <KdInput
        placeholder="请输入文本"
        :value="value"
        clearable
        focus
        @input="onInput"
        @clear="onClear"
      >
      </KdInput>
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="请输入文本"
        tips="辅助文本"
        :value="value"
        clearable
        @input="onInput"
        @clear="onClear"
      >
      </KdInput>
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="前置图标示例"
        tips="辅助文本"
        :value="value"
        clearable
        @input="onInput"
        @clear="onClear"
      >
        <KdIcon type="search" slot="prefix" />
      </KdInput>
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="后置图标示例"
        tips="辅助文本"
        :value="value"
        @input="onInput"
        @clear="onClear"
      >
        <KdIcon type="warning" slot="suffix" />
      </KdInput>
    </View>
    <View style="padding: 16px">
      <KdInput
        placeholder="内容错误示例"
        tips="辅助文本"
        :value="value"
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
        placeholder="禁用示例"
        tips="辅助文本"
        :value="value"
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
        :value="value"
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
        :value="value"
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
        :value="value"
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
