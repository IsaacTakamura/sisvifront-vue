// MapaUbicacionSc.js

import MapComponent from '../../components/map/MapComponent.vue';

export default {
  name: 'MapaUbicacion',
  components: {
    MapComponent
  },
  props: {
    ubicacion: {
      type: Object,
      required: true
    },
    prevUbicacion: {
      type: Object,
      default: null
    },
    vehiculo: {
      type: Object,
      required: true
    },
    estadoVehiculo: {
      type: String,
      required: true
    },
    velocidadVehiculo: {
      type: Number,
      required: true
    }
  },
};
