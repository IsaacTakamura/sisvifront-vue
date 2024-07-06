<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <h3>Confirmar Registro</h3>
      <p>{{ message }}</p>
      <div class="modal-buttons">
        <button @click="$emit('confirm')" class="modal-button confirm-button">Aceptar</button>
        <button @click="$emit('cancel')" class="modal-button cancel-button">Cancelar</button>
      </div>
    </div>
  </div>
  </template>
  
  <script src="../../../js/RegistrarView/ConfirmationModalSc.js"></script>
  
  <style scoped src="../../../assets/styles/St_RegistrarView/ConfirmationModalSt.css"></style>
  