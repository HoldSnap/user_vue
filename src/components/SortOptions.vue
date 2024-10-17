<template>
  <div class="user-list__sort">
    <div class="sort">
      <span class="sort__label">Сортировка:</span>
      <button class="sort__option" @click="sortBy('registration_date')">
        Дата регистрации
        <span v-if="sortField === 'registration_date'">{{
          sortDirection === 'asc' ? '↑' : '↓'
        }}</span>
      </button>
      <button class="sort__option" @click="sortBy('rating')">
        Рейтинг
        <span v-if="sortField === 'rating'">{{
          sortDirection === 'asc' ? '↑' : '↓'
        }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
'use strict'

import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const sortField = computed(() => store.state.sortField)
const sortDirection = computed(() => store.state.sortDirection)

const sortBy = field => {
  store.dispatch('sortUsers', field)
}
</script>

<style scoped></style>
