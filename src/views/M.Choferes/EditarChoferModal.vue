<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h3>Editar Chofer</h3>
      <form @submit.prevent="saveChanges">
        <div class="form-group">
          <label for="editPrimerNombre">Primer Nombre</label>
          <input type="text" id="editPrimerNombre" v-model="driver.primerNombre" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="editSegundoNombre">Segundo Nombre</label>
          <input type="text" id="editSegundoNombre" v-model="driver.segundoNombre" class="form-control">
        </div>
        <div class="form-group">
          <label for="editApellidoPaterno">Apellido Paterno</label>
          <input type="text" id="editApellidoPaterno" v-model="driver.apellidoPaterno" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="editApellidoMaterno">Apellido Materno</label>
          <input type="text" id="editApellidoMaterno" v-model="driver.apellidoMaterno" class="form-control">
        </div>
        <div class="form-group">
          <label for="editDNI">DNI</label>
          <input type="text" id="editDNI" v-model="driver.dni" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="editLicenciaConducir">Licencia de Conducir</label>
          <input type="text" id="editLicenciaConducir" v-model="driver.licenciaConducir" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="editCategoriaLicencia">Categoría de Licencia</label>
          <select id="editCategoriaLicencia" v-model="driver.categoriaLicencia" class="form-control" required>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div class="form-group">
          <label for="editFechaVencimientoLicencia">Fecha de Vencimiento de Licencia</label>
          <input type="date" id="editFechaVencimientoLicencia" v-model="driver.fechaVencimientoLicencia"
            class="form-control" required>
        </div>
        <div class="form-group">
          <label for="editTelefono">Teléfono</label>
          <input type="text" id="editTelefono" v-model="driver.telefono" class="form-control">
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
  methods: {
    close() {
      this.$emit('close');
    },
    saveChanges() {
      this.$emit('save', this.driver);
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
  /* Ajusta el ancho según sea necesario */
  padding: 0.375rem 0.75rem;
  margin: auto;
  text-align: center;
  /* Centra el texto dentro de los inputs */
}
</style>