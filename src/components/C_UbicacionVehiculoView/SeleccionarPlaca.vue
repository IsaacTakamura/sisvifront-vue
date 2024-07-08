<template>
    <!-- Contenedor principal para la sección de selección de placa -->
    <div class="seleccionar-placa">
      <h2 class="title">Seleccionar Placa</h2>
      
      <!-- Filtro para buscar placas -->
      <label class="centered-label">1. Filtrar por Placa:</label>
      <input type="text" 
             v-model="$parent.filtroPlaca"
             placeholder="Filtrar por placa" 
             class="form-control my-3 filtro-placa" />
      
      <!-- Lista de placas filtradas -->
      <label class="centered-label">2. Seleccionar Placa</label>
      <div class="lista-contenedor">
        <ul class="list-group mb-3 lista-scrollable">
          <li v-for="vehiculo in $parent.vehiculosFiltrados"
              :key="vehiculo.id" 
              @click="$parent.seleccionarVehiculo(vehiculo)"
              class="list-group-item">
            {{ vehiculo.placa }} - {{ vehiculo.marca }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <!-- Importa el script asociado a este componente -->
  <script src="../../js/UbicacionVehiculoView/SeleccionarPlacaSc.js"></script>
  <!-- Importa los estilos CSS asociados a este componente -->
  <style scoped src="../../assets/styles/St_UbicacionVehiculoView/SeleccionarPlacaSt.css"></style>
  