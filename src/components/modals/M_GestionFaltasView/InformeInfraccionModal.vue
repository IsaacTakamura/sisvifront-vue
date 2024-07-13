<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h2>Informe de Infracción</h2>
        <button @click="$emit('close')" class="close-button">&times;</button>
      </div>
      <div class="modal-content">
        <div class="form-group">
          <label for="conductor">Conductor:</label>
          <input type="text" id="conductor" :value="informe.conductor" class="form-control" readonly>
        </div>
        <div class="form-group">
          <label for="vehiculo">Vehículo:</label>
          <input type="text" id="vehiculo" :value="informe.vehiculo" class="form-control" readonly>
        </div>
        <div class="form-group">
          <label for="observaciones">Observaciones:</label>
          <textarea id="observaciones" :value="informe.observaciones" class="form-control" rows="4" readonly></textarea>
        </div>
        <div class="form-group">
          <label for="ubicacion">Ubicación:</label>
          <input type="text" id="ubicacion" :value="informe.ubicacion" class="form-control" readonly>
        </div>
        <div class="form-group">
          <label for="fecha">Fecha:</label>
          <input type="text" id="fecha" :value="informe.fecha" class="form-control" readonly>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../../../js/GestionFaltasView/InformeInfraccionModalSc.js"></script>
<style scoped src="../../../assets/styles/St_GestionFaltasView/InformeInfraccionModalSt.css"></style>
