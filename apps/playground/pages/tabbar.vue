<template>
  <KdPage title="标签栏组件">
    <View style="height: 100px; background-color: lightblue"></View>
    <View style="height: 100px; background-color: lightcoral"></View>
    <View style="height: 100px; background-color: lightcyan"></View>
    <View style="height: 100px; background-color: lightgray"></View>
    <View style="height: 100px; background-color: lightblue"></View>
    <View style="height: 100px; background-color: lightcoral"></View>
    <View style="height: 100px; background-color: lightcyan"></View>
    <View style="height: 100px; background-color: lightgray"></View>
    <View style="height: 100px; background-color: lightblue"></View>
    <View style="height: 100px; background-color: lightcoral"></View>
    <View style="height: 100px; background-color: lightcyan"></View>
    <View style="height: 100px; background-color: lightgray"></View>
    <KdTabbar :items="items" slot="bottom" />
  </KdPage>
</template>

<script setup lang="ts">
import { KdPage, KdTabbar } from '@minivue/ui'

const items = [
  {
    key: 'dialog',
    icon: 'dialog',
    text: '首页',
    active: true,
  },
  {
    key: 'all',
    icon: 'all',
    text: '搜索',
  },
  {
    key: 'url',
    icon: 'url',
    text: '购物车',
  },
  {
    key: 'note',
    icon: 'note',
    text: '我的',
  },
  {
    key: 'pic',
    icon: 'pic',
    text: '图片',
  },
]
</script>

<config lang="json">
{
  "navigationBarTitleText": "标签栏组件",
  "disableScroll": true
}
</config>
