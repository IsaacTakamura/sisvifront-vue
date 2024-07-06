<template>
    <div class="registration-form">
      <form @submit.prevent="$emit('submit')" class="form">
        <!-- Campo para el primer nombre -->
        <div class="form-group">
          <label for="primerNombre" class="form-label">Primer Nombre</label>
          <input type="text" id="primerNombre" v-model="driver.primerNombre" class="form-control">
          <p v-if="errors.primerNombre" class="text-danger error-message">{{ errors.primerNombre }}</p>
        </div>
        <!-- Campo para el segundo nombre -->
        <div class="form-group">
          <label for="segundoNombre" class="form-label">Segundo Nombre</label>
          <input type="text" id="segundoNombre" v-model="driver.segundoNombre" class="form-control">
          <p v-if="errors.segundoNombre" class="text-danger error-message">{{ errors.segundoNombre }}</p>
        </div>
        <!-- Campo para el apellido paterno -->
        <div class="form-group">
          <label for="apellidoPaterno" class="form-label">Apellido Paterno</label>
          <input type="text" id="apellidoPaterno" v-model="driver.apellidoPaterno" class="form-control">
          <p v-if="errors.apellidoPaterno" class="text-danger error-message">{{ errors.apellidoPaterno }}</p>
        </div>
        <!-- Campo para el apellido materno -->
        <div class="form-group">
          <label for="apellidoMaterno" class="form-label">Apellido Materno</label>
          <input type="text" id="apellidoMaterno" v-model="driver.apellidoMaterno" class="form-control">
          <p v-if="errors.apellidoMaterno" class="text-danger error-message">{{ errors.apellidoMaterno }}</p>
        </div>
        <!-- Campo para el DNI -->
        <div class="form-group">
          <label for="dni" class="form-label">DNI</label>
          <input type="text" id="dni" v-model="driver.dni" class="form-control">
          <p v-if="errors.dni" class="text-danger error-message">{{ errors.dni }}</p>
        </div>
        <!-- Campo para la licencia de conducir -->
        <div class="form-group">
          <label for="licenciaConducir" class="form-label">Licencia de Conducir</label>
          <input type="text" id="licenciaConducir" v-model="driver.licenciaConducir" class="form-control">
          <p v-if="errors.licenciaConducir" class="text-danger error-message">{{ errors.licenciaConducir }}</p>
        </div>
        <!-- Campo para la categoría de la licencia -->
        <div class="form-group">
          <label for="categoriaLicencia" class="form-label">Categoría de Licencia</label>
          <select id="categoriaLicencia" v-model="driver.categoriaLicencia" class="form-control">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
          <p v-if="errors.categoriaLicencia" class="text-danger error-message">{{ errors.categoriaLicencia }}</p>
        </div>
        <!-- Campo para la fecha de vencimiento de la licencia -->
        <div class="form-group">
          <label for="fechaVencimientoLicencia" class="form-label">Fecha de Vencimiento de Licencia</label>
          <input type="date" id="fechaVencimientoLicencia" v-model="driver.fechaVencimientoLicencia" class="form-control">
          <p v-if="errors.fechaVencimientoLicencia" class="text-danger error-message">{{ errors.fechaVencimientoLicencia }}</p>
          <p v-if="dateError" class="text-danger error-message">{{ dateErrorMessage }}</p>
        </div>
        <!-- Campo para el teléfono -->
        <div class="form-group">
          <label for="telefono" class="form-label">Teléfono</label>
          <input type="text" id="telefono" v-model="driver.telefono" class="form-control">
          <p v-if="errors.telefono" class="text-danger error-message">{{ errors.telefono }}</p>
        </div>
        <!-- Botones de acción del formulario -->
        <div class="button-group">
            <button  @click="$emit('handleSubmit')" class="btn btn-success">Registrar</button>
            <button  @click="$emit('cancel')" class="btn btn-secondary">Cancelar</button>
        </div>
      </form>
    </div>
  </template>
  
  <script src="../../js/RegistrarView/DriverFormSc.js"></script>
  
  <style scoped src="../../assets/styles/St_RegistrarView/DriverFormSt.css"></style>
  