<template>
  <input v-model="value" />
</template>

<script setup lang="ts">
interface Props {
  value?: string
}

const { value } = defineProps<Props>()
</script>

<config lang="json">
{
  "component": true
}
</config>
