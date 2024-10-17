<template>
  <div class="user-list__table">
    <table class="table">
      <thead class="table__head">
        <tr class="table__row">
          <th class="table__cell">Имя пользователя</th>
          <th class="table__cell">E-mail</th>
          <th class="table__cell">Дата регистрации</th>
          <th class="table__cell">Рейтинг</th>
          <th class="table__cell">Удалить</th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr v-for="user in users" :key="user.id" class="table__row">
          <td class="table__cell">{{ user.username }}</td>
          <td class="table__cell">{{ user.email }}</td>
          <td class="table__cell">
            {{ new Date(user.registration_date).toLocaleDateString() }}
          </td>
          <td class="table__cell">{{ user.rating }}</td>
          <td class="table__cell">
            <button class="table__delete" @click="removeUser(user.id)">
              &times;
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="setPage(page)"
        :class="{ active: page === currentPage }"
        class="pagination__button"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
'use strict'

import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

const store = useStore()

onMounted(() => {
  store.dispatch('fetchUsers')
})

const users = computed(() => store.getters.allUsers)
const totalPages = computed(() => store.getters.totalPages)
const currentPage = computed(() => store.state.currentPage)

const removeUser = userId => {
  store.dispatch('deleteUser', userId)
}

const setPage = page => {
  store.dispatch('setPage', page)
}
</script>

<style scoped>
.pagination {
  margin-top: 20px;
}

.pagination__button {
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
}

.pagination__button.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
