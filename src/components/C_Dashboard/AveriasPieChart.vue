<template>
    <div class="averias-pie-chart">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar tipo de avería"
        class="search-bar"
      />
      <div class="chart-container">
        <canvas id="averiasPieChart"></canvas>
      </div>
      <div class="legend-container">
        <div
          v-for="(color, index) in chartColors"
          :key="index"
          class="legend-item"
        >
          <div
            class="legend-color-box"
            :style="{ backgroundColor: color }"
          ></div>
          <span>{{ chartLabels[index] }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script src="../../js/Dashboard/AveriasPieChartSc.js"></script>
  <style scoped src="../../assets/styles/St_Dashboard/AveriasPieChartSt.css"></style>
  