<template>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Código Interno</th>
            <th>Descripción</th>
            <th>Fabricante</th>
            <th>Fecha de Fabricación</th>
            <th>Cantidad en Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="repuesto in paginatedRepuestos" :key="repuesto.codigoInterno">
            <td>{{ repuesto.codigoInterno }}</td>
            <td>{{ repuesto.descripcion }}</td>
            <td>{{ repuesto.fabricante }}</td>
            <td>{{ formatDate(repuesto.fechaFabricacion) }}</td>
            <td>{{ repuesto.cantidadStock }}</td>
            <td>
              <button @click="toggleEstado(repuesto)" class="btn btn-warning" :title="repuesto.estado ? 'Desactivar' : 'Activar'">
                <i class="fas" :class="repuesto.estado ? 'fa-toggle-on' : 'fa-toggle-off'"></i>
              </button>
              <button @click="$emit('edit', repuesto.id)" class="btn btn-primary" title="Editar">
                <i class="fas fa-edit"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
        <button @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
      </div>
    </div>
  </template>
  
  <script src="../../js/RepuestoView/RepuestoTableSc.js"></script>
  <style scoped src="../../assets/styles/St_RepuestoView/RepuestoTableSt.css"></style>
  