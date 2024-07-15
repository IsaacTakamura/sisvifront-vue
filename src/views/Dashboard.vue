<template>
  <div>
    <header class="view-header">
      <h1 class="view-title">Dashboard</h1>
    </header>
    <div class="main-container">
      <api-summary></api-summary>
      <div class="row">
        <div class="col">
          <div class="chart-title">Infracciones por Chofer</div>
          <infracciones-chart></infracciones-chart>
        </div>
        <div class="col">
          <div class="chart-title">Total Averías</div>
          <averias-pie-chart></averias-pie-chart>
        </div>
        <div class="col">
          <div class="chart-title">Mantenimientos durante el año</div>
          <mantenimientos-line-chart></mantenimientos-line-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../js/Dashboard/DashboardSc.js"></script>
<style scoped src="../assets/styles/St_Dashboard/DashboardSt.css"></style>
