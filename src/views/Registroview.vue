<template>
  <div class="centered-container">
    <button @click="toggleRegistrationForm" class="btn btn-primary">Registrar Chofer</button>
    <div v-if="showRegistrationForm" class="registration-form">
      <form @submit.prevent="registerDriver" class="form">
        <div class="form-group">
          <label for="primerNombre" class="form-label">Primer Nombre</label>
          <input type="text" id="primerNombre" v-model="driver.primerNombre" required class="form-control">
        </div>
        <div class="form-group">
          <label for="segundoNombre" class="form-label">Segundo Nombre</label>
          <input type="text" id="segundoNombre" v-model="driver.segundoNombre" class="form-control">
        </div>
        <div class="form-group">
          <label for="apellidoPaterno" class="form-label">Apellido Paterno</label>
          <input type="text" id="apellidoPaterno" v-model="driver.apellidoPaterno" required class="form-control">
        </div>
        <div class="form-group">
          <label for="apellidoMaterno" class="form-label">Apellido Materno</label>
          <input type="text" id="apellidoMaterno" v-model="driver.apellidoMaterno" class="form-control">
        </div>
        <div class="form-group">
          <label for="dni" class="form-label" >DNI</label>
          <input type="text" id="dni" v-model="driver.dni" required class="form-control">
        </div>
        <div class="form-group">
          <label for="licenciaConducir" class="form-label">Licencia de Conducir</label>
          <input type="text" id="licenciaConducir" v-model="driver.licenciaConducir" required class="form-control">
        </div>
        <div class="form-group">
          <label for="categoriaLicencia" class="form-label">Categoría de Licencia</label>
          <select id="categoriaLicencia" v-model="driver.categoriaLicencia" required class="form-control">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div class="form-group">
          <label for="fechaVencimientoLicencia" class="form-label">Fecha de Vencimiento de Licencia</label>
          <input type="date" id="fechaVencimientoLicencia" v-model="driver.fechaVencimientoLicencia" required class="form-control">
          <p v-if="dateError" class="text-danger">{{ dateErrorMessage }}</p>
        </div>
        <div class="form-group">
          <label for="telefono" class="form-label">Teléfono</label>
          <input type="text" id="telefono" v-model="driver.telefono" class="form-control">
        </div>
        <div class="button-group">
          <button type="submit" class="btn btn-success">Registrar</button>
          <button @click="toggleRegistrationForm" class="btn btn-secondary">Cancelar</button>
        </div>
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
          <th>Acciones</th>
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
          <td>{{ formatDate(driver.fechaVencimientoLicencia) }}</td>
          <td>
            <button @click="deleteDriver(driver.id)" class="btn btn-sm btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <confirmation-modal
      :isVisible="showModal"
      message="¿Estás seguro de que deseas eliminar este chofer?"
      @confirm="confirmDelete"
      @cancel="closeModal"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal.vue';

export default {
  components: {
    ConfirmationModal
  },
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
      showModal: false,
      showRegistrationForm: false,
      currentDriverId: null,
      dateError: false,
      dateErrorMessage: 'La licencia está vencida.'
    };
  },
  computed: {
    filteredDrivers() {
      return this.drivers.filter(driver =>
        driver.primerNombre.toLowerCase().includes(this.search.toLowerCase()) ||
        driver.segundoNombre.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
    fetchDrivers() {
      axios.get('http://localhost:8069/api/choferes/listar')
        .then(response => {
          this.drivers = response.data;
        })
        .catch(error => console.error("Error fetching drivers:", error));
    },
    registerDriver() {
    if (!this.driver.primerNombre || !this.driver.apellidoPaterno || !this.driver.dni || !this.driver.licenciaConducir || !this.driver.categoriaLicencia || !this.driver.fechaVencimientoLicencia || !this.driver.telefono) {
      window.alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
    if (!this.isFutureDate(this.driver.fechaVencimientoLicencia)) {
      this.dateError = true;
      return;
    }
    this.dateError = false;
    axios.post('http://localhost:8069/api/choferes/guardar', this.driver)
      .then(response => {
        this.fetchDrivers();
        this.driver = {};
        this.showRegistrationForm = false;
      })
      .catch(error => console.error("Failed to register driver:", error));
  },
    deleteDriver(id) {
      this.currentDriverId = id;
      this.showModal = true;
    },
    confirmDelete() {
      axios.delete(`http://localhost:8069/api/choferes/eliminar/${this.currentDriverId}`)
        .then(response => {
          this.fetchDrivers();
          this.showModal = false;
        })
        .catch(error => console.error("Error deleting driver:", error));
    },
    closeModal() {
      this.showModal = false;
    },
    formatDate(dateString) {
      if (!dateString) return 'No disponible';
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    isFutureDate(dateString) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const inputDate = new Date(dateString);
      return inputDate > today;
    },
    toggleRegistrationForm() {
      this.showRegistrationForm = !this.showRegistrationForm;
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
  width: 70%;  /* Ajusta el ancho de los inputs a 70% */
  padding: 0.375rem 0.75rem;
  margin: auto; 
  text-align: center; /* Center text inside inputs */
}
.form-label {
  width: 100%; /* O ajusta según tu preferencia */
  padding-right: 10px; /* Espacio a la derecha del label */
  margin-right: 10px; /* Añade más espacio a la derecha */
  text-align: center; /* Alinea el texto a la derecha */
}
.registration-form {
  width: 45%; /* Ajusta el ancho según sea necesario */
  margin: 1rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #f8f9fa; /* Light grey background */
  box-shadow: 0 0 10px rgba(0,0,0,0.1); /* Subtle shadow for depth */
}
.btn-primary, .btn-secondary {
  width: auto;
  padding: 0.5rem 1rem;
  margin: 0.2rem;
}
.btn-success, .btn-secondary {
  width: 150px; /* Set a common width */
  height: 50px; /* Set a common height */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  box-sizing: border-box; /* Ensure padding and border are included in the dimensions */
}
.btn-danger {
  width: auto;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: #f44336; /* Red for danger actions */
  border: none;
}
.table {
  margin-top: 2rem; /* More space above the table */
}
.button-group {
  display: flex;
  justify-content: center; /* Center buttons horizontally */
  gap: 10px; /* Space between buttons */
  margin-top: 20px;
}

.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
