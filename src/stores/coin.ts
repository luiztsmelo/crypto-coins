import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const useCoinStore = defineStore('coin', () => {
  const coinsList = ['bitcoin', 'dacxi', 'ethereum', 'cosmos', 'terra-luna-2']

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
        promises.push(fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
          method: 'GET'
        }))
      }

      const promisesRes = await Promise.all(promises)

      for (const res of promisesRes) {
        const data = await res.json()
        // @ts-ignore
        coinsData.push(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      loading.getCoinsData = false
    }
  }

  async function getCoinsPrices (coins: string[]) {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&precision=full&include_24hr_change=true`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'cache-control': 'no-cache'
        }
      })

      const data = await response.json()

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
        promises.push(fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${dateFormatted}`, {
          method: 'GET',
          cache: 'no-cache'
        }))
      }

      const promisesRes = await Promise.all(promises)

      for (const res of promisesRes) {
        const data = await res.json()

        if (coinsPrices.value) {
          // @ts-ignore
          coinsPrices.value[data.id].usd = data.market_data !== undefined ? data.market_data.current_price.usd : 0
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    coinsList,
    coinsData,
    coinsPrices,
    date,
    loading,
    getCoinsData,
    getCoinsPrices,
    getCoinsHistoryPrices
  }
})
