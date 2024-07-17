<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Editar Repuesto</h2>
          <button @click="closeModal" class="close-button">&times;</button>
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
            <input type="date" id="fechaFabricacion" v-model="repuesto.fechaFabricacion" class="form-control">
          </div>
          <div class="form-group">
            <label for="cantidadStock">Cantidad en Stock</label>
            <input type="number" id="cantidadStock" v-model="repuesto.cantidadStock" class="form-control" readonly>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Actualizar</button>
            <button type="button" @click="closeModal" class="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script src="../../../js/RepuestoView/EditarRepuestoModalSc.js"></script>
  <style scoped src="../../../assets/styles/St_RepuestoView/EditarRepuestoModalSt.css"></style>
  