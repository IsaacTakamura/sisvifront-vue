<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Registrar Repuesto</h2>
          <button @click="handleClose" class="close-button">&times;</button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="codigo">Código</label>
            <input type="text" id="codigo" v-model="repuesto.codigoInterno" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="descripcion">Descripción</label>
            <input type="text" id="descripcion" v-model="repuesto.descripcion" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="fabricante">Fabricante</label>
            <input type="text" id="fabricante" v-model="repuesto.fabricante" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="fechaFabricacion">Fecha de Fabricación</label>
            <input type="date" id="fechaFabricacion" v-model="repuesto.fechaFabricacion" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="cantidadStock">Cantidad en Stock</label>
            <input type="number" id="cantidadStock" v-model="repuesto.cantidadStock" class="form-control" required>
          </div>
          <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Registrar</button>
            <button type="button" @click="handleClose" class="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script src="../../../js/RepuestoView/RegistrarRepuestoModalSc.js"></script>
  <style scoped src="../../../assets/styles/St_RepuestoView/RegistrarRepuestoModalSt.css"></style>
  