<template>
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
            <div class="col">
              <h1>Datos del Vehículo</h1>
              <div class="row">
                <div class="col">
                  <img
                    :src="getVehiculoImageUrl(vehiculo.img)"
                    alt="Perfil"
                    class="img-fluid"
                  />
                </div>
                <div class="col">
                  <!-- Datos del vehículo -->
                  <div class="container text-left">
                    <div class="row">
                      <div class="vehicle-info">
                        <span>Placa:</span>
                        <span>{{ vehiculo.placa }}</span>
                      </div>
                      <div class="vehicle-info">
                        <span>Número de Motor:</span>
                        <span>{{ vehiculo.numMotor }}</span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="vehicle-info">
                        <span>Número de Serie:</span>
                        <span>{{ vehiculo.numSerie }}</span>
                      </div>
                      <div class="vehicle-info">
                        <span>Marca:</span>
                        <span>{{ vehiculo.marca }}</span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="vehicle-info">
                        <span>Modelo:</span>
                        <span>{{ vehiculo.modelo }}</span>
                      </div>
                      <div class="vehicle-info">
                        <span>Año de Fabricación:</span>
                        <span>{{ vehiculo.anioFabricacion }}</span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="vehicle-info">
                        <span>Color:</span>
                        <span>{{ vehiculo.color }}</span>
                      </div>
                      <div class="vehicle-info">
                        <span>Kilometraje:</span>
                        <span>{{ vehiculo.kilometraje }}</span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="vehicle-info">
                        <span>Tipo de Combustible:</span>
                        <span>{{ vehiculo.tipoCombustible }}</span>
                      </div>
                      <div class="vehicle-info">
                        <span>Transmisión:</span>
                        <span>{{ vehiculo.transmision }}</span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="vehicle-info">
                        <span>Fecha de Registro:</span>
                        <span>{{
                          new Date(vehiculo.fechaRegistro).toLocaleDateString(
                            "es-ES",
                            { year: "numeric", month: "long", day: "numeric" }
                          )
                        }}</span>
                      </div>
                      <div class="vehicle-info">
                        <span>Fecha de Modificación:</span>
                        <span>{{
                          new Date(
                            vehiculo.fechaModificacion
                          ).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
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
