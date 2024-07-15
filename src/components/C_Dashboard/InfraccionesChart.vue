<template>
    <div class="infracciones-chart">
      <input v-model="searchQuery" placeholder="Buscar chofer" class="search-bar" @input="filterChoferes" />
      <canvas id="infraccionesChart"></canvas>
    </div>
  </template>
  
  <script src="../../js/Dashboard/InfraccionesChartSc.js"></script>
  <style scoped src="../../assets/styles/St_Dashboard/InfraccionesChartSt.css"></style>