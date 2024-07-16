import axios from "axios";
import DatosConductorView from "@/views/M.ListadoChoferesVehivulos/DatosConductorView.vue";
import ChoferesListView from "@/views/M.ListadoChoferesVehivulos/ChoferesListView.vue";
import perfilImg from "@/assets/styles/St_ChoferesVehiculosView/Perfil.jpg";
import defaultVehicleImg from "@/assets/images/default-vehicle.jpg";

export default {
  components: {
    DatosConductorView,
    ChoferesListView,
  },
  data() {
    return {
      choferes: [],
      search: "",
      perfilImg: perfilImg,
      defaultVehicleImg: defaultVehicleImg,
      selectedChofer: {
        dni: "",
        primerNombre: "",
        apellidoPaterno: "",
        licenciaConducir: "",
        categoriaLicencia: "",
        telefono: "",
        segundoNombre: "",
        apellidoMaterno: "",
        fechaVencimientoLicencia: "",
      },
      vehiculo: {
        placa: "",
        numMotor: "",
        numSerie: "",
        marca: "",
        modelo: "",
        anioFabricacion: "",
        color: "",
        kilometraje: "",
        tipoCombustible: "",
        transmision: "",
        img: "",
        fechaRegistro: "",
        fechaModificacion: "",
      },
      ingresos: [],
    };
  },
  methods: {
    async fetchChoferes() {
      const url = "http://localhost:8069/api/choferes/listar"; // Reemplaza esto con la URL de tu API
      const response = await axios.get(url);
      this.choferes = response.data;
    },
    async fetchIngresos() {
      const url = "http://localhost:8069/api/mantenimiento/ingreso/listar"; // Reemplaza esto con la URL de tu API
      const response = await axios.get(url);
      this.ingresos = response.data;
    },
    async fetchVehiculo(id) {
      const url = `http://localhost:8069/api/vehiculos/listar/${id}`; // Reemplaza esto con la URL de tu API
      const response = await axios.get(url);
      this.vehiculo = response.data;
    },
    async mostrarDatosConductor(chofer) {
      this.selectedChofer = chofer;
      const ingreso = this.ingresos.find((i) => i.idChofer === chofer.id);
      if (ingreso) {
        await this.fetchVehiculo(ingreso.idVehiculo);
      } else {
        this.vehiculo = {};
      }
    },
    getVehiculoImageUrl(img) {
      if (img) {
        try {
          return require(`@/assets/vehiculos/${img}`);
        } catch (e) {
          return this.defaultVehicleImg;
        }
      } else {
        return this.defaultVehicleImg;
      }
    },
  },
  async created() {
    await this.fetchChoferes();
    await this.fetchIngresos();
  },
};