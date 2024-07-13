import ChoferesList from '../../components/C_GestionFaltasView/ChoferesList.vue';
import ChoferDetails from '../../components/C_GestionFaltasView/ChoferDetails.vue';
import RegistrarInfraccionModal from '../../components/modals/M_GestionFaltasView/RegistrarInfraccionModal.vue';
import InfraccionesTable from '../../components/C_GestionFaltasView/InfraccionesTable.vue';
import InformeInfraccionModal from '../../components/modals/M_GestionFaltasView/InformeInfraccionModal.vue';

export default {
  name: 'GestionFaltasView',
  components: {
    ChoferesList,
    ChoferDetails,
    RegistrarInfraccionModal,
    InfraccionesTable,
    InformeInfraccionModal
  },
  data() {
    return {
      selectedChofer: null,
      selectedChoferData: null,
      showRegistrarInfraccionModal: false,
      showInformeInfraccionModal: false,
      selectedInfraccionId: null
    };
  },
  methods: {
    async fetchChoferData(chofer) {
      try {
        const response = await fetch(`http://localhost:8069/api/choferes/listar/${chofer.id}`);
        this.selectedChoferData = await response.json();

        const infraccionesResponse = await fetch(`http://localhost:8069/api/infracciones/listar/chofer/${chofer.id}`);
        const infracciones = await infraccionesResponse.json();
        this.selectedChoferData.strikes = infracciones.filter(infraccion => infraccion.estado).length;
      } catch (error) {
        console.error('Error al obtener los datos del conductor:', error);
      }
    },
    handleSelectChofer(chofer) {
      this.selectedChofer = chofer;
      this.fetchChoferData(chofer);
    },
    handleInfraccionRegistered() {
      this.showRegistrarInfraccionModal = false;
      alert('Infracción registrada correctamente');
      this.$refs.infraccionesTable.fetchInfracciones();
      this.fetchChoferData(this.selectedChofer);
      this.fetchChoferesList();
    },
    fetchChoferesList() {
      if (this.$refs.choferesList) {
        this.$refs.choferesList.fetchChoferes();
      }
    },
    openInformeModal(id) {
      this.selectedInfraccionId = id;
      this.showInformeInfraccionModal = true;
    }
  }
};
