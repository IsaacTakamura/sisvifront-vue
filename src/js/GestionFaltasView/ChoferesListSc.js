import axios from 'axios';

export default {
  name: 'ChoferesList',
  data() {
    return {
      searchQuery: '', // Filtro de búsqueda
      choferes: [] // Lista de conductores
    };
  },
  computed: {
    filteredChoferes() {
      // Filtra la lista de conductores según el filtro de búsqueda
      const query = this.searchQuery.toLowerCase();
      return this.choferes.filter(chofer => 
        chofer.primerNombre.toLowerCase().includes(query) ||
        chofer.segundoNombre.toLowerCase().includes(query) ||
        chofer.apellidoPaterno.toLowerCase().includes(query) ||
        chofer.apellidoMaterno.toLowerCase().includes(query) ||
        chofer.dni.includes(query)
      );
    }
  },
  methods: {
    async fetchChoferes() {
      // Método para obtener la lista de conductores desde la API
      try {
        const response = await axios.get('http://localhost:8069/api/choferes/listar');
        this.choferes = response.data;
      } catch (error) {
        console.error('Error al obtener los conductores:', error);
      }
    },
    selectChofer(chofer) {
      // Método para seleccionar un conductor
      this.$emit('select', chofer);
    }
  },
  created() {
    // Obtiene la lista de conductores cuando el componente es creado
    this.fetchChoferes();
  }
};
