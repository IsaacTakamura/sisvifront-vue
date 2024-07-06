export default {
    name: 'DriverTable',
    props: {
      drivers: Array,
    },
    methods: {
      // Método para emitir el evento 'edit' con el ID del chofer
      editDriver(id) {
        this.$emit('edit', id);
      },
      // Método para emitir el evento 'c_est' con el ID del chofer
      c_estDriver(id) {
        this.$emit('c_est', id);
      },
      // Método para formatear la fecha de vencimiento de la licencia
      formatDate(dateString) {
        if (!dateString) return 'No disponible';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    }
  };
  