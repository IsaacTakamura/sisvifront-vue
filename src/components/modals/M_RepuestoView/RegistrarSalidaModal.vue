<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Registrar Salida</h2>
          <button @click="handleClose" class="close-button">&times;</button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="codigo">Código del Repuesto</label>
            <select id="codigo" v-model="codigo" class="form-control" required>
              <option v-for="repuesto in filteredRepuestos" :key="repuesto.codigoInterno" :value="repuesto.codigoInterno">
                {{ repuesto.codigoInterno }} - {{ repuesto.descripcion }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="cantidad">Cantidad a Registrar</label>
            <input type="number" id="cantidad" v-model="cantidad" class="form-control" required>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Registrar</button>
            <button type="button" @click="handleClose" class="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </template>  
  
  <script src="../../../js/RepuestoView/RegistrarSalidaModalSc.js"></script>
  <style scoped src="../../../assets/styles/St_RepuestoView/RegistrarSalidaModalSt.css"></style>
  