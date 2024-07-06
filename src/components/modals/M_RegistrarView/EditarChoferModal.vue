<template>
  <!-- Modal de edición de chofer, se muestra solo si isVisible es verdadero -->
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
      <!-- Contenido del modal -->
      <div class="modal-content">
          <!-- Título del modal -->
          <h3>Editar Chofer</h3>
          <!-- Formulario de edición de chofer -->
          <form @submit.prevent="saveChanges">
              <!-- Campo de entrada para el primer nombre -->
              <div class="form-group">
                  <label for="editPrimerNombre">Primer Nombre</label>
                  <input type="text" id="editPrimerNombre" v-model="driver.primerNombre" class="form-control">
                  <p v-if="errors.primerNombre" class="text-danger error-message">{{ errors.primerNombre }}</p>
              </div>
              <!-- Campo de entrada para el segundo nombre -->
              <div class="form-group">
                  <label for="editSegundoNombre">Segundo Nombre</label>
                  <input type="text" id="editSegundoNombre" v-model="driver.segundoNombre" class="form-control">
                  <p v-if="errors.segundoNombre" class="text-danger error-message">{{ errors.segundoNombre }}</p>
              </div>
              <!-- Campo de entrada para el apellido paterno -->
              <div class="form-group">
                  <label for="editApellidoPaterno">Apellido Paterno</label>
                  <input type="text" id="editApellidoPaterno" v-model="driver.apellidoPaterno" class="form-control">
                  <p v-if="errors.apellidoPaterno" class="text-danger error-message">{{ errors.apellidoPaterno }}</p>
              </div>
              <!-- Campo de entrada para el apellido materno -->
              <div class="form-group">
                  <label for="editApellidoMaterno">Apellido Materno</label>
                  <input type="text" id="editApellidoMaterno" v-model="driver.apellidoMaterno" class="form-control">
                  <p v-if="errors.apellidoMaterno" class="text-danger error-message">{{ errors.apellidoMaterno }}</p>
              </div>
              <!-- Campo de entrada para el DNI -->
              <div class="form-group">
                  <label for="editDNI">DNI</label>
                  <input type="text" id="editDNI" v-model="driver.dni" class="form-control">
                  <p v-if="errors.dni" class="text-danger error-message">{{ errors.dni }}</p>
              </div>
              <!-- Campo de entrada para la licencia de conducir -->
              <div class="form-group">
                  <label for="editLicenciaConducir">Licencia de Conducir</label>
                  <input type="text" id="editLicenciaConducir" v-model="driver.licenciaConducir" class="form-control">
                  <p v-if="errors.licenciaConducir" class="text-danger error-message">{{ errors.licenciaConducir }}</p>
              </div>
              <!-- Campo de selección para la categoría de licencia -->
              <div class="form-group">
                  <label for="editCategoriaLicencia">Categoría de Licencia</label>
                  <select id="editCategoriaLicencia" v-model="driver.categoriaLicencia" class="form-control">
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                  </select>
                  <p v-if="errors.categoriaLicencia" class="text-danger error-message">{{ errors.categoriaLicencia }}</p>
              </div>
              <!-- Campo de entrada para la fecha de vencimiento de la licencia -->
              <div class="form-group">
                  <label for="editFechaVencimientoLicencia">Fecha de Vencimiento de Licencia</label>
                  <input type="date" id="editFechaVencimientoLicencia" v-model="formattedFechaVencimientoLicencia" class="form-control">
                  <p v-if="errors.fechaVencimientoLicencia" class="text-danger error-message">{{ errors.fechaVencimientoLicencia }}</p>
                  <p v-if="dateError" class="text-danger error-message">{{ dateErrorMessage }}</p>
              </div>
              <!-- Campo de entrada para el teléfono -->
              <div class="form-group">
                  <label for="editTelefono">Teléfono</label>
                  <input type="text" id="editTelefono" v-model="driver.telefono" class="form-control">
                  <p v-if="errors.telefono" class="text-danger error-message">{{ errors.telefono }}</p>
              </div>
              <!-- Botones de acción del modal -->
              <div class="modal-buttons">
                  <!-- Botón para guardar cambios -->
                  <button type="submit" class="modal-button confirm-button">Guardar</button>
                  <!-- Botón para cancelar y cerrar el modal -->
                  <button type="button" class="modal-button cancel-button" @click="close">Cancelar</button>
              </div>
          </form>
      </div>
  </div>
</template>

<script src="../../../js/RegistrarView/EditarChoferModalSc.js"></script>

<style scoped src="../../../assets/styles/St_RegistrarView/EditarChoferModalSt.css"></style>
