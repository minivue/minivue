<template>
  <KdPage title="选项卡组件">
    <KdTabs :tabs="tabs" style="padding: 0 10px">
      <Text slot="tab1">总结汇报</Text>
      <Text slot="tab2">教学课件</Text>
      <Text slot="tab3">明细帐</Text>
      <Text slot="tab4">房屋出租合同</Text>
      <Text slot="tab5">其它乱七八糟</Text>
    </KdTabs>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdTabs from '@/components/tabs.vue'

const tabs = [
  {
    key: 'tab1',
    label: '总结汇报',
  },
  {
    key: 'tab2',
    label: '教学课件',
  },
  {
    key: 'tab3',
    label: '明细帐',
  },
  {
    key: 'tab4',
    label: '房屋出租合同',
  },
  {
    key: 'tab5',
    label: '其它乱七八糟',
  },
]
</script>

<config lang="json">
{
  "navigationBarTitleText": "选项卡组件",
  "disableScroll": true
}
</config>
