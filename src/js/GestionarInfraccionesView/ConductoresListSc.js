import axios from 'axios';

export default {
  name: 'ConductoresList',
  data() {
    return {
      searchQuery: '',
      conductores: []
    };
  },
  computed: {
    filteredConductores() {
      const query = this.searchQuery.toLowerCase();
      return this.conductores.filter(conductor =>
        conductor.dni.toLowerCase().includes(query) ||
        `${conductor.primerNombre} ${conductor.segundoNombre} ${conductor.apellidoPaterno} ${conductor.apellidoMaterno}`.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    async fetchConductores() {
      try {
        const response = await axios.get('http://localhost:8069/api/choferes/listar');
        this.conductores = response.data;
      } catch (error) {
        console.error('Error al obtener la lista de conductores:', error);
      }
    },
    selectConductor(conductor) {
      this.$emit('select', conductor);
    }
  },
  created() {
    this.fetchConductores();
  }
};
