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
      <button class="search__clear" v-if="isFilterActive" @click="clearFilters">
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

const isFilterActive = computed(() => {
  return store.state.searchQuery !== '' || store.state.sortField !== ''
})

const updateSearchQuery = () => {
  store.dispatch('setSearchQuery', searchQuery.value)
}

const clearFilters = () => {
  store.dispatch('resetFilters')
}
</script>

<style scoped lang="scss">
@import '../assets/variables';

.user-list__search {
  width: 100%;
  box-shadow: 0px 18px 15px 0px #94949426;
  height: 102px;
  display: flex;
  align-items: center;
}
</style>
