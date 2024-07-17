import axios from 'axios';

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    repuestoId: {
      type: Number,
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
        cantidadStock: 0 // This field will not be updated directly
      }
    };
  },
  watch: {
    repuestoId(newVal) {
      if (newVal) {
        this.fetchRepuesto();
      }
    },
    isVisible(newVal) {
      if (newVal) {
        this.fetchRepuesto();
      }
    }
  },
  methods: {
    fetchRepuesto() {
      axios.get(`http://localhost:8069/api/repuestos/listar/${this.repuestoId}`)
        .then(response => {
          this.repuesto = response.data;
          this.repuesto.fechaFabricacion = this.formatDateForInput(this.repuesto.fechaFabricacion);
        })
        .catch(error => console.error('Error fetching repuesto:', error));
    },
    formatDateForInput(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()+ 1).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    handleSubmit() {
      const { codigoInterno, descripcion, fabricante, fechaFabricacion, cantidadStock } = this.repuesto;
      const updatedRepuesto = {
        codigoInterno,
        descripcion,
        fabricante,
        fechaFabricacion,
        cantidadStock
      };
      axios.put(`http://localhost:8069/api/repuestos/actualizar/${this.repuesto.id}`, updatedRepuesto)
        .then(response => {
          this.closeModal();
          this.$emit('refresh');
        })
        .catch(error => console.error('Error updating repuesto:', error));
    },
    closeModal() {
      this.$emit('close');
      this.resetForm();
    },
    resetForm() {
      this.repuesto = {
        codigoInterno: '',
        descripcion: '',
        fabricante: '',
        fechaFabricacion: '',
        cantidadStock: 0
      };
    }
  }
};
