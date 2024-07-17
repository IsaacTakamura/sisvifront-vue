import axios from 'axios';

export default {
  props: {
    repuestos: {
      type: Array,
      required: true
    },
    paginatedRepuestos: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    prevPage() {
      this.$emit('prev-page');
    },
    nextPage() {
      this.$emit('next-page');
    },
    toggleEstado(repuesto) {
      const nuevoEstado = !repuesto.estado;
      axios.put(`http://localhost:8069/api/repuestos/cambiarEstado/${repuesto.id}`, { estado: nuevoEstado })
        .then(response => {
          this.$emit('refresh');
        })
        .catch(error => console.error('Error changing estado:', error));
    }
  }
};