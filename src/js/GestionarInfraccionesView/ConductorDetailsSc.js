import axios from 'axios';

export default {
  name: 'ConductorDetails',
  props: {
    conductorId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      conductor: null,
      strikes: 0
    };
  },
  methods: {
    async fetchConductorDetails() {
      try {
        const response = await axios.get(`http://localhost:8069/api/choferes/listar/${this.conductorId}`);
        this.conductor = response.data;
      } catch (error) {
        console.error('Error al obtener los detalles del conductor:', error);
      }
    }
  },
  watch: {
    conductorId: 'fetchConductorDetails'
  },
  created() {
    this.fetchConductorDetails();
  }
};
