import axios from 'axios';
import RepuestoTable from '../../components/C_RepuestoView/RepuestoTable.vue';
import RegistrarRepuestoModal from '../../components/modals/M_RepuestoView/RegistrarRepuestoModal.vue';
import AumentarStockModal from '../../components/modals/M_RepuestoView/AumentarStockModal.vue';
import RegistrarSalidaModal from '../../components/modals/M_RepuestoView/RegistrarSalidaModal.vue';
import EditarRepuestoModal from '../../components/modals/M_RepuestoView/EditarRepuestoModal.vue';

export default {
  components: {
    RepuestoTable,
    RegistrarRepuestoModal,
    AumentarStockModal,
    RegistrarSalidaModal,
    EditarRepuestoModal
  },
  data() {
    return {
      searchQuery: '',
      repuestos: [],
      isRegistrarModalVisible: false,
      isAumentarStockModalVisible: false,
      isRegistrarSalidaModalVisible: false,
      isEditModalVisible: false,
      selectedRepuestoId: null,
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    filteredRepuestos() {
      return this.repuestos.filter(repuesto => 
        repuesto.descripcion.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        repuesto.fabricante.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedRepuestos() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredRepuestos.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredRepuestos.length / this.itemsPerPage);
    }
  },
  methods: {
    openRegistrarModal() {
      this.isRegistrarModalVisible = true;
    },
    closeRegistrarModal() {
      this.isRegistrarModalVisible = false;
    },
    openAumentarStockModal() {
      this.isAumentarStockModalVisible = true;
    },
    closeAumentarStockModal() {
      this.isAumentarStockModalVisible = false;
    },
    openRegistrarSalidaModal() {
      this.isRegistrarSalidaModalVisible = true;
    },
    closeRegistrarSalidaModal() {
      this.isRegistrarSalidaModalVisible = false;
    },
    openEditModal(id) {
      this.selectedRepuestoId = id;
      this.isEditModalVisible = true;
    },
    closeEditModal() {
      this.isEditModalVisible = false;
    },
    fetchRepuestos() {
      axios.get('http://localhost:8069/api/repuestos/listar')
        .then(response => {
          this.repuestos = response.data;
        })
        .catch(error => console.error('Error fetching repuestos:', error));
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  },
  created() {
    this.fetchRepuestos();
  }
};