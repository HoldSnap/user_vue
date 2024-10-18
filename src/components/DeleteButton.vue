<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal-content">
      <p>Вы уверены, что хотите удалить пользователя?</p>
      <div class="modal-actions">
        <button class="btn btn-confirm" @click="confirmDelete">Да</button>
        <button class="btn btn-cancel" @click="cancelDelete">Нет</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['confirm', 'cancel'])

const confirmDelete = () => {
  emit('confirm')
}

const cancelDelete = () => {
  emit('cancel')
}
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.modal-overlay {
  font-family: $font-family-base;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 40px;
  width: 500px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.modal-actions {
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  margin: 0 10px;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-confirm {
  background-color: #f0f0f0;
  color: $tablet-color;
  font-weight: bolder;
}

.btn-cancel {
  background-color: $username-color;
  color: white;
}
</style>
