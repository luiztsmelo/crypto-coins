<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
</script>

<template lang="pug">
header(class="flex items-center justify-center my-12")
  AppLogo

main
  RouterView
</template>
