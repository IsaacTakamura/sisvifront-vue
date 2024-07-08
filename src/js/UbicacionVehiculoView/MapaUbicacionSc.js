// Importa el componente MapComponent desde su ubicación
import MapComponent from '../../components/map/MapComponent.vue';

export default {
  name: 'MapaUbicacion', // Nombre del componente
  components: {
    MapComponent // Registra el componente MapComponent para su uso dentro de este componente
  },
  props: {
    // Propiedad 'ubicacion', un objeto que es requerido
    ubicacion: {
      type: Object,
      required: true
    },
    // Propiedad 'prevUbicacion', un objeto que no es obligatorio y tiene un valor por defecto de null
    prevUbicacion: {
      type: Object,
      default: null
    },
    // Propiedad 'vehiculo', un objeto que es requerido
    vehiculo: {
      type: Object,
      required: true
    },
    // Propiedad 'estadoVehiculo', una cadena de texto que es requerida
    estadoVehiculo: {
      type: String,
      required: true
    },
    // Propiedad 'velocidadVehiculo', un número que es requerido
    velocidadVehiculo: {
      type: Number,
      required: true
    }
  }
};
