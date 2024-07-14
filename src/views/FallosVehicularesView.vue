<template>
  <div>
    <header class="view-header">
      <h1 class="view-title">Fallos Vehiculares</h1>
    </header>
    <div class="main-container">
      <div class="left-panel">
        <vehiculos-list @select="handleSelectVehiculo"></vehiculos-list>
      </div>
      <div class="right-panel">
        <div class="top-right">
          <vehiculo-details v-if="selectedVehiculoData" :vehiculo="selectedVehiculoData"></vehiculo-details>
        </div>
        <div class="bottom-right">
          <tabla-averias v-if="selectedVehiculo" :vehiculoId="selectedVehiculo.id"></tabla-averias>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../js/FallosVehicularesView/FallosVehicularesViewSc.js"></script>
<style scoped src="../assets/styles/St_FallosVehicularesView/FallosVehicularesViewSt.css"></style>
