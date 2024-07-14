export default {
    props: {
      show: {
        type: Boolean,
        required: true
      },
      advertencia: {
        type: Object,
        required: true
      }
    },
    computed: {
      modalClass() {
        switch (this.advertencia.tipo) {
          case 'Alto':
            return 'bg-danger text-white';
          case 'Mediano':
            return 'bg-warning text-dark';
          case 'Bajo':
            return 'bg-info text-white';
          default:
            return '';
        }
      }
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  };
  