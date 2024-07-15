<template>
    <div class="tabla-averias">
      <input type="text" v-model="searchQuery" placeholder="Buscar averías" class="form-control my-3" />
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Ubicación</th>
            <th>Fecha de Registro</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="averia in paginatedAverias" :key="averia.id">
            <td>{{ averia.id }}</td>
            <td>{{ averia.tipo }}</td>
            <td>{{ averia.descripcion }}</td>
            <td>{{ averia.ubicacion }}</td>
            <td>{{ new Date(averia.fechaRegistro).toLocaleDateString() }}</td>
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
    </div>
  </template>
  
  <script src="../../js/FallosVehicularesView/TablaAveriasSc.js"></script>
  <style scoped src="../../assets/styles/St_FallosVehicularesView/TablaAveriasSt.css"></style>
  