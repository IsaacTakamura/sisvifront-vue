<template>
  <div class="infracciones-table">
    <div class="filter-container">
      <input type="text" v-model="searchQuery" placeholder="Buscar infracción..." class="form-control filtro-busqueda" />
      <div class="buttons">
        <button @click="toggleEstado" class="btn btn-secondary">
          <i :class="[estado ? 'fas fa-eye-slash' : 'fas fa-eye']"></i>
        </button>
        <button @click="openRegistrarModal" class="btn btn-primary">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>
    <table v-if="pagedInfracciones.length" class="table table-bordered">
      <thead>
        <tr>
          <th>Vehículo</th>
          <th>Observaciones</th>
          <th>Ubicación</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="infraccion in pagedInfracciones" :key="infraccion.id" :class="{ inactive: !infraccion.estado }">
          <td>{{ infraccion.vehiculo.placa }} - {{ infraccion.vehiculo.marca }} {{ infraccion.vehiculo.modelo }}</td>
          <td>{{ truncateText(infraccion.observaciones, 30) }}</td>
          <td>{{ infraccion.ubicacion }}</td>
          <td>{{ formatDate(infraccion.fechaRegistro) }}</td>
          <td>
            <button @click="cambiarEstado(infraccion.id)" class="btn btn-warning">
              <i class="fas fa-exchange-alt"></i>
            </button>
            <button @click="emitirAbrirInformeModal(infraccion.id)" class="btn btn-info">
              <i class="fas fa-file-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No hay infracciones registradas para este conductor.</p>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
      <span v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{ active: currentPage === page }">{{ page }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
    </div>
  </div>
</template>

<script src="../../js/GestionFaltasView/InfraccionesTableSc.js"></script>
<style scoped src="../../assets/styles/St_GestionFaltasView/InfraccionesTableSt.css"></style>
