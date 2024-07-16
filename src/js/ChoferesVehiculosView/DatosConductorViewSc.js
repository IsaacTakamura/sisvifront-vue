export default {
    props: {
      chofer: {
        type: Object,
        required: true,
        default: () => ({
          dni: '',
          primerNombre: '',
          apellidoPaterno: '',
          licenciaConducir: '',
          categoriaLicencia: '',
          telefono: '',
          segundoNombre: '',
          apellidoMaterno: '',
          fechaVencimientoLicencia: '',
        })
      }
    },
    data() {
      return {
        perfilImg: require('@/assets/styles/St_ChoferesVehiculosView/Perfil.jpg'),
      };
    }
  };
  