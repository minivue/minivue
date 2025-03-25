<template>
  <KdPage title="WPS灵犀" :actions="[{ icon: 'menu', action: 'menu' }]" @action="onActionTap">
    <View style="padding: 16px">
      <KdSwitch @change="onChange" />
      <KdSwitch @change="onChange" disabled />
      <KdSwitch @change="onChange" checked />
      <KdSwitch @change="onChange" checked disabled />
    </View>
    <View style="padding: 16px">
      <KdCheckboxGroup @change="onCheckChange">
        <KdCheckbox value="1" />
        <KdCheckbox value="2" checked />
        <KdCheckbox value="3" disabled />
        <KdCheckbox value="4" checked disabled />
      </KdCheckboxGroup>
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdSwitch from '@/components/switch.vue'
import KdCheckbox from '@/components/checkbox.vue'
import KdCheckboxGroup from '@/components/checkbox-group.vue'

const onActionTap = (action: string) => {
  console.log('onActionTap:', action)
  wx.navigateTo({
    url: '/pages/button/button',
  })
}

const onChange = (value: boolean) => {
  console.log('onChange:', value)
}

const onCheckChange = (value: string[]) => {
  console.log('onCheckChange:', value)
}
</script>

<config lang="json">
{
  "navigationBarTitleText": "WPS灵犀",
  "disableScroll": true
}
</config>
