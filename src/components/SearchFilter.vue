<template>
  <div class="user-list__search">
    <div class="search">
      <input
        type="text"
        placeholder="Поиск по имени или e-mail"
        class="search__input"
        v-model="searchQuery"
        @input="updateSearchQuery"
      />
      <button class="search__clear" v-if="isSearching" @click="clearFilters">
        Очистить фильтр
      </button>
    </div>
  </div>
</template>

<script setup>
'use strict'

import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const searchQuery = computed({
  get: () => store.state.searchQuery,
  set: value => store.dispatch('setSearchQuery', value),
})

const isSearching = computed(() => store.state.searchQuery !== '')

const updateSearchQuery = () => {
  store.dispatch('setSearchQuery', searchQuery.value)
}

const clearFilters = () => {
  store.dispatch('resetFilters')
}
</script>
