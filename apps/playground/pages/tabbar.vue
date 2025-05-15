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
    <KdTabbar slot="bottom" />
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdTabbar from '@/components/tabbar.vue'
</script>

<config lang="json">
{
  "navigationBarTitleText": "标签栏组件",
  "disableScroll": true
}
</config>
