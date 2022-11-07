<script setup lang="ts">
import { computed } from 'vue'
import { useCoinStore } from '@/stores/coin'
import AppSection from '@/components/AppSection.vue'
import HistoryPrice from '@/components/HistoryPrice.vue'
import CoinList from '@/components/CoinList.vue'
import dayjs from 'dayjs'

const coinStore = useCoinStore()

const dateFormatted = computed(() => {
  return dayjs(coinStore.date).format('dddd, MMMM D, YYYY')
})
</script>

<template lang="pug">
div(class="mx-4 mb-4 lg:mx-60")
  AppSection(label="History price")
    HistoryPrice

  AppSection(label="Coins" :highlight="coinStore.date ? dateFormatted : 'Real-Time'" class="mt-8")
    CoinList(:coins="coinStore.coinsList")
</template>
