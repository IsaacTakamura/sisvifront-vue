import axios from 'axios';
import ConfirmationModal from '../../components/modals/M_RegistrarView/ConfirmationModal.vue';
import EditarChoferModal from '../../components/modals/M_RegistrarView/EditarChoferModal.vue';
import ConfirmacionRegistroModal from '../../components/modals/M_RegistrarView/ConfirmacionRegistroModal.vue';
import DriverForm from '../../components/C_RegistrarView/DriverForm.vue';
import DriverTable from '../../components/C_RegistrarView/DriverTable.vue';
import FilterButtons from '../../components/C_RegistrarView/FilterButtons.vue';

export default {
  components: {
    ConfirmationModal,
    EditarChoferModal,
    ConfirmacionRegistroModal,
    DriverForm,
    DriverTable,
    FilterButtons
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
        this.errors.fechaVencimientoLicencia = 'Por favor, seleccione Fecha-Vencimiento.';
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
    // Método para establecer la opción de filtro
    setFilter(filterOption) {
      this.filterOption = filterOption;
    }
  },
  // Método que se ejecuta al crear el componente
  created() {
    this.fetchDrivers();
  }
}
