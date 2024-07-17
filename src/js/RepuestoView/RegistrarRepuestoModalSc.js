import axios from 'axios';

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      repuesto: {
        codigoInterno: '',
        descripcion: '',
        fabricante: '',
        fechaFabricacion: '',
        cantidadStock: 0
      },
      errorMessage: ''
    };
  },
  methods: {
    handleClose() {
      this.$emit('close');
      this.repuesto = {
        codigoInterno: '',
        descripcion: '',
        fabricante: '',
        fechaFabricacion: '',
        cantidadStock: 0
      };
      this.errorMessage = '';
    },
    handleSubmit() {
      if (!this.repuesto.codigoInterno || !this.repuesto.descripcion || !this.repuesto.fabricante || !this.repuesto.fechaFabricacion || this.repuesto.cantidadStock <= 0) {
        this.errorMessage = 'Todos los campos son obligatorios y la cantidad debe ser mayor a 0.';
        return;
      }

      axios.post('http://localhost:8069/api/repuestos/registrar', this.repuesto)
        .then(response => {
          this.handleClose();
          this.$emit('refresh');
        })
        .catch(error => {
          console.error('Error registrando el repuesto:', error);
          this.errorMessage = 'Error registrando el repuesto. Intente nuevamente.';
        });
    }
  }
};
