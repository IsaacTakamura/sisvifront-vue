<template>
  <div class="centered-container">
    <!-- Botón para mostrar el formulario de registro de choferes -->
    <button @click="toggleRegistrationForm" class="btn btn-primary">Registrar Chofer</button>
    
    <!-- Formulario de registro de choferes -->
    <div v-if="showRegistrationForm" class="registration-form">
      <form @submit.prevent="confirmRegisterDriver" class="form">
        <!-- Campo para el primer nombre -->
        <div class="form-group">
          <label for="primerNombre" class="form-label">Primer Nombre</label>
          <input type="text" id="primerNombre" v-model="driver.primerNombre" class="form-control">
          <p v-if="errors.primerNombre" class="text-danger error-message">{{ errors.primerNombre }}</p>
        </div>
        <!-- Campo para el segundo nombre -->
        <div class="form-group">
          <label for="segundoNombre" class="form-label">Segundo Nombre</label>
          <input type="text" id="segundoNombre" v-model="driver.segundoNombre" class="form-control">
          <p v-if="errors.segundoNombre" class="text-danger error-message">{{ errors.segundoNombre }}</p>
        </div>
        <!-- Campo para el apellido paterno -->
        <div class="form-group">
          <label for="apellidoPaterno" class="form-label">Apellido Paterno</label>
          <input type="text" id="apellidoPaterno" v-model="driver.apellidoPaterno" class="form-control">
          <p v-if="errors.apellidoPaterno" class="text-danger error-message">{{ errors.apellidoPaterno }}</p>
        </div>
        <!-- Campo para el apellido materno -->
        <div class="form-group">
          <label for="apellidoMaterno" class="form-label">Apellido Materno</label>
          <input type="text" id="apellidoMaterno" v-model="driver.apellidoMaterno" class="form-control">
          <p v-if="errors.apellidoMaterno" class="text-danger error-message">{{ errors.apellidoMaterno }}</p>
        </div>
        <!-- Campo para el DNI -->
        <div class="form-group">
          <label for="dni" class="form-label">DNI</label>
          <input type="text" id="dni" v-model="driver.dni" class="form-control">
          <p v-if="errors.dni" class="text-danger error-message">{{ errors.dni }}</p>
        </div>
        <!-- Campo para la licencia de conducir -->
        <div class="form-group">
          <label for="licenciaConducir" class="form-label">Licencia de Conducir</label>
          <input type="text" id="licenciaConducir" v-model="driver.licenciaConducir" class="form-control">
          <p v-if="errors.licenciaConducir" class="text-danger error-message">{{ errors.licenciaConducir }}</p>
        </div>
        <!-- Campo para la categoría de la licencia -->
        <div class="form-group">
          <label for="categoriaLicencia" class="form-label">Categoría de Licencia</label>
          <select id="categoriaLicencia" v-model="driver.categoriaLicencia" class="form-control">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
          <p v-if="errors.categoriaLicencia" class="text-danger error-message">{{ errors.categoriaLicencia }}</p>
        </div>
        <!-- Campo para la fecha de vencimiento de la licencia -->
        <div class="form-group">
          <label for="fechaVencimientoLicencia" class="form-label">Fecha de Vencimiento de Licencia</label>
          <input type="date" id="fechaVencimientoLicencia" v-model="driver.fechaVencimientoLicencia" class="form-control">
          <p v-if="errors.fechaVencimientoLicencia" class="text-danger error-message">{{ errors.fechaVencimientoLicencia }}</p>
          <p v-if="dateError" class="text-danger error-message">{{ dateErrorMessage }}</p>
        </div>
        <!-- Campo para el teléfono -->
        <div class="form-group">
          <label for="telefono" class="form-label">Teléfono</label>
          <input type="text" id="telefono" v-model="driver.telefono" class="form-control">
          <p v-if="errors.telefono" class="text-danger error-message">{{ errors.telefono }}</p>
        </div>
        <!-- Botones de acción del formulario -->
        <div class="button-group">
          <button type="submit" class="btn btn-success">Registrar</button>
          <button @click="toggleRegistrationForm" class="btn btn-secondary">Cancelar</button>
        </div>
      </form>
    </div>

    <!-- Campo de búsqueda -->
    <input type="text" v-model="search" placeholder="Buscar..." class="form-control my-3">
    
    <!-- Botones de filtro -->
    <div class="filter-buttons">
      <button @click="filterActive" class="btn btn-info">Mostrar Activos</button>
      <button @click="filterAll" class="btn btn-secondary">Mostrar Todos</button>
      <button @click="filterInactive" class="btn btn-danger">Mostrar Inactivos</button>
    </div>
    
    <!-- Tabla de choferes -->
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
        <tr v-for="driver in filteredDrivers" :key="driver.id" :class="{ inactive: !driver.estado }">
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
            <button @click="changeDriverState(driver.id)" class="btn btn-sm btn-danger">Cambiar Estado</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modales de confirmación y edición -->
    <confirmation-modal :isVisible="showModal" message="¿Estás seguro de que deseas cambiar el estado de este chofer?" @confirm="confirmChangeState" @cancel="closeModal" />
    <editar-chofer-modal :isVisible="showEditModal" :driver="selectedDriver" @close="closeEditModal" @save="updateDriver" />
    <confirmacion-registro-modal :isVisible="showConfirmRegisterModal" @close="closeConfirmRegisterModal" @confirm="registerDriver" />
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
    return {
      drivers: [], // Lista de choferes
      driver: { // Datos del chofer para registro y edición
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
      search: '', // Texto de búsqueda
      showModal: false, // Control de visibilidad del modal de confirmación de cambio de estado
      showRegistrationForm: false, // Control de visibilidad del formulario de registro
      currentDriverId: null, // ID del chofer actual para cambio de estado
      dateError: false, // Control de error de fecha
      dateErrorMessage: 'La licencia está vencida.', // Mensaje de error de fecha
      showEditModal: false, // Control de visibilidad del modal de edición
      selectedDriver: {}, // Chofer seleccionado para editar
      showConfirmRegisterModal: false, // Control de visibilidad del modal de confirmación de registro
      errors: {}, // Errores de validación del formulario
      filterOption: 'active' // Opción de filtro seleccionada (activos, todos, inactivos)
    };
  },
  computed: {
    filteredDrivers() {
      return this.drivers.filter(driver => {
        const searchTerm = this.search.toLowerCase();
        const matchesSearch = (
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

        if (this.filterOption === 'all') {
          return matchesSearch;
        } else if (this.filterOption === 'inactive') {
          return matchesSearch && !driver.estado;
        } else {
          return matchesSearch && driver.estado;
        }
      });
    }
  },
  methods: {
    // Método para obtener la lista de choferes desde la API
    fetchDrivers() {
      axios.get('http://localhost:8069/api/choferes/listar')
        .then(response => {
          this.drivers = response.data;
        })
        .catch(error => console.error("Error fetching drivers:", error));
    },
    // Método para validar el formulario de registro
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
    // Método para cambiar el estado de un chofer
    changeDriverState(id) {
      this.currentDriverId = id;
      this.showModal = true;
    },
    // Método para confirmar el cambio de estado
    confirmChangeState() {
      axios.put(`http://localhost:8069/api/choferes/cambiar-estado/${this.currentDriverId}`)
        .then(response => {
          this.fetchDrivers();
          this.showModal = false;
        })
        .catch(error => console.error("Error changing driver state:", error));
    },
    // Método para cerrar el modal de confirmación de cambio de estado
    closeModal() {
      this.showModal = false;
    },
    // Método para cerrar el modal de confirmación de registro
    closeConfirmRegisterModal() {
      this.showConfirmRegisterModal = false;
    },
    // Método para obtener los datos de un chofer para editar
    editDriver(id) {
      axios.get(`http://localhost:8069/api/choferes/listar/${id}`)
        .then(response => {
          this.selectedDriver = response.data;
          this.selectedDriver.fechaVencimientoLicencia = this.formatDateForInput(this.selectedDriver.fechaVencimientoLicencia);
          this.showEditModal = true;
        })
        .catch(error => console.error("Error fetching driver:", error));
    },
    // Método para actualizar los datos de un chofer
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
    // Método para formatear la fecha
    formatDate(dateString) {
      if (!dateString) return 'No disponible';
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    // Método para formatear la fecha para el campo de entrada
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
    // Método para ajustar la fecha sumando un día
    adjustDate(dateString) {
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1);
      return date.toISOString().split('T')[0];
    },
    // Método para alternar la visibilidad del formulario de registro
    toggleRegistrationForm() {
      this.showRegistrationForm = !this.showRegistrationForm;
    },
    // Método para filtrar choferes activos
    filterActive() {
      this.filterOption = 'active';
    },
    // Método para filtrar todos los choferes
    filterAll() {
      this.filterOption = 'all';
    },
    // Método para filtrar choferes inactivos
    filterInactive() {
      this.filterOption = 'inactive';
    }
  },
  // Método que se ejecuta al crear el componente
  created() {
    this.fetchDrivers();
  }
}
</script>

<style scoped>
/* Estilo para los grupos de formulario */
.form-group {
  margin-bottom: 1rem;
}

/* Estilo para los controles de formulario */
.form-control {
  width: 70%;
  padding: 0.375rem 0.75rem;
  margin: auto;
  text-align: center;
}

/* Estilo para las etiquetas de formulario */
.form-label {
  width: 100%;
  padding-right: 10px;
  margin-right: 10px;
  text-align: center;
}

/* Estilo para el formulario de registro */
.registration-form {
  width: 45%;
  margin: 1rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #f8f9fa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Estilo para los botones */
.btn-primary,
.btn-secondary,
.btn-info,
.btn-danger {
  width: 100px;
  padding: 0.5rem 1rem;
  margin: 0.2rem;
}

/* Estilo para el botón de registro */
.btn-success {
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  box-sizing: border-box;
}

/* Estilo para la tabla */
.table {
  margin-top: 2rem;
}

/* Estilo para el grupo de botones */
.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

/* Estilo para los botones de filtro */
.filter-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 10px;
}

/* Estilo para el contenedor centrado */
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Estilo para el texto de error */
.text-danger {
  color: red;
  font-size: 0.875rem;
}

/* Estilo para los mensajes de error */
.error-message {
  text-align: center;
  margin-top: 0.25rem;
}

/* Estilo para los choferes inactivos */
.inactive td:not(:last-child) {
  opacity: 0.5;
}
</style>
