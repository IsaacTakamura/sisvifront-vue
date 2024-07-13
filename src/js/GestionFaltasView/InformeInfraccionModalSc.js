import axios from 'axios';

export default {
  name: 'InformeInfraccionModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    infraccionId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      informe: {
        conductor: '',
        vehiculo: '',
        observaciones: '',
        ubicacion: '',
        fecha: ''
      }
    };
  },
  methods: {
    async fetchInforme() {
      try {
        const response = await axios.get(`http://localhost:8069/api/infracciones/obtener/${this.infraccionId}`);
        const infraccion = response.data;
        
        const choferResponse = await axios.get(`http://localhost:8069/api/choferes/listar/${infraccion.choferId}`);
        const vehiculoResponse = await axios.get(`http://localhost:8069/api/vehiculos/listar/${infraccion.vehiculoId}`);
        
        this.informe = {
          conductor: `${choferResponse.data.primerNombre} ${choferResponse.data.segundoNombre} ${choferResponse.data.apellidoPaterno} ${choferResponse.data.apellidoMaterno}`,
          vehiculo: vehiculoResponse.data.placa,
          observaciones: infraccion.observaciones,
          ubicacion: infraccion.ubicacion,
          fecha: new Date(infraccion.fechaRegistro).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        };
      } catch (error) {
        console.error('Error al obtener el informe de la infracción:', error);
      }
    }
  },
  watch: {
    infraccionId(newVal) {
      if (newVal) {
        this.fetchInforme();
      }
    },
    isVisible(newVal) {
      if (newVal) {
        this.fetchInforme();
      }
    }
  }
};
