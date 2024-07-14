import axios from 'axios';

export default {
  name: 'TablaAverias',
  props: {
    vehiculoId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      averias: [],
      searchQuery: '',
      currentPage: 1,
      perPage: 3
    };
  },
  computed: {
    filteredAverias() {
      const query = this.searchQuery.toLowerCase();
      return this.averias.filter(averia =>
        averia.tipo.toLowerCase().includes(query) ||
        averia.descripcion.toLowerCase().includes(query) ||
        averia.ubicacion.toLowerCase().includes(query)
      );
    },
    paginatedAverias() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredAverias.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredAverias.length / this.perPage);
    }
  },
  methods: {
    async fetchAverias() {
      try {
        const response = await axios.get(`http://localhost:8069/api/averias/listarPorVehiculo/${this.vehiculoId}`);
        this.averias = response.data;
      } catch (error) {
        console.error('Error al obtener las averías:', error);
      }
    }
  },
  watch: {
    vehiculoId: 'fetchAverias'
  },
  created() {
    this.fetchAverias();
  }
};
