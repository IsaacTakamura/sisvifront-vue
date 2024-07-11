<template>
    <div class="vehiculos-list">
      <h2 class="title">Lista de Vehículos</h2>
      <input type="text" v-model="searchQuery" placeholder="Buscar por placa" class="form-control my-3 filtro-vehiculos" />
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
  