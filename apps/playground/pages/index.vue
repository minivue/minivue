<template>
  <View class="index">
    <Button :test="test" @tap="onTap">{{ demo }}</Button>
    <Block v-if="test === 'test'">
      <View>test</View>
    </Block>
    <Block v-else-if="test === 'abc'">
      <View>test</View>
    </Block>
    <Block v-else>
      <View>test</View>
    </Block>
    <View v-for="(obj, idx) in array" :key="obj.id" style="font-weight: bold; color: #000">
      {{ idx }}:{{ obj.name }}
    </View>
    <View>{{ test + demo }}</View>
    <View>{{ test + ' dd ' + demo }}</View>
    <View>{{ time }}</View>
  </View>
</template>

<script lang="ts">
import { definePage, ref, onShow, onHide, onLoad } from '@minivue/core'
export default definePage({
  setup() {
    const array: Record<string, string>[] = [
      {
        id: '1',
        name: 'name1',
      },
      {
        id: '2',
        name: 'name2',
      },
    ]
    const test = ref('什么鬼')
    const time = ref('')
    const demo = 'demo'
    function onTap(e: WechatMiniprogram.BaseEvent) {
      test.value = 'fuck'
      console.log('onTap:', e)
    }

    onLoad(() => {
      console.warn('onPageLoad')
    })

    onShow(() => {
      console.warn('onPageShow')
    })

    onHide(() => {
      console.warn('onPageHide')
    })

    return {
      array,
      test,
      demo,
      time,
      onTap,
    }
  },
})
</script>

<style>
page {
  font-size: 16px;
  color: red;
}
</style>

<config lang="json">
{
  "navigationBarTitleText": "首页"
}
</config>
