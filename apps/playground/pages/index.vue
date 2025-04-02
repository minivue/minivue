<template>
  <KdPage title="WPS灵犀" :actions="[{ icon: 'menu', action: 'menu' }]" @action="onActionTap">
    <View style="padding: 16px">
      <KdSwitch @change="onChange" />
      <KdSwitch @change="onChange" disabled />
      <KdSwitch @change="onChange" checked />
      <KdSwitch @change="onChange" checked disabled />
    </View>
    <View style="padding: 16px">
      <KdCheckboxGroup :value="checkList" @change="onCheckChange">
        <KdCheckbox value="1" />
        <KdCheckbox value="2" checked />
        <KdCheckbox value="3" disabled />
        <KdCheckbox value="4" checked disabled />
      </KdCheckboxGroup>
      <KdCheckbox value="2" :checked="checked" />
    </View>
    <View style="padding: 16px"> <KdInput v-model="value" />{{ value }} </View>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdInput from '@/components/input.vue'
import KdSwitch from '@/components/switch.vue'
import KdCheckbox from '@/components/checkbox.vue'
import KdCheckboxGroup from '@/components/checkbox-group.vue'
import { ref } from '@minivue/core'

const value = ref('哈哈')
const checkList = ref<number[]>([])

const onActionTap = (action: string) => {
  console.log('onActionTap:', action)
  wx.navigateTo({
    url: '/pages/button/button',
  })
}

const onChange = (value: boolean) => {
  console.log('onChange:', value)
}

const onCheckChange = (value: number[]) => {
  console.log('onCheckChange:', value)
  checkList.value = value
}
const checked = ref(false)
setTimeout(() => {
  checked.value = true
}, 1000)

setTimeout(() => {
  checkList.value = [1, 2, 3, 4]
}, 1000)

// watch(
//   () => checkList.value,
//   (newValue) => {
//     console.log('checkList.value:', newValue)
//   },
// )
</script>

<config lang="json">
{
  "navigationBarTitleText": "WPS灵犀",
  "disableScroll": true
}
</config>
