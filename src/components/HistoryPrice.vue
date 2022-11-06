<script setup lang="ts">
import { useCoinStore } from '@/stores/coin'
import dayjs from 'dayjs'

const coinStore = useCoinStore()

const dateInputMax = dayjs().subtract(1, 'day').format('YYYY-MM-DD')

function clearHistoryPrice () {
  coinStore.date = ''
}
</script>

<template lang="pug">
input(type="date" class="h-10 rounded px-3 mr-3" :max="dateInputMax" v-model="coinStore.date")

button(type="button" class="inline-block px-6 h-10 bg-red-600 text-white font-bold text-sm leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease" @click="clearHistoryPrice()" v-if="coinStore.date") Clear
</template>
