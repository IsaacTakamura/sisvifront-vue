<template>
    <div class="vehiculos-list">
      <i class="fas fa-list fa-2x"></i>
      <h2 class="title">Vehículos Registrados</h2>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
        <i class="fas fa-search fa-lg"></i>
          </span>
        </div>
        <input type="text" v-model="searchQuery" placeholder="Buscar por placa" class="form-control my-3 filtro-vehiculos" />
      </div>
      <div class="lista-contenedor">
        <ul class="list-group mb-3 lista-scrollable">
          <li v-for="vehiculo in filteredVehiculos" :key="vehiculo.id" @click="selectVehiculo(vehiculo)" class="list-group-item">
            <span class="invisible-id">{{ vehiculo.id }}</span>
            {{ vehiculo.placa }} - {{ vehiculo.marca }}-{{ vehiculo.modelo }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script src="../../js/FallosVehicularesView/VehiculosListSc.js"></script>
  <style scoped src="../../assets/styles/St_FallosVehicularesView/VehiculosListSt.css"></style>
  