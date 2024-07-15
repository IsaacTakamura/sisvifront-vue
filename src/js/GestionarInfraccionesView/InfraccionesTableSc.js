import axios from 'axios';
import RegisterInfraccionModal from '../../components/modals/M_GestionarInfraccionesView/RegisterInfraccionModal.vue';

export default {
  name: 'InfraccionesTable',
  components: {
    RegisterInfraccionModal
  },
  props: {
    choferId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      infracciones: [],
      searchQuery: '',
      currentPage: 1,
      perPage: 3,
      showRegisterModal: false,
      showOnlyActive: true
    };
  },
  computed: {
    filteredInfracciones() {
      const query = this.searchQuery.toLowerCase();
      return this.infracciones.filter(infraccion =>
        infraccion.observaciones.toLowerCase().includes(query) ||
        infraccion.ubicacion.toLowerCase().includes(query)
      ).filter(infraccion => this.showOnlyActive ? infraccion.estado : !infraccion.estado);
    },
    paginatedInfracciones() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredInfracciones.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredInfracciones.length / this.perPage);
    },
    viewIcon() {
      return this.showOnlyActive ? 'fas fa-eye' : 'fas fa-eye-slash';
    }
  },
  methods: {
    async fetchInfracciones() {
      try {
        const response = await axios.get(`http://localhost:8069/api/infracciones/listar/chofer/${this.choferId}`);
        this.infracciones = response.data;
        for (const infraccion of this.infracciones) {
          const vehiculoResponse = await axios.get(`http://localhost:8069/api/vehiculos/listar/${infraccion.vehiculoId}`);
          infraccion.vehiculoPlaca = vehiculoResponse.data.placa;
        }
      } catch (error) {
        console.error('Error al obtener las infracciones:', error);
      }
    },
    toggleView() {
      this.showOnlyActive = !this.showOnlyActive;
    },
    openRegisterModal() {
      this.showRegisterModal = true;
    }
  },
  watch: {
    choferId: 'fetchInfracciones'
  },
  created() {
    this.fetchInfracciones();
  }
};
