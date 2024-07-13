<template>
    <div class="choferes-list">
      <h2 class="title">Lista de Conductores</h2>
      <input type="text" v-model="searchQuery" placeholder="Buscar por nombre o DNI" class="form-control my-3 filtro-choferes" />
      <div class="lista-contenedor">
        <ul class="list-group mb-3 lista-scrollable">
          <li v-for="chofer in filteredChoferes" :key="chofer.id" @click="selectChofer(chofer)"
              class="list-group-item"
              :class="{ 'bg-success': chofer.strikes < 5, 'bg-danger': chofer.strikes >= 5 }">
            <span class="invisible-id">{{ chofer.id }}</span>
            {{ chofer.primerNombre }} {{ chofer.segundoNombre }} {{ chofer.apellidoPaterno }} {{ chofer.apellidoMaterno }} - {{ chofer.dni }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script src="../../js/GestionFaltasView/ChoferesListSc.js"></script>
  <style scoped src="../../assets/styles/St_GestionFaltasView/ChoferesListSt.css"></style>
  