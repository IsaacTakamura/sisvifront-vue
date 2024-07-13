import axios from 'axios';

export default {
  name: 'RegistrarInfraccionModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    choferId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      vehiculos: [],
      searchQuery: '',
      infraccion: {
        choferId: this.choferId,
        vehiculoId: '',
        observaciones: '',
        ubicacion: ''
      }
    };
  },
  computed: {
    filteredVehiculos() {
      const query = this.searchQuery.toLowerCase();
      return this.vehiculos.filter(vehiculo =>
        vehiculo.placa.toLowerCase().includes(query) ||
        vehiculo.marca.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    async fetchVehiculos() {
      try {
        const response = await axios.get('http://localhost:8069/api/vehiculos/listar');
        this.vehiculos = response.data;
      } catch (error) {
        console.error('Error al obtener los vehículos:', error);
      }
    },
    async handleSubmit() {
      try {
        this.infraccion.choferId = this.choferId;
        await axios.post('http://localhost:8069/api/infracciones/registrar', this.infraccion);
        this.$emit('registered');
      } catch (error) {
        console.error('Error al registrar la infracción:', error);
      }
    }
  },
  created() {
    this.fetchVehiculos();
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        this.infraccion.choferId = this.choferId;
      }
    }
  }
};
