import ConductoresList from '../../components/C_GestionarInfraccionesView/ConductoresList.vue';
import ConductorDetails from '../../components/C_GestionarInfraccionesView/ConductorDetails.vue';
import InfraccionesTable from '../../components/C_GestionarInfraccionesView/InfraccionesTable.vue';

export default {
  name: 'GestionarInfraccionesView',
  components: {
    ConductoresList,
    ConductorDetails,
    InfraccionesTable
  },
  data() {
    return {
      selectedConductorId: null
    };
  },
  methods: {
    handleSelectConductor(conductor) {
      this.selectedConductorId = conductor.id;
    }
  }
};
