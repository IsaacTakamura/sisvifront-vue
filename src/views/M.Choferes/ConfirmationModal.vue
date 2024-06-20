<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="cancel">
      <div class="modal-content">
        <p class="modal-message">{{ message }}</p>
        <div class="modal-buttons">
          <button @click="confirm" class="modal-button confirm-button">Aceptar</button>
          <button @click="cancel" class="modal-button cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
  </template>
<script>
export default {
  props: {
    isVisible: Boolean,
    message: String
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>
  
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.modal-message {
  font-size: 18px;
  margin-bottom: 20px;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
}

.modal-button {
  width: 100px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.confirm-button {
  background-color: #4CAF50;
  color: white;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.modal-button:hover {
  opacity: 0.8;
}
</style>
  