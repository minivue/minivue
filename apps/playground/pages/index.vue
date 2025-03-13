<template>
  <View class="p-index">
    <Text user-select>{{ message }}</Text>
    <KdButton :obj="obj" @tap="onTap">按钮</KdButton>
  </View>
</template>

<script setup lang="ts">
import { KdButton } from '@minivue/ui'
import { onLoad, ref } from '@minivue/core'
interface Props {
  title: string
  count: number
  isActive: boolean
}

const props = withDefaults(defineProps<Props>(), { isActive: false })

console.log('props', props.isActive)

const obj = ref({ inner: { msg: 1 } })
const message = 'Hello World'
setInterval(() => {
  obj.value.inner.msg++
}, 1000)

function onTap() {
  console.log('onTap')
  wx.navigateTo({
    url: '/libs/index/index',
  })
}

onLoad(() => {
  import('../libs/utils/helper').then((res) => {
    res.helper()
  })
  // requirePlugin('account', (account) => {
  //   console.log(account.getAccountCookie())
  // })
})
</script>

<style>
.p-index {
  padding-top: 60px;
}
</style>

<config lang="json">
{
  "navigationBarTitleText": "首页"
}
</config>
