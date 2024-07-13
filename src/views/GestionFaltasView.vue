<template>
  <div class="main-container">
    <div class="left-panel">
      <choferes-list ref="choferesList" @select="handleSelectChofer"></choferes-list>
    </div>
    <div class="right-panel">
      <div class="top-right">
        <chofer-details v-if="selectedChoferData" :chofer="selectedChoferData"></chofer-details>
      </div>
      <div class="bottom-right">
        <infracciones-table
          ref="infraccionesTable"
          v-if="selectedChofer"
          :choferId="selectedChofer.id"
          @actualizar-strikes="fetchChoferData(selectedChofer)"
          @actualizar-choferes="fetchChoferesList"
          @registrar="showRegistrarInfraccionModal = true"
          @abrir-informe="openInformeModal"
        ></infracciones-table>
      </div>
    </div>
    <registrar-infraccion-modal
      :isVisible="showRegistrarInfraccionModal"
      :choferId="selectedChofer?.id || 0"
      @close="showRegistrarInfraccionModal = false"
      @registered="handleInfraccionRegistered"
    />
    <informe-infraccion-modal
      :isVisible="showInformeInfraccionModal"
      :infraccionId="selectedInfraccionId"
      @close="showInformeInfraccionModal = false"
    />
  </div>
</template>

<script src="../js/GestionFaltasView/GestionFaltasViewSc.js"></script>
<style scoped src="../assets/styles/St_GestionFaltasView/GestionFaltasViewSt.css"></style>
