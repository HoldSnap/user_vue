'use strict'

import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    users: [],
    deletedUsers: [],
    sortField: '',
    sortDirection: 'asc',
    currentPage: 1,
    pageSize: 5,
    searchQuery: '',
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
      state.deletedUsers.push(userId)
      state.users = state.users.filter(user => user.id !== userId)
    },
    SET_PAGE(state, page) {
      state.currentPage = page
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query
    },
    CLEAR_DELETED_USERS(state) {
      state.deletedUsers = []
    },
  },
  actions: {
    async fetchUsers({ commit, state }) {
      try {
        const response = await axios.get(
          'https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users',
        )
        const filteredUsers = response.data.filter(
          user => !state.deletedUsers.includes(user.id),
        )
        commit('SET_USERS', filteredUsers)
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
      commit('SET_SEARCH_QUERY', '')
      dispatch('fetchUsers')
    },
    deleteUser({ commit }, userId) {
      commit('DELETE_USER', userId)
    },
    setPage({ commit }, page) {
      commit('SET_PAGE', page)
    },
    setSearchQuery({ commit }, query) {
      commit('SET_SEARCH_QUERY', query)
    },
    clearDeletedUsers({ commit }) {
      commit('CLEAR_DELETED_USERS')
    },
  },
  getters: {
    allUsers(state) {
      const start = (state.currentPage - 1) * state.pageSize
      const end = state.currentPage * state.pageSize

      const filteredUsers = state.users.filter(user => {
        const usernameMatch = user.username
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase())
        const emailMatch = user.email
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase())
        return usernameMatch || emailMatch
      })

      return filteredUsers.slice(start, end)
    },
    totalUsers(state) {
      const filteredUsers = state.users.filter(user => {
        const usernameMatch = user.username
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase())
        const emailMatch = user.email
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase())
        return usernameMatch || emailMatch
      })

      return filteredUsers.length
    },
    totalPages(state, getters) {
      return Math.ceil(getters.totalUsers / state.pageSize)
    },
  },
})

export default store
