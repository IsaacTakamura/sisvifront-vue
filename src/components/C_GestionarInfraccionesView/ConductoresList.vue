<template>
  <div class="conductores-list">
    <input type="text" v-model="searchQuery" placeholder="Buscar por nombre o DNI" class="form-control my-3 filtro-conductores" />
    <div class="lista-contenedor">
      <ul class="list-group mb-3 lista-scrollable">
        <li v-for="conductor in filteredConductores" :key="conductor.id" @click="selectConductor(conductor)" class="list-group-item">
          <span class="invisible-id">{{ conductor.id }}</span>
          {{ conductor.dni }} - {{ conductor.primerNombre }} {{ conductor.segundoNombre }} {{ conductor.apellidoPaterno }} {{ conductor.apellidoMaterno }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="../../js/GestionarInfraccionesView/ConductoresListSc.js"></script>
<style scoped src="../../assets/styles/St_GestionarInfraccionesView/ConductoresListSt.css"></style>

  