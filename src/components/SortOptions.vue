<template>
  <div class="user-list__sort">
    <div class="sort">
      <span class="sort__label">Сортировка:</span>
      <button class="sort__option" @click="sortBy('registration_date')">
        Дата регистрации
      </button>
      <button class="sort__option" @click="sortBy('rating')">Рейтинг</button>
    </div>
  </div>
</template>

<script setup>
'use strict'
import { useStore } from 'vuex'

const store = useStore()

const sortBy = field => {
  store.dispatch('sortUsers', field)
}
</script>

<style scoped></style>
