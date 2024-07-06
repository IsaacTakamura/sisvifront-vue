export default {
    props: {
      isVisible: Boolean,
      driver: Object,
    },
    data() {
      return {
        errors: {},
        dateError: false,
        dateErrorMessage: 'La licencia está vencida.',
        formattedFechaVencimientoLicencia: '',
      };
    },
    watch: {
      driver: {
        handler(newValue) {
          if (newValue.fechaVencimientoLicencia) {
            this.formattedFechaVencimientoLicencia = newValue.fechaVencimientoLicencia.split('T')[0];
          }
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      close() {
        this.$emit('close');
      },
      saveChanges() {
        this.errors = {};
        this.dateError = false;
        let valid = true;
  
        if (!this.driver.primerNombre) {
          this.errors.primerNombre = 'Por favor, ingrese el primer nombre.';
          valid = false;
        }
        if (!this.driver.segundoNombre) {
          this.errors.segundoNombre = 'Por favor, ingrese el segundo nombre.';
          valid = false;
        }
        if (!this.driver.apellidoPaterno) {
          this.errors.apellidoPaterno = 'Por favor, ingrese el apellido paterno.';
          valid = false;
        }
        if (!this.driver.apellidoMaterno) {
          this.errors.apellidoMaterno = 'Por favor, ingrese el apellido materno.';
          valid = false;
        }
        if (!this.driver.dni) {
          this.errors.dni = 'Por favor, ingrese el DNI.';
          valid = false;
        }
        if (!this.driver.licenciaConducir) {
          this.errors.licenciaConducir = 'Por favor, ingrese la licencia de conducir.';
          valid = false;
        }
        if (!this.driver.categoriaLicencia) {
          this.errors.categoriaLicencia = 'Por favor, seleccione la categoría de licencia.';
          valid = false;
        }
        if (!this.formattedFechaVencimientoLicencia) {
          this.errors.fechaVencimientoLicencia = 'Por favor, seleccione la fecha de vencimiento de la licencia.';
          valid = false;
        } else if (!this.isFutureDate(this.formattedFechaVencimientoLicencia)) {
          this.dateError = true;
          valid = false;
        }
        if (!this.driver.telefono) {
          this.errors.telefono = 'Por favor, ingrese el número de teléfono.';
          valid = false;
        }
  
        if (valid) {
          this.driver.fechaVencimientoLicencia = this.formattedFechaVencimientoLicencia;
          this.$emit('save', this.driver);
        }
      },
      isFutureDate(dateString) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const inputDate = new Date(dateString);
        return inputDate > today;
      },
    },
  };
  