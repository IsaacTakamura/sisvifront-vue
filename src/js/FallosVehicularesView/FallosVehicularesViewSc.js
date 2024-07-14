import VehiculosList from '../../components/C_FallosVehicularesView/VehiculosList.vue';
import VehiculoDetails from '../../components/C_FallosVehicularesView/VehiculoDetails.vue';
import TablaAverias from '../../components/C_FallosVehicularesView/TablaAverias.vue';

export default {
  name: 'FallosVehicularesView',
  components: {
    VehiculosList,
    VehiculoDetails,
    TablaAverias
  },
  data() {
    return {
      selectedVehiculo: null, // Vehículo seleccionado
      selectedVehiculoData: null // Datos del vehículo seleccionado
    };
  },
  methods: {
    async fetchVehiculoData(vehiculo) {
      // Método para obtener los datos del vehículo seleccionado
      try {
        const response = await fetch(`http://localhost:8069/api/vehiculos/listar/${vehiculo.id}`);
        this.selectedVehiculoData = await response.json();
      } catch (error) {
        console.error('Error al obtener los datos del vehículo:', error);
      }
    },
    handleSelectVehiculo(vehiculo) {
      // Maneja la selección de un vehículo
      this.selectedVehiculo = vehiculo;
      this.fetchVehiculoData(vehiculo);
    }
  }
};
