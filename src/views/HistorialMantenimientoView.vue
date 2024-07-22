<template>
  <div class="app">
    <div class="container">
      <!-- Modales de Bootstrap para los mensajes -->
      <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="successModalLabel">Éxito</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Operación completada con éxito.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="errorModalLabel">Error</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Error guardando mantenimiento.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
      <div class="right-section">
        <div class="box seleccionar-ingreso">
          <h3>Seleccionar Ingreso</h3>
          <h5>Filtrar por Placa:</h5>
          <input
            type="text"
            id="placa"
            v-model="filtroPlaca"
            placeholder="Filtrar por Placa"
          />
          <h5>Seleccionar Registro de Ingreso:</h5>
          <div class="table-container">
            <table class="styled-table">
              <thead>
                <tr>
                  <th>N° Ingreso</th>
                  <th>Fecha Ingreso</th>
                  <th>Placa</th>
                  <th>Chofer</th>
                  <th>DNI</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="mantenimiento in paginatedMantenimientos"
                  :key="mantenimiento.id"
                  @click="selectMantenimiento(mantenimiento)"
                >
                  <td>{{ mantenimiento.mantenimientoIngreso.id }}</td>
                  <td>
                    {{
                      formatDate(
                        mantenimiento.mantenimientoIngreso.fechaIngreso
                      )
                    }}
                  </td>
                  <td>
                    {{
                      getVehiculo(mantenimiento.mantenimientoIngreso.idVehiculo)
                        .placa
                    }}
                  </td>
                  <td>
                    {{
                      getChofer(mantenimiento.mantenimientoIngreso.idChofer)
                        .primerNombre
                    }}
                  </td>
                  <td>
                    {{
                      getChofer(mantenimiento.mantenimientoIngreso.idChofer).dni
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagination">
              <button
                id="btn-pg"
                @click="prevPage"
                :disabled="currentPage === 1"
              >
                Anterior
              </button>
              <span id="pagx">Página {{ currentPage }} de {{ totalPages }}</span>
              <button
                id="btn-pg"
                @click="nextPage"
                :disabled="currentPage === totalPages"
              >
                Siguiente
              </button>
            </div>
            <div class="rows-per-page">
              <label for="rows" id="fl-pags">Filas por página:</label>
              <select
                id="rows"
                v-model="rowsPerPage"
                @change="changeRowsPerPage"
              >
                <option
                  v-for="option in [5, 10, 15, 20]"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="box mantenimiento-realizado">
          <h3>Mantenimiento Realizado</h3>
          <div class="input-group">
            <label>Placa Vehículo:</label>
            <input type="text" v-model="mantenimientoRealizado.placaVehiculo" />
            <label>DNI Chofer:</label>
            <input type="text" v-model="mantenimientoRealizado.dniChofer" />
            <label>Kilometraje:</label>
            <input
              type="text"
              v-model="mantenimientoRealizado.kilometrajeIngresado"
            />
            <label>Observaciones:</label>
            <input type="text" v-model="mantenimientoRealizado.observaciones" />
          </div>
          <button @click="guardarMantenimiento" id="btn-save">Guardar</button>
        </div>
      </div>
      <div class="left-section ficha-tecnica">
        <div class="box">
          <h3>Ficha Técnica</h3>
          <div v-if="vehiculoSeleccionado">
            <div class="input-group">
              <label>Imagen del vehículo:</label>
              <div
                :style="{
                  backgroundImage: `url(${getVehicleImage(vehiculoSeleccionado.img)})`,
                }"
                class="vehicle-image"
              ></div>
            </div>
            <div class="input-group">
              <label>Ruta:</label>
              <input type="text" v-model="vehiculoSeleccionado.img" />
            </div>
            <div class="input-group">
              <div class="column">
                <label>Placa:</label>
                <input type="text" v-model="vehiculoSeleccionado.placa" />
                <label>N° Motor:</label>
                <input type="text" v-model="vehiculoSeleccionado.numMotor" />
                <label>N° Serie:</label>
                <input type="text" v-model="vehiculoSeleccionado.numSerie" />
                <label>Color:</label>
                <input type="text" v-model="vehiculoSeleccionado.color" />
                <label>Marca:</label>
                <input type="text" v-model="vehiculoSeleccionado.marca" />
              </div>
              <div class="column">
                <label>Modelo:</label>
                <input type="text" v-model="vehiculoSeleccionado.modelo" />
                <label>Año Fabricacion:</label>
                <input
                  type="text"
                  v-model="vehiculoSeleccionado.anioFabricacion"
                />
                <label>Kilometraje:</label>
                <input type="text" v-model="vehiculoSeleccionado.kilometraje" />
                <label>Tipo de Combustible:</label>
                <input
                  type="text"
                  v-model="vehiculoSeleccionado.tipoCombustible"
                />
                <label>Transmisión:</label>
                <input type="text" v-model="vehiculoSeleccionado.transmision" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../js/HistorialMantenimiento/HistorialMantenimientoJS.js"></script>

<style scoped src="../csss/HistorialMantenimientoCSS.css"></style>
