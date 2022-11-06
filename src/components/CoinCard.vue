<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useCoinStore } from '@/stores/coin'
import { tween } from 'shifty'

const coinStore = useCoinStore()

const props = defineProps({
  coin: { type: Object, required: true }
})

const coinPrice = ref(0)

const coinPriceFormatted = computed(() => {
  return coinPrice.value.toLocaleString('en', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 3
  })
})

async function animatePrice () {
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
      duration: 1200,
      from: { color: 'rgb(162, 162, 162)' }
    })

    tweenable.tween({
      to: { color: '#181818' }
    })
  }
}

watchEffect(() => {
  if (coinStore.coinsPrices) {
    // @ts-ignore
    coinPrice.value = coinStore.coinsPrices[props.coin.id].usd

    console.log(coinPrice.value)

    setTimeout(() => animatePrice(), 150)
  }
})
</script>

<template lang="pug">
div(class="flex-column bg-white px-4 py-4 rounded-xl")
  div(class="grid grid-cols-[75px_1fr_75px] mb-2")
    img(class="w-7" :src="coin.image.small")

    p(class="text-lg font-bold text-center") {{ coin.name }}

    p(class="text-gray-400 text-right uppercase") {{ coin.symbol }}

  p#price(class="font-medium text-2xl text-center") {{ coinPriceFormatted }}
</template>
