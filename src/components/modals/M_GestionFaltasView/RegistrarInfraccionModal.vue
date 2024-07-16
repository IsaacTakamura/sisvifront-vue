<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h2>Registrar Infracción</h2>
        <button @click="$emit('close')" class="close-button" style="background: white; border-radius: 10% ;" >&times;</button>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="vehiculo">Vehículo</label>
          <select id="vehiculo" v-model="infraccion.vehiculoId" class="form-control">
            <option v-for="vehiculo in filteredVehiculos" :key="vehiculo.id" :value="vehiculo.id">
              {{ vehiculo.placa }} - {{ vehiculo.marca }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="observaciones">Observaciones</label>
          <textarea id="observaciones" v-model="infraccion.observaciones" class="form-control" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label for="ubicacion">Ubicación</label>
          <input type="text" id="ubicacion" v-model="infraccion.ubicacion" class="form-control">
        </div>
        <div class="button-group">
          <button type="submit" class="btn btn-success">Registrar</button>
          <button type="button" @click="$emit('close')" class="btn btn-secondary">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="../../../js/GestionFaltasView/RegistrarInfraccionModalSc.js"></script>
<style scoped src="../../../assets/styles/St_GestionFaltasView/RegistrarInfraccionModalSt.css"></style>
