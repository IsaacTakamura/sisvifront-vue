<template>
  <div class="container px-4 py-4">
    <div class="row">
      <div class="col-md-6">
        <h3>Detalles</h3>
        <form @submit.prevent="submitForm" class="compact-form">
          <div class="d-flex">
            <div class="flex-fill" style="margin-right: 30px">
              <div class="form-group">
                <label for="placa">N° Placa</label>
                <input
                  type="text"
                  id="placa"
                  v-model="form.placa"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="nMotor">N° Motor</label>
                <input
                  type="text"
                  id="nMotor"
                  v-model="form.nMotor"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="nSerie">N° Serie</label>
                <input
                  type="text"
                  id="nSerie"
                  v-model="form.nSerie"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="marca">Marca</label>
                <input
                  type="text"
                  id="marca"
                  v-model="form.marca"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="modelo">Modelo</label>
                <input
                  type="text"
                  id="modelo"
                  v-model="form.modelo"
                  class="form-control"
                />
              </div>
            </div>
            <div class="flex-fill">
              <div class="form-group">
                <label for="anioFabricacion">Año de Fabricación</label>
                <input
                  type="text"
                  id="anioFabricacion"
                  v-model="form.anioFabricacion"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="color">Color</label>
                <input
                  type="text"
                  id="color"
                  v-model="form.color"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="kilometraje">Kilometraje</label>
                <input
                  type="text"
                  id="kilometraje"
                  v-model="form.kilometraje"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="tipoCombustible">Combustible</label>
                <select
                  id="tipoCombustible"
                  v-model="form.tipoCombustible"
                  class="form-control"
                >
                  <option value="Gasolina">Gasolina</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Eléctrico">Eléctrico</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>
              <div class="form-group">
                <label for="transmision">Tipo de Transmisión</label>
                <select
                  id="transmision"
                  v-model="form.transmision"
                  class="form-control"
                >
                  <option value="Automatica">Automatica</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
      </div>
      <div class="col-md-5">
        <div class="form-group">
          <div class="col">
            <div class="form-group">
              <label for="img">
                <h4>Visualización</h4> </label
              ><br /><br />
              <input
                type="file"
                id="imagen"
                @change="onFileChange"
                class="img-fluid"
                hidden
              />
              <div v-if="imagePreview" class="image-preview">
                <img :src="imagePreview" class="img-fluid" />
              </div>
              <div v-else class="image-placeholder"></div>
              <div class="form-group">
                <label for="descripcion">Descripción de la imagen</label>
                <textarea
                  id="descripcion"
                  v-model="form.descripcion"
                  class="form-control"
                ></textarea
                ><br />
              </div>
              <button @click="selectImage" class="btn btn-primary">
                Seleccionar imagen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../js/FichaTecnicaView.js"></script>
<style src="../csss/FichaTecnicaView.css" scoped></style>
