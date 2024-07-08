<template>
    <!-- Contenedor principal para la sección de mapa de ubicación -->
    <div class="mapa-ubicacion">
      <h2 class="title">Última Ubicación</h2>
      <!-- Componente MapComponent para mostrar el mapa con la ubicación -->
      <MapComponent 
        v-if="ubicacion && vehiculo"
        :lat="ubicacion.lat" 
        :lon="ubicacion.lon" 
        :prevLat="prevUbicacion ? prevUbicacion.lat : null"
        :prevLon="prevUbicacion ? prevUbicacion.lon : null" 
        :placa="vehiculo.placa" 
        :nombreVehiculo="vehiculo.marca" />
      
      <!-- Información adicional sobre la ubicación del vehículo -->
      <div class="ubicacion-info">
        <label>Ubicación Actual: </label>
        <input type="text" :value="ubicacion.direccion" readonly class="form-control input-reducido centered-text" />
        <label>Ubicación Anterior: </label>
        <input type="text" :value="prevUbicacion ? prevUbicacion.direccion : 'N/A'" readonly class="form-control input-reducido centered-text" />
        <label>Estado: </label>
        <input type="text" :value="estadoVehiculo" readonly class="form-control input-reducido centered-text" />
        <label>Velocidad: </label>
        <input type="text" :value="velocidadVehiculo" readonly class="form-control input-reducido centered-text" />
      </div>
    </div>
  </template>
  
  <!-- Importa el script asociado a este componente -->
  <script src="../../js/UbicacionVehiculoView/MapaUbicacionSc.js"></script>
  <!-- Importa los estilos CSS asociados a este componente -->
  <style scoped src="../../assets/styles/St_UbicacionVehiculoView/MapaUbicacionSt.css"></style>
  