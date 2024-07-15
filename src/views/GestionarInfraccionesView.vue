<template>
  <div>
    <header class="view-header">
      <h1 class="view-title">Gestionar Infracciones</h1>
    </header>
    <div class="main-container">
      <div class="left-panel">
        <h2 class="title">Lista de Conductores</h2>
        <conductores-list @select="handleSelectConductor"></conductores-list>
      </div>
      <div class="right-panel">
        <div class="top-right">
          <h2 class="title">Detalles del Conductor</h2>
          <conductor-details v-if="selectedConductorId" :conductorId="selectedConductorId"></conductor-details>
        </div>
        <div class="bottom-right">
          <infracciones-table v-if="selectedConductorId" :choferId="selectedConductorId"></infracciones-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../js/GestionarInfraccionesView/GestionarInfraccionesViewSc.js"></script>
<style scoped src="../assets/styles/St_GestionarInfraccionesView/ConductoresListSt.css"></style>
<style scoped src="../assets/styles/St_GestionarInfraccionesView/ConductorDetailsSt.css"></style>
<style scoped src="../assets/styles/St_GestionarInfraccionesView/InfraccionesTableSt.css"></style>
<style scoped src="../assets/styles/St_GestionarInfraccionesView/GestionarInfraccionesSt.css"></style>

  