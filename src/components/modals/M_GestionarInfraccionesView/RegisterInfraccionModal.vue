<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Registrar Infracción</h2>
      <form @submit.prevent="registerInfraccion">
        <div class="form-group">
          <label for="vehiculo">Vehículo</label>
          <select v-model="vehiculoId" class="form-control">
            <option v-for="vehiculo in vehiculos" :key="vehiculo.id" :value="vehiculo.id">{{ vehiculo.placa }} - {{ vehiculo.marca }} {{ vehiculo.modelo }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="observaciones">Observaciones</label>
          <input type="text" v-model="observaciones" class="form-control" />
        </div>
        <div class="form-group">
          <label for="ubicacion">Ubicación</label>
          <input type="text" v-model="ubicacion" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Registrar</button>
      </form>
    </div>
  </div>
</template>

<script src="../../../js/GestionarInfraccionesView/RegisterInfraccionModalSc.js"></script>
<style scoped src="../../../assets/styles/St_GestionarInfraccionesView/RegisterInfraccionModalSt.css"></style>
