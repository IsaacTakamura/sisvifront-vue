import ChoferesList from '../../components/C_GestionFaltasView/ChoferesList.vue';
import ChoferDetails from '../../components/C_GestionFaltasView/ChoferDetails.vue';

export default {
  name: 'GestionFaltasView',
  components: {
    ChoferesList,
    ChoferDetails
  },
  data() {
    return {
      selectedChofer: null, // Conductor seleccionado
      selectedChoferData: null // Datos del conductor seleccionado
    };
  },
  methods: {
    async fetchChoferData(chofer) {
      // Método para obtener los datos del conductor seleccionado
      try {
        const response = await fetch(`http://localhost:8069/api/choferes/listar/${chofer.id}`);
        this.selectedChoferData = await response.json();
      } catch (error) {
        console.error('Error al obtener los datos del conductor:', error);
      }
    },
    handleSelectChofer(chofer) {
      // Maneja la selección de un conductor
      this.selectedChofer = chofer;
      this.fetchChoferData(chofer);
    }
  }
};
