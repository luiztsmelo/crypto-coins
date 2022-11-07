<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useCoinStore } from '@/stores/coin'
import { tween } from 'shifty'

const coinStore = useCoinStore()

const props = defineProps({
  coin: { type: Object, required: true }
})

const coinPrice = ref(0)
const coin24hChange = ref(0)

watchEffect(() => {
  if (coinStore.coinsPrices) {
    // @ts-ignore
    coinPrice.value = coinStore.coinsPrices[props.coin.id].usd
    // @ts-ignore
    coin24hChange.value = coinStore.coinsPrices[props.coin.id].usd_24h_change

    setTimeout(() => animatePriceChange(), 150)
  }
})

const coinPriceFormatted = computed(() => {
  return coinPrice.value.toLocaleString('en', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: coinPrice.value > 0 && coinPrice.value < 1 ? 6 : 2
  })
})

const coin24hChangeFormatted = computed(() => {
  return coin24hChange.value.toFixed(2) + '%'
})

const coin24hChangeTextColor = computed(() => {
  if (coin24hChange.value > 0) return 'text-green-400'
  if (coin24hChange.value < 0) return 'text-red-400'

  return 'text-gray-600'
})

async function animatePriceChange () {
  const priceElements = document.querySelectorAll('#price')

  // @ts-ignore
  for (const priceElement of priceElements) {
    // @ts-expect-error: Lib bad behavior
    const { tweenable } = tween({
      render: ({ color }) => {
        // @ts-ignore
        priceElement.style.color = color
      },
      easing: 'easeInQuart',
      duration: 1300,
      from: { color: 'rgb(172, 172, 172)' }
    })

    tweenable.tween({
      to: { color: '#181818' }
    })
  }
}
</script>

<template lang="pug">
div(class="coin-card flex-column bg-white px-3 py-3 rounded-xl drop-shadow")
  div(class="grid grid-cols-[75px_1fr_75px] mb-1")
    img(class="w-7" :src="coin.image.small")

    p(class="text-lg font-bold text-center") {{ coin.name }}

    p(class="text-gray-400 text-right uppercase") {{ coin.symbol }}

  p#price(class="font-medium text-2xl text-center") {{ coinPriceFormatted }}

  p(:class="`font-bold text-md text-center transition duration-150 ease ${ coin24hChangeTextColor }`" v-if="!coinStore.date") {{ coin24hChangeFormatted }}
</template>
