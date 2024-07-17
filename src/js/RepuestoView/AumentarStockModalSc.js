import axios from 'axios';

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    repuestos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      codigo: '',
      cantidad: 0,
      errorMessage: ''
    };
  },
  computed: {
    filteredRepuestos() {
      return this.repuestos.filter(repuesto => repuesto.estado);
    }
  },
  methods: {
    handleClose() {
      this.$emit('close');
      this.codigo = '';
      this.cantidad = 0;
      this.errorMessage = '';
    },
    handleSubmit() {
      if (!this.codigo || this.cantidad <= 0) {
        this.errorMessage = 'Debe seleccionar un código y la cantidad debe ser mayor a 0.';
        return;
      }

      const repuesto = this.repuestos.find(r => r.codigoInterno === this.codigo);
      axios.put(`http://localhost:8069/api/repuestos/actualizar/${repuesto.id}`, {
        ...repuesto,
        cantidadStock: repuesto.cantidadStock + this.cantidad
      })
        .then(response => {
          this.handleClose();
          this.$emit('refresh');
        })
        .catch(error => {
          console.error('Error aumentando el stock:', error);
          this.errorMessage = 'Error aumentando el stock. Intente nuevamente.';
        });
    }
  }
};
