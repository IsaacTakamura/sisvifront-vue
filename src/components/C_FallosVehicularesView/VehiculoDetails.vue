<template>
    <div class="vehiculo-details">
      <h2 class="details-header">Detalles del Vehículo</h2>
      <div class="details-container">
        <div class="details-column">
          <ul class="details-list">
            <li>
              <span class="details-label">Placa:</span>
              <span class="details-value">{{ vehiculo.placa }}</span>
            </li>
            <li>
              <span class="details-label">Marca:</span>
              <span class="details-value">{{ vehiculo.marca }}</span>
            </li>
            <li>
              <span class="details-label">Modelo:</span>
              <span class="details-value">{{ vehiculo.modelo }}</span>
            </li>
            <li>
              <span class="details-label">Año de Fabricación:</span>
              <span class="details-value">{{ vehiculo.anioFabricacion }}</span>
            </li>
          </ul>
        </div>
        <div class="divider"></div>
        <div class="details-column">
          <ul class="details-list">
            <li>
              <span class="details-label">Color:</span>
              <span class="details-value">{{ vehiculo.color }}</span>
            </li>
            <li>
              <span class="details-label">Tipo de Combustible:</span>
              <span class="details-value">{{ vehiculo.tipoCombustible }}</span>
            </li>
            <li>
              <span class="details-label">Número de Motor:</span>
              <span class="details-value">{{ vehiculo.numMotor }}</span>
            </li>
            <li>
              <span class="details-label">Número de Serie:</span>
              <span class="details-value">{{ vehiculo.numSerie }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script src="../../js/FallosVehicularesView/VehiculoDetailsSc.js"></script>
  <style scoped src="../../assets/styles/St_FallosVehicularesView/VehiculoDetailsSt.css"></style>
  