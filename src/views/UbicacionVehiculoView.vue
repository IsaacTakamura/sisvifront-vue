<template>
    <div class="registro-diario">
      <div class="contenedor">
        <div class="seleccionar-placa">
          <h2 class="title">Seleccionar Placa</h2>
          <label class="centered-label">1. Filtrar por Placa:</label>
          <input type="text" v-model="filtroPlaca" placeholder="Filtrar por placa" class="form-control my-3 filtro-placa" />
          <label class="centered-label">2. Seleccionar Placa</label>
          <div class="lista-contenedor">
            <ul class="list-group mb-3 lista-scrollable">
              <li
                v-for="vehiculo in vehiculosFiltrados"
                :key="vehiculo.id"
                @click="seleccionarVehiculo(vehiculo)"
                class="list-group-item"
              >
                {{ vehiculo.placa }} - {{ vehiculo.marca }}
              </li>
            </ul>
          </div>
          <button class="btn btn-primary">Registrar Nueva Placa</button>
        </div>
        <div v-if="vehiculoSeleccionado" class="ficha-tecnica">
          <h2 class="title">Ficha Técnica</h2>
          <img :src="`http://localhost:8069/path/to/images/${vehiculoSeleccionado.img}`" alt="Imagen del vehículo" class="img-fluid centered-image" />
          <form class="ficha-form">
            <div class="form-group">
              <label for="placa" class="form-label centered-label">Placa</label>
              <input type="text" id="placa" v-model="vehiculoSeleccionado.placa" class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="numMotor" class="form-label centered-label">Número de Motor</label>
              <input type="text" id="numMotor" v-model="vehiculoSeleccionado.numMotor" class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="numSerie" class="form-label centered-label">Número de Serie</label>
              <input type="text" id="numSerie" v-model="vehiculoSeleccionado.numSerie" class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="marca" class="form-label centered-label">Marca</label>
              <input type="text" id="marca" v-model="vehiculoSeleccionado.marca" class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="modelo" class="form-label centered-label">Modelo</label>
              <input type="text" id="modelo" v-model="vehiculoSeleccionado.modelo" class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="anioFabricacion" class="form-label centered-label">Año de Fabricación</label>
              <input type="text" id="anioFabricacion" v-model="vehiculoSeleccionado.anioFabricacion" class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="color" class="form-label centered-label">Color</label>
              <input type="text" id="color" v-model="vehiculoSeleccionado.color" class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="kilometraje" class="form-label centered-label">Kilometraje</label>
              <input type="text" id="kilometraje" v-model="vehiculoSeleccionado.kilometraje" class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="tipoCombustible" class="form-label centered-label">Tipo de Combustible</label>
              <input type="text" id="tipoCombustible" v-model="vehiculoSeleccionado.tipoCombustible" class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="transmision" class="form-label centered-label">Transmisión</label>
              <input type="text" id="transmision" v-model="vehiculoSeleccionado.transmision" class="form-control input-reducido centered-text" readonly />
            </div>
          </form>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      filtroPlaca: '',
      vehiculos: [],
      vehiculoSeleccionado: null,
    };
  },
  computed: {
    vehiculosFiltrados() {
      return this.vehiculos.filter((vehiculo) =>
        vehiculo.placa.includes(this.filtroPlaca.toUpperCase())
      );
    },
  },
  methods: {
    async cargarVehiculos() {
      try {
        const response = await fetch('http://localhost:8069/api/vehiculos/listar');
        this.vehiculos = await response.json();
      } catch (error) {
        console.error('Error al cargar vehículos:', error);
      }
    },
    async seleccionarVehiculo(vehiculo) {
      try {
        const response = await fetch(`http://localhost:8069/api/vehiculos/listar/${vehiculo.id}`);
        this.vehiculoSeleccionado = await response.json();
      } catch (error) {
        console.error('Error al cargar detalles del vehículo:', error);
      }
    },
  },
  created() {
    this.cargarVehiculos();
  },
};
</script>

<style scoped>
.registro-diario {
  display: flex;
  justify-content: flex-start;
  padding: 20px;
  background-color: #f1f1f1;
}

.contenedor {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.seleccionar-placa, .ficha-tecnica {
  width: 30%;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-right: 20px; /* Add margin-right to separate the boxes */
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #333;
}

.seleccionar-placa {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ficha-tecnica {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lista-contenedor {
  width: 100%;
  max-height: 150px;
}

.ficha-form {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 0.375rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filtro-placa, .input-reducido {
  width: 80%;
  margin: 0 auto;
  display: block;
  text-align: center;
}

.centered-label {
  display: block;
  text-align: center;
  width: 100%;
  margin-bottom: 5px;
  font-weight: bold;
}

.centered-text {
  text-align: center;
}

.btn-primary {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.img-fluid {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto 1rem auto;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.list-group {
  width: 100%;
}

.lista-scrollable {
  max-height: 150px;
  overflow-y: auto;
}

.list-group-item {
  cursor: pointer;
  margin-bottom: 5px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  background-color: #fff;
  transition: background-color 0.3s ease;
}

.list-group-item:hover {
  background-color: #f1f1f1;
}
</style>
