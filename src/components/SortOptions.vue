<template>
  <div class="user-list__sort">
    <div class="sort">
      <span class="sort__label">Сортировка:</span>
      <button
        class="sort__option"
        :class="{ 'sort__option--active': isSortedBy('registration_date') }"
        @click="sortBy('registration_date')"
      >
        Дата регистрации
      </button>
      <button
        class="sort__option"
        :class="{ 'sort__option--active': isSortedBy('rating') }"
        @click="sortBy('rating')"
      >
        Рейтинг
      </button>
    </div>
  </div>
</template>

<script setup>
'use strict'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const sortBy = field => {
  store.dispatch('sortUsers', field)
}

const currentSortField = computed(() => store.state.sortField)

const isSortedBy = field => currentSortField.value === field
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.sort__label {
  font-family: $font-family-base;
  font-size: $font-small;
  color: $tablet-color;
}

.sort__option {
  font-family: $font-family-base;
  font-size: $font-small;
  color: $tablet-color;
  margin-left: 10px;
  border: none;
  border-bottom: 2px dashed $tablet-color;
  background: none;
  cursor: pointer;
  padding: 5px 0;
  transition:
    color 0.3s ease,
    border-color 0.3s ease;

  &--active {
    color: rgb(51, 51, 51);
    border-color: rgb(51, 51, 51);
  }
}
</style>
