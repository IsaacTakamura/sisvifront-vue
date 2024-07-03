<template>
  <div class="centered-container">
    <button @click="toggleRegistrationForm" class="btn btn-primary">Registrar Chofer</button>
    <div v-if="showRegistrationForm" class="registration-form">
      <form @submit.prevent="confirmRegisterDriver" class="form">
        <div class="form-group">
          <label for="primerNombre" class="form-label">Primer Nombre</label>
          <input type="text" id="primerNombre" v-model="driver.primerNombre" class="form-control">
          <p v-if="errors.primerNombre" class="text-danger error-message">{{ errors.primerNombre }}</p>
        </div>
        <div class="form-group">
          <label for="segundoNombre" class="form-label">Segundo Nombre</label>
          <input type="text" id="segundoNombre" v-model="driver.segundoNombre" class="form-control">
          <p v-if="errors.segundoNombre" class="text-danger error-message">{{ errors.segundoNombre }}</p>
        </div>
        <div class="form-group">
          <label for="apellidoPaterno" class="form-label">Apellido Paterno</label>
          <input type="text" id="apellidoPaterno" v-model="driver.apellidoPaterno" class="form-control">
          <p v-if="errors.apellidoPaterno" class="text-danger error-message">{{ errors.apellidoPaterno }}</p>
        </div>
        <div class="form-group">
          <label for="apellidoMaterno" class="form-label">Apellido Materno</label>
          <input type="text" id="apellidoMaterno" v-model="driver.apellidoMaterno" class="form-control">
          <p v-if="errors.apellidoMaterno" class="text-danger error-message">{{ errors.apellidoMaterno }}</p>
        </div>
        <div class="form-group">
          <label for="dni" class="form-label">DNI</label>
          <input type="text" id="dni" v-model="driver.dni" class="form-control">
          <p v-if="errors.dni" class="text-danger error-message">{{ errors.dni }}</p>
        </div>
        <div class="form-group">
          <label for="licenciaConducir" class="form-label">Licencia de Conducir</label>
          <input type="text" id="licenciaConducir" v-model="driver.licenciaConducir" class="form-control">
          <p v-if="errors.licenciaConducir" class="text-danger error-message">{{ errors.licenciaConducir }}</p>
        </div>
        <div class="form-group">
          <label for="categoriaLicencia" class="form-label">Categoría de Licencia</label>
          <select id="categoriaLicencia" v-model="driver.categoriaLicencia" class="form-control">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
          <p v-if="errors.categoriaLicencia" class="text-danger error-message">{{ errors.categoriaLicencia }}</p>
        </div>
        <div class="form-group">
          <label for="fechaVencimientoLicencia" class="form-label">Fecha de Vencimiento de Licencia</label>
          <input type="date" id="fechaVencimientoLicencia" v-model="driver.fechaVencimientoLicencia"
            class="form-control">
          <p v-if="errors.fechaVencimientoLicencia" class="text-danger error-message">{{ errors.fechaVencimientoLicencia
            }}</p>
          <p v-if="dateError" class="text-danger error-message">{{ dateErrorMessage }}</p>
        </div>
        <div class="form-group">
          <label for="telefono" class="form-label">Teléfono</label>
          <input type="text" id="telefono" v-model="driver.telefono" class="form-control">
          <p v-if="errors.telefono" class="text-danger error-message">{{ errors.telefono }}</p>
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
            <button @click="editDriver(driver.id)" class="btn btn-sm btn-warning">Editar</button>
            <button @click="deleteDriver(driver.id)" class="btn btn-sm btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <confirmation-modal :isVisible="showModal" message="¿Estás seguro de que deseas eliminar este chofer?"
      @confirm="confirmDelete" @cancel="closeModal" />
    <editar-chofer-modal :isVisible="showEditModal" :driver="selectedDriver" @close="closeEditModal"
      @save="updateDriver" />
    <confirmacion-registro-modal :isVisible="showConfirmRegisterModal" @close="closeConfirmRegisterModal"
      @confirm="registerDriver" />
  </div>
</template>

<script>
import axios from 'axios';
import ConfirmationModal from './M.Choferes/ConfirmationModal.vue';
import EditarChoferModal from './M.Choferes/EditarChoferModal.vue';
import ConfirmacionRegistroModal from './M.Choferes/ConfirmacionRegistroModal.vue';

export default {
  components: {
    ConfirmationModal,
    EditarChoferModal,
    ConfirmacionRegistroModal
  },
  data() {
    // Inicializa los datos del componente
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
      dateErrorMessage: 'La licencia está vencida.',
      showEditModal: false,
      selectedDriver: {},
      showConfirmRegisterModal: false,
      errors: {}
    };
  },
  // Calcula los choferes filtrados por el término de búsqueda
  computed: {
    filteredDrivers() {
      return this.drivers.filter(driver => {
        const searchTerm = this.search.toLowerCase();
        return (
          driver.primerNombre.toLowerCase().includes(searchTerm) ||
          driver.segundoNombre.toLowerCase().includes(searchTerm) ||
          driver.apellidoPaterno.toLowerCase().includes(searchTerm) ||
          driver.apellidoMaterno.toLowerCase().includes(searchTerm) ||
          driver.dni.toLowerCase().includes(searchTerm) ||
          driver.telefono.toLowerCase().includes(searchTerm) ||
          driver.categoriaLicencia.toLowerCase().includes(searchTerm) ||
          driver.licenciaConducir.toLowerCase().includes(searchTerm) ||
          this.formatDate(driver.fechaVencimientoLicencia).toLowerCase().includes(searchTerm)
        );
      });
    }
  },
  // Métodos del componente
  // Se ejecutan al interactuar con el componente
  methods: {
    fetchDrivers() {
      axios.get('http://localhost:8069/api/choferes/listar')
        .then(response => {
          this.drivers = response.data;
        })
        .catch(error => console.error("Error fetching drivers:", error));
    },
    // Método para confirmar el registro de un chofer
    confirmRegisterDriver() {
      this.errors = {};
      let valid = true;

      if (!this.driver.primerNombre) {
        this.errors.primerNombre = 'Por favor, ingrese el primer nombre.';
        valid = false;
      }
      if (!this.driver.segundoNombre) {
        this.errors.segundoNombre = 'Por favor, ingrese el segundo nombre.';
        valid = false;
      }
      if (!this.driver.apellidoPaterno) {
        this.errors.apellidoPaterno = 'Por favor, ingrese el apellido paterno.';
        valid = false;
      }
      if (!this.driver.apellidoMaterno) {
        this.errors.apellidoMaterno = 'Por favor, ingrese el apellido materno.';
        valid = false;
      }
      if (!this.driver.dni) {
        this.errors.dni = 'Por favor, ingrese el DNI.';
        valid = false;
      }
      if (!this.driver.licenciaConducir) {
        this.errors.licenciaConducir = 'Por favor, ingrese la licencia de conducir.';
        valid = false;
      }
      if (!this.driver.categoriaLicencia) {
        this.errors.categoriaLicencia = 'Por favor, seleccione la categoría de licencia.';
        valid = false;
      }
      if (!this.driver.fechaVencimientoLicencia) {
        this.errors.fechaVencimientoLicencia = 'Por favor, seleccione la fecha de vencimiento de la licencia.';
        valid = false;
      } else if (!this.isFutureDate(this.driver.fechaVencimientoLicencia)) {
        this.dateError = true;
        valid = false;
      }
      if (!this.driver.telefono) {
        this.errors.telefono = 'Por favor, ingrese el número de teléfono.';
        valid = false;
      }

      if (valid) {
        this.showConfirmRegisterModal = true;
      }
    },
    // Método para registrar un chofer
    registerDriver() {
      if (!this.isFutureDate(this.driver.fechaVencimientoLicencia)) {
        this.dateError = true;
        return;
      }
      this.dateError = false;

      // Ajustar la fecha sumando un día
      const driverCopy = { ...this.driver };
      driverCopy.fechaVencimientoLicencia = this.adjustDate(driverCopy.fechaVencimientoLicencia);

      axios.post('http://localhost:8069/api/choferes/guardar', driverCopy)
        .then(response => {
          this.fetchDrivers();
          this.driver = {
            primerNombre: '',
            segundoNombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            dni: '',
            licenciaConducir: '',
            categoriaLicencia: '',
            fechaVencimientoLicencia: '',
            telefono: ''
          };
          this.showRegistrationForm = false;
          this.showConfirmRegisterModal = false;
        })
        .catch(error => console.error("Failed to register driver:", error));
    },
    // Método para eliminar un chofer
    deleteDriver(id) {
      this.currentDriverId = id;
      this.showModal = true;
    },
    // Método para confirmar la eliminación de un chofer
    confirmDelete() {
      axios.delete(`http://localhost:8069/api/choferes/eliminar/${this.currentDriverId}`)
        .then(response => {
          this.fetchDrivers();
          this.showModal = false;
        })
        .catch(error => console.error("Error deleting driver:", error));
    },
    // Método para cerrar el modal de confirmación
    closeModal() {
      this.showModal = false;
    },
    // Método para cerrar el modal de confirmación de registro
    closeConfirmRegisterModal() {
      this.showConfirmRegisterModal = false;
    },
    // Método para editar un chofer
    editDriver(id) {
      axios.get(`http://localhost:8069/api/choferes/listar/${id}`)
        .then(response => {
          this.selectedDriver = response.data;
          this.selectedDriver.fechaVencimientoLicencia = this.formatDateForInput(this.selectedDriver.fechaVencimientoLicencia);
          this.showEditModal = true;
        })
        .catch(error => console.error("Error fetching driver:", error));
    },
    // Método para actualizar un chofer
    updateDriver(driver) {
      const driverCopy = { ...driver };
      driverCopy.fechaVencimientoLicencia = this.adjustDate(driverCopy.fechaVencimientoLicencia);

      axios.put(`http://localhost:8069/api/choferes/actualizar/${driverCopy.id}`, driverCopy)
        .then(response => {
          this.fetchDrivers();
          this.showEditModal = false;
        })
        .catch(error => console.error("Failed to update driver:", error));
    },
    // Método para cerrar el modal de edición
    closeEditModal() {
      this.showEditModal = false;
      this.selectedDriver = {};
    },
    // Método para formatear una fecha
    formatDate(dateString) {
      if (!dateString) return 'No disponible';
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    // Método para formatear una fecha para un input de tipo date
    formatDateForInput(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    // Método para verificar si una fecha es futura
    isFutureDate(dateString) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const inputDate = new Date(dateString);
      return inputDate > today;
    },
    // Método para ajustar una fecha sumando un día
    adjustDate(dateString) {
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1);
      return date.toISOString().split('T')[0];
    },
    // Método para mostrar u ocultar el formulario de registro
    toggleRegistrationForm() {
      this.showRegistrationForm = !this.showRegistrationForm;
    }
  },
  // Método que se ejecuta al cargar el componente
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
  width: 70%;
  /* Ajusta el ancho de los inputs a 70% */
  padding: 0.375rem 0.75rem;
  margin: auto;
  text-align: center;
  /* Center text inside inputs */
}

.form-label {
  width: 100%;
  /* O ajusta según tu preferencia */
  padding-right: 10px;
  /* Espacio a la derecha del label */
  margin-right: 10px;
  /* Añade más espacio a la derecha */
  text-align: center;
  /* Alinea el texto a la derecha */
}

.registration-form {
  width: 45%;
  /* Ajusta el ancho según sea necesario */
  margin: 1rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #f8f9fa;
  /* Light grey background */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* Subtle shadow for depth */
}

.btn-primary,
.btn-secondary {
  width: auto;
  padding: 0.5rem 1rem;
  margin: 0.2rem;
}

.btn-success,
.btn-secondary {
  width: 150px;
  /* Set a common width */
  height: 50px;
  /* Set a common height */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  box-sizing: border-box;
  /* Ensure padding and border are included in the dimensions */
}

.btn-danger {
  width: auto;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: #f44336;
  /* Red for danger actions */
  border: none;
}

.table {
  margin-top: 2rem;
  /* More space above the table */
}

.button-group {
  display: flex;
  justify-content: center;
  /* Center buttons horizontally */
  gap: 10px;
  /* Space between buttons */
  margin-top: 20px;
}

.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-danger {
  color: red;
  font-size: 0.875rem;
}

.error-message {
  text-align: center;
  margin-top: 0.25rem;
}
</style>
