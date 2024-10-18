<template>
  <div class="user-list__table">
    <table class="table">
      <thead class="table__head">
        <tr class="table__row">
          <th class="table__cell table__cell--header">Имя пользователя</th>
          <th class="table__cell">E-mail</th>
          <th class="table__cell">Дата регистрации</th>
          <th class="table__cell">Рейтинг</th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr v-for="user in users" :key="user.id" class="table__row">
          <td class="table__cell table__cell--name">{{ user.username }}</td>
          <td class="table__cell">{{ user.email }}</td>
          <td class="table__cell">
            {{ new Date(user.registration_date).toLocaleDateString() }}
          </td>
          <td class="table__cell">{{ user.rating }}</td>
          <td class="table__cell">
            <button class="table__delete" @click="showDeleteModal(user.id)">
              <img :src="CancelIcon" alt="Удалить" class="delete-icon" />
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
        :class="[
          'pagination__button',
          { 'pagination__button--active': page === currentPage },
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
  <DeleteModal
    :isVisible="isDeleteModalVisible"
    @confirm="handleConfirmDelete"
    @cancel="handleCancelDelete"
  />
</template>

<script setup>
import CancelIcon from '@/assets/svgs/cansel.svg'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import DeleteModal from '@/components/DeleteButton.vue'
;('use strict')

const store = useStore()

onMounted(() => {
  store.dispatch('fetchUsers')
})
const isDeleteModalVisible = ref(false)
const userIdToDelete = ref(null)

const showDeleteModal = userId => {
  userIdToDelete.value = userId
  isDeleteModalVisible.value = true
}

const handleConfirmDelete = () => {
  removeUser(userIdToDelete.value)
  isDeleteModalVisible.value = false
}

const handleCancelDelete = () => {
  isDeleteModalVisible.value = false
}
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

<style scoped lang="scss">
@import '@/assets/variables';

.user-list__table {
  font-family: $font-family-base;
  color: $tablet-color;
  border-radius: 7px;
  box-shadow: 0px 18px 15px 0px #94949426;

  margin-top: 15px;
  width: 100%;
  background-color: #fff;

  .table {
    width: 100%;
    &__cell {
      padding: 10px;
      text-align: left;
      font-weight: normal;

      &--name {
        color: $username-color;
        font-weight: bold;
      }
    }

    .table__delete {
      background: none;
      border: none;
      cursor: pointer;

      .delete-icon {
        text-align: right;
        width: 20px;
        height: 20px;
      }
    }
  }
  .pagination {
    padding-bottom: 20px;
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .pagination__button {
      padding: 10px 15px;
      margin: 0 5px;
      background-color: #fff;
      border: 1px solid #ccc;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #f0f0f0;
      }

      &--active {
        background-color: $username-color;
        border-color: $username-color;
      }
    }
  }
}
</style>
