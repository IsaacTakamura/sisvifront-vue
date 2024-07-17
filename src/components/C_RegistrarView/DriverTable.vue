<template>
  <div>
    <table class="table table-striped mt-3">
      <thead>
        <tr>
          <!-- Encabezados de las columnas de la tabla -->
          <th>ID</th>
          <th>Primer Nombre</th>
          <th>Segundo Nombre</th>
          <th>Apellido Materno</th>
          <th>Apellido Paterno</th>
          <th>DNI</th>
          <th>Teléfono</th>
          <th>Categoría Licencia</th>
          <th>Licencia Conducir</th>
          <th>Fecha Venc. Licencia</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <!-- Iteración sobre la lista de choferes para generar las filas de la tabla -->
        <tr v-for="driver in paginatedDrivers" :key="driver.id" :class="{ inactive: !driver.estado }">
          <td>{{ driver.id }}</td>
          <td>{{ driver.primerNombre }}</td>
          <td>{{ driver.segundoNombre }}</td>
          <td>{{ driver.apellidoMaterno }}</td>
          <td>{{ driver.apellidoPaterno }}</td>
          <td>{{ driver.dni }}</td>
          <td>{{ driver.telefono }}</td>
          <td>{{ driver.categoriaLicencia }}</td>
          <td>{{ driver.licenciaConducir }}</td>
          <td>{{ formatDate(driver.fechaVencimientoLicencia) }}</td>
          <td>
            <!-- Botón para editar el chofer -->
            <button @click="$emit('edit', driver.id)" class="btn btn-sm btn-warning"><i class="fa-solid fa-pencil"></i></button>
            <!-- Botón para cambiar el estado del chofer -->
            <button @click="$emit('c_est', driver.id)" class="btn btn-sm btn-danger"><i class="fas fa-toggle-on"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Paginación -->
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="prevPage">Previous</button>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="nextPage">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

  
  <script src="../../js/RegistrarView/DriverTableSc.js"></script>
  
  <style scoped src="../../assets/styles/St_RegistrarView/DriverTableSt.css"></style>
  
  