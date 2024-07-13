<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <h3>Chofer no puede ser activado</h3>
        <p>Este chofer tiene 5 o más infracciones y no puede volver a trabajar.</p>
      </div>
    </div>
  </template>
  
  <script src="../../../js/RegistrarView/ExceedInfractionsModalSc.js"></script>
  
  <style scoped src="../../../assets/styles/St_RegistrarView/ExceedInfractionsModalSt.css"></style>
  