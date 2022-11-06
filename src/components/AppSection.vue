<script setup lang="ts">
const props = defineProps({
  label: { type: String, required: true, default: 'Label' },
  highlight: { type: String, required: false }
})
</script>

<template lang="pug">
section
  div(class="flex items-center mb-3")
    span(class="font-bold text-2xl mr-3") {{ props.label }}

    span(class="text-sm font-bold text-blue-900 uppercase" v-if="props.highlight") {{ props.highlight }}

  slot
</template>
