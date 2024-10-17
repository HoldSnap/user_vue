<template>
  <div class="user-list">
    <UserListHeader />
    <SearchFilter />
    <SortOptions />
    <UserTable />
  </div>
</template>

<script setup>
'use strict'

import UserListHeader from '../components/UserListHeader.vue'
import SearchFilter from '../components/SearchFilter.vue'
import SortOptions from '../components/SortOptions.vue'
import UserTable from '../components/UserTable.vue'
</script>

<style scoped lang="scss">
.user-list {
  padding: 12px 27px;
}
</style>
