<template>
    <header class="view-header">
      <h1 class="view-title">Gestion de Infracciones</h1>
    </header>
    <div class="main-container">
      <div class="left-panel">
        <choferes-list @select="handleSelectChofer"></choferes-list>
      </div>
      <div class="right-panel">
        <div class="top-right">
          <chofer-details v-if="selectedChoferData" :chofer="selectedChoferData"></chofer-details>
        </div>
        <div class="bottom-right">
          Aquí crearemos dentro una tabla donde se verá todas las faltas.
        </div>
      </div>
    </div>
  </template>
  
  <script src="../js/GestionFaltasView/GestionFaltasViewSc.js"></script>
  <style scoped src="../assets/styles/St_GestionFaltasView/GestionFaltasViewSt.css"></style>
  