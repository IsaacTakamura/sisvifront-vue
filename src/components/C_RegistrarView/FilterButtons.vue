<template>
    <div class="filter-buttons">
      <button @click="filterActive" class="btn btn-info">Mostrar Activos</button>
      <button @click="filterAll" class="btn btn-secondary">Mostrar Todos</button>
      <button @click="filterInactive" class="btn btn-danger">Mostrar Inactivos</button>
    </div>
  </template>

  <script src="../../js/RegistrarView/FilterButtonsSc.js"></script>
  
  <style scoped src="../../assets/styles/St_RegistrarView/FilterButtonsSt.css"></style>
  