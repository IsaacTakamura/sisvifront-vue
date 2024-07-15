<template>
  <div class="conductor-details" v-if="conductor">
    <ul class="details-list">
      <li><span class="details-label">DNI:</span><span class="details-value">{{ conductor.dni }}</span></li>
      <li><span class="details-label">Nombre Completo:</span><span class="details-value">{{ conductor.primerNombre }} {{ conductor.segundoNombre }} {{ conductor.apellidoPaterno }} {{ conductor.apellidoMaterno }}</span></li>
      <li><span class="details-label">Teléfono:</span><span class="details-value">{{ conductor.telefono }}</span></li>
      <li><span class="details-label">Licencia de Conducir:</span><span class="details-value">{{ conductor.licenciaConducir }}</span></li>
      <li><span class="details-label">Strikes:</span><span class="details-value">{{ strikes }}</span></li>
    </ul>
  </div>
</template>

<script src="../../js/GestionarInfraccionesView/ConductorDetailsSc.js"></script>
<style scoped src="../../assets/styles/St_GestionarInfraccionesView/ConductorDetailsSt.css"></style>
