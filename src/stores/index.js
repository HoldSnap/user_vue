'use strict'

import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    users: [],
    sortField: '',
    sortDirection: 'asc',
    currentPage: 1,
    pageSize: 5,
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    SET_SORT(state, { field, direction }) {
      state.sortField = field
      state.sortDirection = direction
    },
    DELETE_USER(state, userId) {
      state.users = state.users.filter(user => user.id !== userId)
    },
    SET_PAGE(state, page) {
      state.currentPage = page
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
    sortUsers({ commit, state }, field) {
      const direction =
        state.sortField === field && state.sortDirection === 'asc'
          ? 'desc'
          : 'asc'
      commit('SET_SORT', { field, direction })

      const sortedUsers = [...state.users].sort((a, b) => {
        if (field === 'registration_date') {
          return direction === 'asc'
            ? new Date(a.registration_date) - new Date(b.registration_date)
            : new Date(b.registration_date) - new Date(a.registration_date)
        } else if (field === 'rating') {
          return direction === 'asc' ? a.rating - b.rating : b.rating - a.rating
        }
      })

      commit('SET_USERS', sortedUsers)
    },
    resetFilters({ commit, dispatch }) {
      commit('SET_SORT', { field: '', direction: 'asc' })
      dispatch('fetchUsers')
    },
    deleteUser({ commit }, userId) {
      commit('DELETE_USER', userId)
    },
    setPage({ commit }, page) {
      commit('SET_PAGE', page)
    },
  },
  getters: {
    allUsers(state) {
      const start = (state.currentPage - 1) * state.pageSize
      const end = state.currentPage * state.pageSize
      return state.users.slice(start, end)
    },
    totalUsers(state) {
      return state.users.length
    },
    totalPages(state) {
      return Math.ceil(state.users.length / state.pageSize)
    },
  },
})

export default store
