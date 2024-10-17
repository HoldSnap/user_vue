'use strict'

import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    users: [],
    sortField: '',
    sortDirection: 'asc',
    searchQuery: '',
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
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query
    },
    DELETE_USER(state, userId) {
      state.users = state.users.filter(user => user.id !== userId)
    },
    SET_PAGE(state, page) {
      state.currentPage = page
    },
    RESET_FILTERS(state) {
      state.searchQuery = ''
      state.sortField = ''
      state.sortDirection = 'asc'
      state.currentPage = 1
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
    searchUsers({ commit }, query) {
      commit('SET_SEARCH_QUERY', query)
    },
    resetFilters({ commit, dispatch }) {
      commit('RESET_FILTERS')
      dispatch('fetchUsers')
    },
  },
  getters: {
    filteredUsers(state) {
      const filtered = state.users.filter(
        user =>
          user.username
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(state.searchQuery.toLowerCase()),
      )

      const start = (state.currentPage - 1) * state.pageSize
      const end = state.currentPage * state.pageSize

      return filtered.slice(start, end)
    },
    totalFilteredUsers(state) {
      return state.users.filter(
        user =>
          user.username
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(state.searchQuery.toLowerCase()),
      ).length
    },
    totalPages(state, getters) {
      return Math.ceil(getters.totalFilteredUsers / state.pageSize)
    },
    isFiltered(state) {
      return state.sortField !== '' || state.searchQuery !== ''
    },
  },
})

export default store
