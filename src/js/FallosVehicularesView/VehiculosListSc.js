import axios from 'axios';

export default {
  name: 'VehiculosList',
  data() {
    return {
      searchQuery: '', // Filtro de búsqueda
      vehiculos: [] // Lista de vehículos
    };
  },
  computed: {
    filteredVehiculos() {
      // Filtra la lista de vehículos según el filtro de búsqueda
      const query = this.searchQuery.toLowerCase();
      return this.vehiculos.filter(vehiculo => 
        vehiculo.placa.toLowerCase().includes(query) ||
        vehiculo.marca.toLowerCase().includes(query) ||
        vehiculo.modelo.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    async fetchVehiculos() {
      // Método para obtener la lista de vehículos desde la API
      try {
        const response = await axios.get('http://localhost:8069/api/vehiculos/listar');
        this.vehiculos = response.data;
      } catch (error) {
        console.error('Error al obtener los vehículos:', error);
      }
    },
    selectVehiculo(vehiculo) {
      // Método para seleccionar un vehículo
      this.$emit('select', vehiculo);
    }
  },
  created() {
    // Obtiene la lista de vehículos cuando el componente es creado
    this.fetchVehiculos();
  }
};
