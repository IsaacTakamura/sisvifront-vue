<template>
  <div class="infracciones-table">
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Buscar infracción" class="form-control" />
      <button @click="toggleView">
        <i :class="viewIcon"></i>
      </button>
      <button @click="openRegisterModal">
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Vehículo</th>
          <th>Observaciones</th>
          <th>Ubicación</th>
          <th>Fecha de Registro</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="infraccion in paginatedInfracciones" :key="infraccion.id" :class="{ transparent: !infraccion.estado }">
          <td class="invisible-id">{{ infraccion.id }}</td>
          <td>{{ infraccion.vehiculoPlaca }}</td>
          <td>{{ infraccion.observaciones }}</td>
          <td>{{ infraccion.ubicacion }}</td>
          <td>{{ new Date(infraccion.fechaRegistro).toLocaleDateString() }}</td>
        </tr>
      </tbody>
    </table>
    <nav>
      <ul class="pagination">
        <li class="page-item" v-for="page in totalPages" :key="page">
          <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
        </li>
      </ul>
    </nav>
    <register-infraccion-modal 
      :chofer-id="choferId" 
      :visible="showRegisterModal" 
      @refresh="fetchInfracciones" 
      @close="showRegisterModal = false" 
    />
  </div>
</template>

<script src="../../js/GestionarInfraccionesView/InfraccionesTableSc.js"></script>
<style scoped src="../../assets/styles/St_GestionarInfraccionesView/InfraccionesTableSt.css"></style>

  