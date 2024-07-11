<template>
    <div class="chofer-details">
      <h2 class="details-header">Detalles del Conductor</h2>
      <div class="details-container">
        <div class="details-column">
          <ul class="details-list">
            <li>
              <span class="details-label">DNI:</span>
              <span class="details-value">{{ chofer.dni }}</span>
            </li>
            <li>
              <span class="details-label">Nombre Completo:</span>
              <span class="details-value">{{ chofer.primerNombre }} {{ chofer.segundoNombre }} {{ chofer.apellidoPaterno }} {{ chofer.apellidoMaterno }}</span>
            </li>
            <li>
              <span class="details-label">Teléfono:</span>
              <span class="details-value">{{ chofer.telefono }}</span>
            </li>
            <li>
              <span class="details-label">Licencia de Conducir:</span>
              <span class="details-value">{{ chofer.licenciaConducir }}</span>
            </li>
          </ul>
        </div>
        <div class="divider"></div>
        <div class="details-column">
          <ul class="details-list">
            <li>
              <span class="details-label">Nombre del Vehículo:</span>
            </li>
            <li>
              <span class="details-label">Marca del Vehículo:</span>
            </li>
            <li>
              <span class="details-label">Modelo del Vehículo:</span>
            </li>
            <li>
              <span class="details-label">Strikes:</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script src="../../js/GestionFaltasView/ChoferDetailsSc.js"></script>
  <style scoped src="../../assets/styles/St_GestionFaltasView/ChoferDetailsSt.css"></style>
  