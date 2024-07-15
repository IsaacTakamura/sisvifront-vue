<template>
    <div class="api-summary">
      <div class="api-box" v-for="(data, index) in apiData" :key="index">
        <img :src="data.icon" class="api-icon" alt="icon"/>
        <p class="api-count">{{ data.count }}</p>
        <p class="api-label">{{ data.label }}</p>
      </div>
    </div>
  </template>
  
  <script src="../../js/Dashboard/ApiSummarySc.js"></script>
  <style scoped src="../../assets/styles/St_Dashboard/ApiSummarySt.css"></style>
  