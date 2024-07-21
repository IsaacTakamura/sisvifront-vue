<template>
  <div class="app">

    <div id="2_Partes_Pagina" class="container text-center">
      <div class="row">
        <div class="col-md-3">
          <!-- Listado de choferes -->
          <h1>Choferes</h1>
          <p class="blockquote">Seleccione un conductor</p>
          <!-- Barra de búsqueda para filtrar por nombre de conductor -->
          <ChoferesListView
            :search="search"
            :choferes="choferes"
            @update:search="search = $event"
            @mostrar-datos="mostrarDatosConductor"
          ></ChoferesListView>
        </div>
        <div class="col-md-9">
          <!-- Datos del conductor y vehículo -->
          <div class="container text-center">
            <div class="row">
              <!-- Datos del Conductor -->
              <div class="col">
                <DatosConductorView :chofer="selectedChofer" />
              </div>
              <!-- Datos del Vehículo -->
              <div class="col" style="background: #282828; border-radius: 8px;">
                <h1>Datos del Vehículo</h1>
                <div class="row">
                  <div class="col">
                    <div
                      :style="{ backgroundImage: `url(${getVehiculoImageUrl(vehiculo.img)})` }"
                      class="vehicle-image"
                    ></div>
                  </div>
                  <div class="col">
                    <!-- Datos del vehículo -->
                    <div class="vehicle-info">
                      <div>
                        <span>Placa:</span>
                        <span>{{ vehiculo.placa }}</span>
                      </div>
                      <div>
                        <span>Número de Motor:</span>
                        <span>{{ vehiculo.numMotor }}</span>
                      </div>
                      <div>
                        <span>Número de Serie:</span>
                        <span>{{ vehiculo.numSerie }}</span>
                      </div>
                      <div>
                        <span>Marca:</span>
                        <span>{{ vehiculo.marca }}</span>
                      </div>
                      <div>
                        <span>Modelo:</span>
                        <span>{{ vehiculo.modelo }}</span>
                      </div>
                      <div>
                        <span>Año de Fabricación:</span>
                        <span>{{ vehiculo.anioFabricacion }}</span>
                      </div>
                      <div>
                        <span>Color:</span>
                        <span>{{ vehiculo.color }}</span>
                      </div>
                      <div>
                        <span>Kilometraje:</span>
                        <span>{{ vehiculo.kilometraje }}</span>
                      </div>
                      <div>
                        <span>Tipo de Combustible:</span>
                        <span>{{ vehiculo.tipoCombustible }}</span>
                      </div>
                      <div>
                        <span>Transmisión:</span>
                        <span>{{ vehiculo.transmision }}</span>
                      </div>
                      <div>
                        <span>Fecha de Registro:</span>
                        <span>{{
                          new Date(vehiculo.fechaRegistro).toLocaleDateString(
                            "es-ES",
                            { year: "numeric", month: "long", day: "numeric" }
                          )
                        }}</span>
                      </div>
                      <div>
                        <span>Fecha de Modificación:</span>
                        <span>{{
                          new Date(vehiculo.fechaModificacion).toLocaleDateString(
                            "es-ES",
                            { year: "numeric", month: "long", day: "numeric" }
                          )
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="@/js/ChoferesVehiculosView/ChoferesVehiculosViewSc.js"></script>
<style
  src="@/assets/styles/St_ChoferesListView/ChoferesVehiculosViewSt.css"
  scoped
></style>
