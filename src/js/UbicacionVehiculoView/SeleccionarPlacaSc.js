export default {
    props: ['filtroPlaca', 'vehiculosFiltrados'],
    methods: {
      seleccionarVehiculo(vehiculo) {
        this.$emit('select', vehiculo);
      }
    }
  };
  