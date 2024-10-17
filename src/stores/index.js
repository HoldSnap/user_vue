'use strict'

import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    users: [],
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    DELETE_USER(state, userId) {
      state.users = state.users.filter(user => user.id !== userId)
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get(
          'https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users',
        )
        commit('SET_USERS', response.data)
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error)
      }
    },
    deleteUser({ commit }, userId) {
      commit('DELETE_USER', userId)
    },
  },
  getters: {
    allUsers(state) {
      return state.users
    },
  },
})

export default store
