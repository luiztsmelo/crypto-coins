import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const useCoinStore = defineStore('coin', () => {
  const coinsData = reactive([])
  const coinsPrices = ref(null)

  const date = ref('')

  const loading = reactive({
    getCoinsData: false
  })

  async function getCoinsData (coins: string[]) {
    try {
      loading.getCoinsData = true

      const promises = []

      for (const coinId of coins) {
        promises.push(fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, { method: 'GET' }))
      }

      const promisesRes = await Promise.all(promises)

      for (const res of promisesRes) {
        const data = await res.json()
        // @ts-ignore
        coinsData.push(data)
      }

      console.log(coinsData)
    } catch (error) {
      console.error(error)
    } finally {
      loading.getCoinsData = false
    }
  }

  async function getCoinsPrices (coins: string[]) {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&precision=full`, {
        method: 'GET',
        cache: 'no-cache'
      })

      const data = await response.json()

      console.log(data)

      coinsPrices.value = data
    } catch (error) {
      console.error(error)
    }
  }

  async function getCoinsHistoryPrices (coins: string[]) {
    try {
      const promises = []

      const dateFormatted = dayjs(date.value).format('DD-MM-YYYY')

      for (const coinId of coins) {
        promises.push(fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${dateFormatted}`, { method: 'GET' }))
      }

      const promisesRes = await Promise.all(promises)

      for (const res of promisesRes) {
        const data = await res.json()

        // @ts-ignore
        if (coinsPrices.value) coinsPrices.value[data.id].usd = data.market_data.current_price.usd
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    coinsData,
    coinsPrices,
    date,
    loading,
    getCoinsData,
    getCoinsPrices,
    getCoinsHistoryPrices
  }
})
