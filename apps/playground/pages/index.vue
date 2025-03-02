<template>
  <div class="index">
    <button :test="test" @tap="onTap">{{ demo }}</button>
    <template v-if="test === 'test'">
      <div>test</div>
    </template>
    <template v-else-if="test === 'abc'">
      <div>test</div>
    </template>
    <template v-else>
      <div>test</div>
    </template>
    <div v-for="(obj, idx) in array" :key="obj.id" style="font-weight: bold; color: #000">
      {{ idx }}:{{ obj.name }}
    </div>
    <div>{{ test + demo }}</div>
    <div>{{ test + ' dd ' + demo }}</div>
    <div>{{ time }}</div>
  </div>
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
