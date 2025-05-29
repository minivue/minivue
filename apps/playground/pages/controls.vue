<template>
  <KdPage title="控制组件">
    <View style="padding: 16px">
      <KdSwitch @change="onChange" />
      <KdSwitch @change="onChange" disabled />
      <KdSwitch @change="onChange" checked />
      <KdSwitch @change="onChange" checked disabled />
    </View>
    <View style="padding: 16px">
      <KdCheckboxGroup :value="checkList" @change="onCheckChange">
        <KdLabel style="display: flex"> <KdCheckbox master /> 全选 </KdLabel>
        <KdLabel style="display: flex"> <KdCheckbox :value="1" /> 选项1 </KdLabel>
        <KdLabel style="display: flex"> <KdCheckbox :value="2" /> 选项2 </KdLabel>
        <KdLabel style="display: flex"> <KdCheckbox :value="3" disabled /> 选项3 </KdLabel>
        <KdLabel style="display: flex"> <KdCheckbox :value="4" /> 选项4 </KdLabel>
      </KdCheckboxGroup>
    </View>
    <View style="padding: 16px">
      <KdRadio />
      <KdRadio disabled />
      <KdRadio checked />
      <KdRadio checked disabled />
      <KdRadioGroup @change="onRadioChange">
        <KdLabel style="display: flex"> <KdRadio :value="1" /> 选项1 </KdLabel>
        <KdLabel style="display: flex"> <KdRadio :value="2" /> 选项2 </KdLabel>
        <KdLabel style="display: flex"> <KdRadio :value="3" disabled /> 选项3 </KdLabel>
        <KdLabel style="display: flex"> <KdRadio :value="4" /> 选项4 </KdLabel>
      </KdRadioGroup>
    </View>
    <View style="padding: 16px">
      <KdRadio mark checked />
      <KdRadio mark checked disabled />
      <KdRadioGroup @change="onRadioChange">
        <KdLabel style="display: flex"> <KdRadio :value="1" mark /> 选项1 </KdLabel>
        <KdLabel style="display: flex"> <KdRadio :value="2" mark /> 选项2 </KdLabel>
        <KdLabel style="display: flex"> <KdRadio :value="3" mark disabled /> 选项3 </KdLabel>
        <KdLabel style="display: flex"> <KdRadio :value="4" mark /> 选项4 </KdLabel>
      </KdRadioGroup>
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdLabel from '@/components/label.vue'

import KdSwitch from '@/components/switch.vue'
import KdRadio from '@/components/radio.vue'
import KdRadioGroup from '@/components/radio-group.vue'
import KdCheckbox from '@/components/checkbox.vue'
import KdCheckboxGroup from '@/components/checkbox-group.vue'
import { ref } from '@minivue/core'

const checkList = ref<number[]>([1, 2])

const onChange = (value: boolean) => {
  console.log('onChange:', value)
}

const onRadioChange = (value: number) => {
  console.log('onRadioChange:', value)
}

const onCheckChange = (value: number[]) => {
  console.log('onCheckChange:', value)
  checkList.value = value
}
const checked = ref(false)
setTimeout(() => {
  checked.value = true
}, 2000)

setTimeout(() => {
  checkList.value = [1, 2, 4]
}, 1000)
</script>

<config lang="json">
{
  "navigationBarTitleText": "控制组件",
  "disableScroll": true
}
</config>
