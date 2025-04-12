<template>
  <View class="kd-label" @tap="onTap">
    <slot />
  </View>
</template>

<script setup lang="ts">
defineOptions({
  name: 'KdLabel',
  relations: {
    '../checkbox/checkbox': {
      type: 'descendant',
      linked: function (target: any) {
        // @ts-ignore
        this.onTap = target.onChange.bind(target)
      },
    },
    '../radio/radio': {
      type: 'descendant',
      linked: function (target: any) {
        // @ts-ignore
        this.onTap = target.onChange.bind(target)
      },
    },
  },
})

// eslint-disable-next-line
const onTap = () => {}
</script>

<style>
.kd-label {
  display: inline-flex;
}
</style>

<config lang="json">
{
  "component": true
}
</config>
