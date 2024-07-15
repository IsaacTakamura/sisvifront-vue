import axios from 'axios';

export default {
  name: 'ChoferesList',
  data() {
    return {
      searchQuery: '',
      choferes: []
    };
  },
  computed: {
    filteredChoferes() {
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
      try {
        const response = await axios.get('http://localhost:8069/api/choferes/listar');
        const choferes = response.data;

        const promises = choferes.map(async (chofer) => {
          try {
            const infraccionesResponse = await axios.get(`http://localhost:8069/api/infracciones/listar/chofer/${chofer.id}`);
            chofer.strikes = infraccionesResponse.data.filter(infraccion => infraccion.estado).length;
          } catch (error) {
            console.error(`Error al obtener infracciones para el chofer con ID ${chofer.id}:`, error);
            chofer.strikes = 0; // Set strikes to 0 if there's an error fetching infractions
          }
        });

        await Promise.all(promises);
        this.choferes = choferes;
      } catch (error) {
        console.error('Error al obtener los conductores:', error);
      }
    },
    selectChofer(chofer) {
      this.$emit('select', chofer);
    }
  },
  created() {
    this.fetchChoferes();
  }
};
