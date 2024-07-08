<template>
    <!-- Contenedor principal de la ficha técnica -->
    <div class="ficha-tecnica">
      <h2 class="title">Ficha Técnica</h2>
      <!-- Formulario para mostrar los detalles del vehículo -->
      <form class="ficha-form">
        <div class="form-group">
          <label for="placa" class="form-label centered-label">Placa</label>
          <input type="text" id="placa" v-model="vehiculo.placa" class="form-control input-reducido centered-text" readonly />
        </div>
        <div class="form-group">
          <label for="numMotor" class="form-label centered-label">Número de Motor</label>
          <input type="text" id="numMotor" v-model="vehiculo.numMotor" class="form-control input-reducido centered-text" readonly />
        </div>
        <div class="form-group">
          <label for="numSerie" class="form-label centered-label">Número de Serie</label>
          <input type="text" id="numSerie" v-model="vehiculo.numSerie" class="form-control input-reducido centered-text" readonly />
        </div>
        <div class="form-group">
          <label for="marca" class="form-label centered-label">Marca</label>
          <input type="text" id="marca" v-model="vehiculo.marca" class="form-control input-reducido centered-text" readonly />
        </div>
        <div class="form-group">
          <label for="modelo" class="form-label centered-label">Modelo</label>
          <input type="text" id="modelo" v-model="vehiculo.modelo" class="form-control input-reducido centered-text" readonly />
        </div>
        <div class="form-group">
          <label for="anioFabricacion" class="form-label centered-label">Año de Fabricación</label>
          <input type="text" id="anioFabricacion" v-model="vehiculo.anioFabricacion" class="form-control input-reducido centered-text" readonly />
        </div>
        <div class="form-group">
          <label for="color" class="form-label centered-label">Color</label>
          <input type="text" id="color" v-model="vehiculo.color" class="form-control input-reducido centered-text" readonly />
        </div>
        <div class="form-group">
          <label for="kilometraje" class="form-label centered-label">Kilometraje</label>
          <input type="text" id="kilometraje" v-model="vehiculo.kilometraje" class="form-control input-reducido centered-text" readonly />
        </div>
        <div class="form-group">
          <label for="tipoCombustible" class="form-label centered-label">Tipo de Combustible</label>
          <input type="text" id="tipoCombustible" v-model="vehiculo.tipoCombustible" class="form-control input-reducido centered-text" readonly />
        </div>
        <div class="form-group">
          <label for="transmision" class="form-label centered-label">Transmisión</label>
          <input type="text" id="transmision" v-model="vehiculo.transmision" class="form-control input-reducido centered-text" readonly />
        </div>
      </form>
    </div>
  </template>
  
  <!-- Importa el script asociado a este componente -->
  <script src="../../js/UbicacionVehiculoView/FichaTecnicaSc.js"></script>
  <!-- Importa los estilos CSS asociados a este componente -->
  <style scoped src="../../assets/styles/St_UbicacionVehiculoView/FichaTecnicaSt.css"></style>
  