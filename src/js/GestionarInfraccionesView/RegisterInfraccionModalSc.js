import axios from 'axios';

export default {
  name: 'RegisterInfraccionModal',
  props: {
    choferId: {
      type: Number,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      vehiculoId: null,
      observaciones: '',
      ubicacion: '',
      vehiculos: []
    };
  },
  methods: {
    async fetchVehiculos() {
      try {
        const response = await axios.get('http://localhost:8069/api/vehiculos/listar');
        this.vehiculos = response.data;
      } catch (error) {
        console.error('Error al obtener la lista de vehículos:', error);
      }
    },
    async registerInfraccion() {
      try {
        await axios.post('http://localhost:8069/api/infracciones/registrar', {
          choferId: this.choferId,
          vehiculoId: this.vehiculoId,
          observaciones: this.observaciones,
          ubicacion: this.ubicacion
        });
        this.$emit('refresh');
        this.closeModal();
      } catch (error) {
        console.error('Error al registrar la infracción:', error);
      }
    },
    closeModal() {
      this.vehiculoId = null;
      this.observaciones = '';
      this.ubicacion = '';
      this.$emit('close');
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.fetchVehiculos();
      }
    }
  }
};
