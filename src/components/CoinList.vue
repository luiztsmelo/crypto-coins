<script setup lang="ts">
import { watch } from 'vue'
import type { PropType } from 'vue'
import { useCoinStore } from '@/stores/coin'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import CoinCard from '@/components/CoinCard.vue'

const coinStore = useCoinStore()

const props = defineProps({
  coins: { type: Array as PropType<string[]>, required: true }
})

coinStore.getCoinsData(props.coins)
coinStore.getCoinsPrices(props.coins)

setInterval(() => {
  if (!coinStore.date) coinStore.getCoinsPrices(props.coins)
}, 10000)

watch(() => coinStore.date, date => {
  if (date) coinStore.getCoinsHistoryPrices(props.coins)
})
</script>

<template lang="pug">
LoadingSpinner(v-if="coinStore.coinsData.length === 0 || !coinStore.coinsPrices && coinStore.loading.getCoinsData")

div(class="coin-list grid grid-cols-1 md:grid-cols-3 align-center justify-center gap-5" v-if="coinStore.coinsData.length > 0 && coinStore.coinsPrices && !coinStore.loading.getCoinsData")
  CoinCard(v-for="coin in coinStore.coinsData" :coin="coin")
</template>
