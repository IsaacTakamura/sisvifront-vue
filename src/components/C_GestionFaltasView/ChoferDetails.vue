<template>
  <div class="chofer-details">
    <h2 class="details-header">Detalles del Conductor</h2>
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
      <li>
        <span class="details-label">Strikes:</span>
        <span class="details-value">{{ chofer.strikes }}</span>
      </li>
    </ul>
  </div>
</template>

<script src="../../js/GestionFaltasView/ChoferDetailsSc.js"></script>
<style scoped src="../../assets/styles/St_GestionFaltasView/ChoferDetailsSt.css"></style>

  