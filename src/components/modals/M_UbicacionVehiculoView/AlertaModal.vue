<template>
  <div class="modal" tabindex="-1" role="dialog" v-if="show">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header" :class="modalClass">
          <h5 class="modal-title">Advertencia: {{ advertencia.tipo }}</h5>
          <button type="button" class="close" @click="close">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p><strong>Placa:</strong> {{ advertencia.placa }}</p>
          <p><strong>Modelo:</strong> {{ advertencia.modelo }}</p>
          <p><strong>Código:</strong> {{ advertencia.codigo }}</p>
          <p><strong>Descripción:</strong> {{ advertencia.descripcion }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="close">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../../../js/UbicacionVehiculoView/AlertaModalSc.js"></script>
<style scoped src="../../../assets/styles/St_UbicacionVehiculoView/AlertaModalSt.css"></style>
