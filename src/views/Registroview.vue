<template>
    <div class="container">
      <button @click="showRegistrationForm = true" class="btn btn-primary">Registrar Chofer</button>
      <div v-if="showRegistrationForm" class="registration-form">
        <form @submit.prevent="registerDriver">
          <div class="form-group">
            <label for="primerNombre">Primer Nombre</label>
            <input type="text" id="primerNombre" v-model="driver.primerNombre" required class="form-control">
          </div>
          <div class="form-group">
            <label for="segundoNombre">Segundo Nombre</label>
            <input type="text" id="segundoNombre" v-model="driver.segundoNombre" class="form-control">
          </div>
          <div class="form-group">
            <label for="apellidoPaterno">Apellido Paterno</label>
            <input type="text" id="apellidoPaterno" v-model="driver.apellidoPaterno" required class="form-control">
          </div>
          <div class="form-group">
            <label for="apellidoMaterno">Apellido Materno</label>
            <input type="text" id="apellidoMaterno" v-model="driver.apellidoMaterno" class="form-control">
          </div>
          <div class="form-group">
            <label for="dni">DNI</label>
            <input type="text" id="dni" v-model="driver.dni" required class="form-control">
          </div>
          <div class="form-group">
            <label for="licenciaConducir">Licencia de Conducir</label>
            <input type="text" id="licenciaConducir" v-model="driver.licenciaConducir" required class="form-control">
          </div>
          <div class="form-group">
            <label for="categoriaLicencia">Categoría de Licencia</label>
            <input type="text" id="categoriaLicencia" v-model="driver.categoriaLicencia" required class="form-control">
          </div>
          <div class="form-group">
            <label for="fechaVencimientoLicencia">Fecha de Vencimiento de Licencia</label>
            <input type="date" id="fechaVencimientoLicencia" v-model="driver.fechaVencimientoLicencia" required class="form-control">
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono</label>
            <input type="text" id="telefono" v-model="driver.telefono" class="form-control">
          </div>
          <button type="submit" class="btn btn-success">Registrar</button>
          <button @click="showRegistrationForm = false" class="btn btn-secondary">Cancelar</button>
        </form>
      </div>
      <input type="text" v-model="search" placeholder="Buscar..." class="form-control my-3">
      <table class="table table-striped mt-3">
        <thead>
          <tr>
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
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="driver in filteredDrivers" :key="driver.id">
            <td>{{ driver.id }}</td>
            <td>{{ driver.primerNombre }}</td>
            <td>{{ driver.segundoNombre }}</td>
            <td>{{ driver.apellidoMaterno }}</td>
            <td>{{ driver.apellidoPaterno }}</td>
            <td>{{ driver.dni }}</td>
            <td>{{ driver.telefono }}</td>
            <td>{{ driver.categoriaLicencia }}</td>
            <td>{{ driver.licenciaConducir }}</td>
            <td>{{ driver.fechaVencimientoLicencia | formatDate }}</td>
            <td>{{ driver.estado }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        drivers: [],
        driver: {
          primerNombre: '',
          segundoNombre: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          dni: '',
          licenciaConducir: '',
          categoriaLicencia: '',
          fechaVencimientoLicencia: '',
          telefono: ''
        },
        search: '',
        showRegistrationForm: false,
      };
    },
    computed: {
      filteredDrivers() {
        return this.drivers.filter(driver => {
          return driver.primerNombre.toLowerCase().includes(this.search.toLowerCase()) ||
                 driver.segundoNombre.toLowerCase().includes(this.search.toLowerCase());
        });
      }
    },
    methods: {
      fetchDrivers() {
        axios.get('http://localhost:8064/api/choferes/listar')
          .then(response => {
            this.drivers = response.data;
          })
          .catch(error => {
            console.error("Error fetching drivers:", error);
          });
      },
      registerDriver() {
        axios.post('http://localhost:8064/api/choferes/guardar', this.driver)
          .then(response => {
            this.fetchDrivers(); // Refresh the list
            this.driver = {}; // Reset form
            this.showRegistrationForm = false; // Close form
            console.log("Driver registered:", response.data);
          })
          .catch(error => {
            console.error("Failed to register driver:", error);
          });
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      }
    },
    created() {
      this.fetchDrivers();
    }
  }
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-control {
    width: 100%;
    padding: 0.375rem 0.75rem;
  }
  
  .registration-form {
    margin-top: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
  </style>
  