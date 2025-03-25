<template>
  <KdPage title="WPS灵犀" :actions="[{ icon: 'menu', action: 'menu' }]" @action="onActionTap">
    <View style="padding: 16px">
      <KdSwitch @change="onChange" />
      <KdSwitch @change="onChange" disabled />
      <KdSwitch @change="onChange" checked />
      <KdSwitch @change="onChange" checked disabled />
    </View>
    <View style="padding: 16px">
      <KdCheckbox @change="onChange" />
      <KdCheckbox @change="onChange" disabled />
      <KdCheckbox @change="onChange" checked />
      <KdCheckbox @change="onChange" indeterminate />
      <KdCheckbox @change="onChange" checked disabled />
      <KdCheckbox @change="onChange" indeterminate disabled />
    </View>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdSwitch from '@/components/switch.vue'
import KdCheckbox from '@/components/checkbox.vue'

const onActionTap = (action: string) => {
  console.log('onActionTap:', action)
  wx.navigateTo({
    url: '/pages/button/button',
  })
}

const onChange = (value: boolean) => {
  console.log('onChange:', value)
}
</script>

<config lang="json">
{
  "navigationBarTitleText": "WPS灵犀",
  "disableScroll": true
}
</config>
