import axios from 'axios';

export default {
  name: 'InfraccionesTable',
  props: {
    choferId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      infracciones: [],
      currentPage: 1,
      itemsPerPage: 3,
      searchQuery: '',
      estado: true
    };
  },
  computed: {
    pagedInfracciones() {
      const filteredInfracciones = this.infracciones
        .filter(infraccion => infraccion.estado === this.estado)
        .filter(infraccion => 
          infraccion.vehiculo.placa.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          infraccion.vehiculo.marca.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          infraccion.observaciones.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          infraccion.ubicacion.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return filteredInfracciones.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.infracciones.filter(infraccion => infraccion.estado === this.estado).length / this.itemsPerPage);
    }
  },
  methods: {
    async fetchInfracciones() {
      try {
        const response = await axios.get(`http://localhost:8069/api/infracciones/listar/chofer/${this.choferId}`);
        const infracciones = response.data;

        for (let infraccion of infracciones) {
          const vehiculoResponse = await axios.get(`http://localhost:8069/api/vehiculos/listar/${infraccion.vehiculoId}`);
          infraccion.vehiculo = vehiculoResponse.data;
        }

        this.infracciones = infracciones;
        this.currentPage = 1;
      } catch (error) {
        console.error('Error al obtener las infracciones:', error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    truncateObservaciones(observaciones) {
      return observaciones.length > 20 ? observaciones.slice(0, 20) + '...' : observaciones;
    },
    changePage(page) {
      this.currentPage = page;
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
    async cambiarEstado(id) {
      try {
        await axios.put(`http://localhost:8069/api/infracciones/cambiar-estado/${id}`);
        this.fetchInfracciones();
        this.$emit('actualizar-strikes');
        this.$emit('actualizar-choferes');
        this.updateChoferState(); // Actualizar el estado del conductor si es necesario
      } catch (error) {
        console.error('Error al cambiar el estado de la infracción:', error);
      }
    },
    async updateChoferState() {
      try {
        const response = await axios.get(`http://localhost:8069/api/infracciones/listar/chofer/${this.choferId}`);
        const infracciones = response.data;
        const strikes = infracciones.filter(infraccion => infraccion.estado).length;

        if (strikes >= 5) {
          await axios.put(`http://localhost:8069/api/choferes/cambiar-estado/${this.choferId}`, { estado: false });
          this.$emit('actualizar-choferes');
        } else if (strikes <= 4) {
          await axios.put(`http://localhost:8069/api/choferes/cambiar-estado/${this.choferId}`, { estado: true });
          this.$emit('actualizar-choferes');
        }
      } catch (error) {
        console.error('Error al actualizar el estado del conductor:', error);
      }
    },
    toggleEstado() {
      this.estado = !this.estado;
      this.currentPage = 1;
    },
    openRegistrarModal() {
      this.$emit('registrar');
    },
    emitirAbrirInformeModal(id) {
      this.$emit('abrir-informe', id);
    }
  },
  watch: {
    choferId(newVal) {
      if (newVal) {
        this.fetchInfracciones();
      }
    }
  },
  created() {
    if (this.choferId) {
      this.fetchInfracciones();
    }
  }
};
