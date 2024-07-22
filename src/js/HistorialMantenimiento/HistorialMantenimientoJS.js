import axios from 'axios';
import defaultVehicleImg from "@/assets/images/default-vehicle.jpg";

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
    async fetchData() {
      try {
        const mantenimientosResponse = await axios.get('http://localhost:8069/api/mantenimiento/salida/listar');
        const vehiculosResponse = await axios.get('http://localhost:8069/api/vehiculos/listar');
        const choferesResponse = await axios.get('http://localhost:8069/api/choferes/listar');
        this.mantenimientos = mantenimientosResponse.data;
        this.vehiculos = vehiculosResponse.data;
        this.choferes = choferesResponse.data;
      } catch (error) {
        console.error('Error fetching data:', error);
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
        const chofer = this.getChofer(mantenimiento.mantenimientoIngreso.idChofer);
        this.mantenimientoRealizado = {
          placaVehiculo: vehiculo.placa,
          dniChofer: chofer ? chofer.dni : '',
          kilometrajeIngresado: mantenimiento.mantenimientoIngreso.kilometrajeIngresado,
          observaciones: mantenimiento.mantenimientoIngreso.observaciones,
        };
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
      try {
        const response = await axios.post('http://localhost:8069/api/mantenimiento/ingreso/guardar', this.mantenimientoRealizado);
        console.log('Mantenimiento guardado:', response.data);
        this.limpiarCampos();
        this.$toast.open({
          message: 'Operación completada con éxito.',
          type: 'success',
          duration: 5000,
          position: 'top-right'
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (error) {
        console.error('Error guardando mantenimiento:', error);
        this.$toast.open({
          message: 'Error guardando mantenimiento.',
          type: 'error',
          duration: 5000,
          position: 'top-right'
        });
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
      this.currentPage = 1;
    },
    getVehicleImage(img) {
      if (img) {
        try {
          return require(`@/assets/vehiculos/${img}`);
        } catch (e) {
          return defaultVehicleImg;
        }
      } else {
        return defaultVehicleImg;
      }
    }
  },
  created() {
    this.fetchData();
  }
};
