<template>
    <div class="mantenimientos-line-chart">
      <input
        type="number"
        v-model="searchYear"
        placeholder="Año"
        class="search-bar"
        @change="fetchData"
      />
      <div class="chart-container">
        <canvas id="mantenimientosLineChart"></canvas>
      </div>
    </div>
  </template>
  
  <script src="../../js/Dashboard/MantenimientosLineChartSc.js"></script>
  <style scoped src="../../assets/styles/St_Dashboard/MantenimientosLineChartSt.css"></style>
  