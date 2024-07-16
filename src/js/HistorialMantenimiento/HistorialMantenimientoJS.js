import axios from 'axios';

export default {
  data() {
    return {
      mantenimientos: [],
      vehiculos: [],
      choferes: [],
      filtroPlaca: '',
      mantenimientoSeleccionado: null,
      vehiculoSeleccionado: null,
      mantenimientoRealizado: {
        placaVehiculo: '',
        dniChofer: '',
        kilometrajeIngresado: '',
        observaciones: '',
      },
      currentPage: 1,
      rowsPerPage: 5,
    };
  },
  computed: {
    mantenimientosFiltrados() {
      return this.mantenimientos.filter(mantenimiento => {
        const vehiculo = this.getVehiculo(mantenimiento.mantenimientoIngreso.idVehiculo);
        return vehiculo && vehiculo.placa.includes(this.filtroPlaca);
      });
    },
    paginatedMantenimientos() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.mantenimientosFiltrados.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.mantenimientosFiltrados.length / this.rowsPerPage);
    },
  },
  methods: {
    async fetchMantenimientos() {
      const url = 'http://localhost:8069/api/mantenimiento/salida/listar';
      try {
        const response = await axios.get(url);
        this.mantenimientos = response.data;
        console.log('Mantenimientos:', this.mantenimientos);
      } catch (error) {
        console.error('Error fetching mantenimientos:', error);
      }
    },
    async fetchVehiculos() {
      const url = 'http://localhost:8069/api/vehiculos/listar';
      try {
        const response = await axios.get(url);
        this.vehiculos = response.data;
        console.log('Vehiculos:', this.vehiculos);
      } catch (error) {
        console.error('Error fetching vehiculos:', error);
      }
    },
    async fetchChoferes() {
      const url = 'http://localhost:8069/api/choferes/listar';
      try {
        const response = await axios.get(url);
        this.choferes = response.data;
        console.log('Choferes:', this.choferes);
      } catch (error) {
        console.error('Error fetching choferes:', error);
      }
    },
    getVehiculo(id) {
      return this.vehiculos.find(vehiculo => vehiculo.id === id);
    },
    getChofer(id) {
      return this.choferes.find(chofer => chofer.id === id);
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    async selectMantenimiento(mantenimiento) {
      this.mantenimientoSeleccionado = mantenimiento;
      const vehiculoId = mantenimiento.mantenimientoIngreso.idVehiculo;
      const vehiculo = this.getVehiculo(vehiculoId);
      if (vehiculo) {
        this.vehiculoSeleccionado = vehiculo;
        this.mantenimientoRealizado.placaVehiculo = vehiculo.placa;
        this.mantenimientoRealizado.dniChofer = this.getChofer(mantenimiento.mantenimientoIngreso.idChofer).dni;
        this.mantenimientoRealizado.kilometrajeIngresado = mantenimiento.mantenimientoIngreso.kilometrajeIngresado;
        this.mantenimientoRealizado.observaciones = mantenimiento.mantenimientoIngreso.observaciones;
      } else {
        try {
          const response = await axios.get(`http://localhost:8069/api/vehiculos/${vehiculoId}`);
          this.vehiculoSeleccionado = response.data;
        } catch (error) {
          console.error('Error fetching vehiculo:', error);
        }
      }
    },
    async guardarMantenimiento() {
      const url = 'http://localhost:8069/api/mantenimiento/ingreso/guardar';
      try {
        const response = await axios.post(url, this.mantenimientoRealizado);
        console.log('Mantenimiento guardado:', response.data);
        this.limpiarCampos();
        window.location.reload(); // Recargar la página
      } catch (error) {
        console.error('Error guardando mantenimiento:', error);
      }
    },
    limpiarCampos() {
      this.mantenimientoRealizado = {
        placaVehiculo: '',
        dniChofer: '',
        kilometrajeIngresado: '',
        observaciones: '',
      };
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    changeRowsPerPage() {
      this.currentPage = 1; // Reset page number to 1 when rows per page changes
    }
  },
  created() {
    this.fetchMantenimientos();
    this.fetchVehiculos();
    this.fetchChoferes();
  },
};
