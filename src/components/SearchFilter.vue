<template>
  <div class="user-list__search">
    <div class="search">
      <svg
        class="search__icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <circle
          cx="10"
          cy="10"
          r="8"
          stroke="#949494"
          stroke-width="2"
          fill="none"
        ></circle>
        <line
          x1="15"
          y1="15"
          x2="21"
          y2="21"
          stroke="#949494"
          stroke-width="2"
        ></line>
      </svg>
      <input
        type="text"
        placeholder="Поиск по имени или e-mail"
        class="search__input"
        v-model="searchQuery"
        @input="updateSearchQuery"
      />
      <img
        v-if="isFilterActive"
        src="@/assets/svgs/clean.svg"
        alt="Очистить"
        class="search__clear-icon"
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
@import '@/assets/variables';

.user-list {
  &__search {
    margin-top: 20px;
    margin-bottom: 72px;
    display: flex;
    align-items: center;
    padding: 16px;
    padding-right: 5%;
    box-shadow: 0px 18px 15px 0px #94949426;
    background-color: #fff;
    border-radius: 7px;
    height: 102px;

    & .search {
      position: relative;
      width: 100%;
      height: 100%;

      &__icon {
        position: absolute;
        left: 16px;
        top: 30%;
        transform: translateY(-50%);
        pointer-events: none;
      }

      &__input {
        font-family: $font-family-base;
        font-size: 16px;
        width: 100%;
        height: 44px;
        padding: 12px 16px 12px 44px;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        background-color: #f1f1f1;
        color: #333;
      }

      &__clear-icon {
        height: 18px;
        vertical-align: middle;
        margin-bottom: 8px;
        width: auto;
      }

      &__clear {
        padding: 12px;
        background: none;
        border: none;
        font-size: 16px;
        font-family: $font-family-base;
        color: rgb(79, 79, 79);
        cursor: pointer;
      }
    }
  }
}
</style>
