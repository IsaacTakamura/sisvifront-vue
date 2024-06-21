<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h3>Editar Chofer</h3>
      <form @submit.prevent="saveChanges">
        <div class="form-group">
          <label for="editPrimerNombre">Primer Nombre</label>
          <input type="text" id="editPrimerNombre" v-model="driver.primerNombre" class="form-control">
          <p v-if="errors.primerNombre" class="text-danger error-message">{{ errors.primerNombre }}</p>
        </div>
        <div class="form-group">
          <label for="editSegundoNombre">Segundo Nombre</label>
          <input type="text" id="editSegundoNombre" v-model="driver.segundoNombre" class="form-control">
          <p v-if="errors.segundoNombre" class="text-danger error-message">{{ errors.segundoNombre }}</p>
        </div>
        <div class="form-group">
          <label for="editApellidoPaterno">Apellido Paterno</label>
          <input type="text" id="editApellidoPaterno" v-model="driver.apellidoPaterno" class="form-control" >
          <p v-if="errors.apellidoPaterno" class="text-danger error-message">{{ errors.apellidoPaterno }}</p>
        </div>
        <div class="form-group">
          <label for="editApellidoMaterno">Apellido Materno</label>
          <input type="text" id="editApellidoMaterno" v-model="driver.apellidoMaterno" class="form-control">
          <p v-if="errors.apellidoMaterno" class="text-danger error-message">{{ errors.apellidoMaterno }}</p>
        </div>
        <div class="form-group">
          <label for="editDNI">DNI</label>
          <input type="text" id="editDNI" v-model="driver.dni" class="form-control">
          <p v-if="errors.dni" class="text-danger error-message">{{ errors.dni }}</p>
        </div>
        <div class="form-group">
          <label for="editLicenciaConducir">Licencia de Conducir</label>
          <input type="text" id="editLicenciaConducir" v-model="driver.licenciaConducir" class="form-control" >
          <p v-if="errors.licenciaConducir" class="text-danger error-message">{{ errors.licenciaConducir }}</p>
        </div>
        <div class="form-group">
          <label for="editCategoriaLicencia">Categoría de Licencia</label>
          <select id="editCategoriaLicencia" v-model="driver.categoriaLicencia" class="form-control" >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
          <p v-if="errors.categoriaLicencia" class="text-danger error-message">{{ errors.categoriaLicencia }}</p>
        </div>
        <div class="form-group">
          <label for="editFechaVencimientoLicencia">Fecha de Vencimiento de Licencia</label>
          <input type="date" id="editFechaVencimientoLicencia" v-model="formattedFechaVencimientoLicencia" class="form-control" >
          <p v-if="errors.fechaVencimientoLicencia" class="text-danger error-message">{{ errors.fechaVencimientoLicencia }}</p>
          <p v-if="dateError" class="text-danger error-message">{{ dateErrorMessage }}</p>
        </div>
        <div class="form-group">
          <label for="editTelefono">Teléfono</label>
          <input type="text" id="editTelefono" v-model="driver.telefono" class="form-control">
          <p v-if="errors.telefono" class="text-danger error-message">{{ errors.telefono }}</p>
        </div>
        <div class="modal-buttons">
          <button type="submit" class="modal-button confirm-button">Guardar</button>
          <button type="button" class="modal-button cancel-button" @click="close">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    driver: Object
  },
  data() {
    return {
      errors: {},
      dateError: false,
      dateErrorMessage: 'La licencia está vencida.',
      formattedFechaVencimientoLicencia: ''
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
      immediate: true
    }
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
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.modal-button {
  width: 100px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.confirm-button {
  background-color: #4CAF50;
  color: white;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.modal-button:hover {
  opacity: 0.8;
}

.form-control {
  width: 100%;
  padding: 0.375rem 0.75rem;
  margin: auto;
  text-align: center;
}

.text-danger {
  color: red;
  font-size: 0.875rem;
}

.error-message {
  text-align: center;
  margin-top: 0.25rem;
}
</style>
