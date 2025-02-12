<template>
  <nuxt-link to="/about">test</nuxt-link>
  <div class="index">
    <button :test="test" @click="onTap">{{ demo }}</button>
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
import { definePage, ref } from '@minivue/core'
import { onMounted } from 'vue'
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
    function onTap() {
      console.log('onTap')
    }
    onMounted(() => {
      console.log('onMounted')
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
.index {
  font-size: large;
  color: red;
}
</style>

<config lang="json">
{
  "navigationBarTitleText": "首页"
}
</config>
