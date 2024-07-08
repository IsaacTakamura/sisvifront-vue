<template>
  <div class="registro-diario">
    <div class="contenedor">
      <seleccionar-placa
       :filtroPlaca="filtroPlaca" 
       :vehiculosFiltrados="vehiculosFiltrados" 
       @select="seleccionarVehiculo">
      </seleccionar-placa>

      <ficha-tecnica 
      v-if="vehiculoSeleccionado" 
      :vehiculo="vehiculoSeleccionado">
    </ficha-tecnica>

      <mapa-ubicacion 
      v-if="ubicacion" 
      :ubicacion="ubicacion" 
      :prevUbicacion="prevUbicacion" 
      :vehiculo="vehiculoSeleccionado"
      :estadoVehiculo="estadoVehiculo" 
      :velocidadVehiculo="velocidadVehiculo"></mapa-ubicacion>
    </div>
  </div>
</template>

<script src="../js/UbicacionVehiculoView/UbicacionVehiculoViewSc.js"></script>
<style scoped src="../assets/styles/St_UbicacionVehiculoView/UbicacionVehiculoViewSt.css"></style>
