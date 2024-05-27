<template>
  <div class="container">
    <div class="right-section">
      <div class="box seleccionar-ingreso">
        <h3>Seleccionar Ingreso</h3>
        <h2>1.Filtrar por Placa:</h2>
        <input type="text" id="placa" v-model="filtroPlaca" placeholder="Filtrar por Placa" >
        <h2>2.Seleccionar Registro de Ingreso:</h2>
        <div class="table-container" >
          <table class="styled-table">
            <tbody>
              <tr v-for="(mantenimiento, index) in mantenimientosFiltrados" :key="index">
                <td>{{ mantenimiento.id }}</td>
                <td>{{ mantenimiento.mantenimientoIngreso }}</td>
                <td>{{ getVehiculo(mantenimiento.idVehiculo).placa}}</td>
                <td>{{ getChofer(mantenimiento.idChofer).nombre}}</td>
          
              </tr>
      </tbody>
    </table>

        </div>
      </div>
      <div class="box mantenimiento-realizado">
        <h3>Mantenimiento Realizado</h3>
        <div class="input-group" >
          <label > N° Ingreso:</label>
          <input type="text" >
          <label > N° Orden T:</label>
          <input type="text" >
          <label > Fecha Salida:</label>
          <input type="text" >
          <label > Nivel Daño:</label>
          <input type="text" >
          <label > Nivel Concepto:</label>
          <input type="text" >
          <label > Nivel Deteccion:</label>
          <input type="text" >
          <label > Kilometraje Prox Mant.:</label>
          <input type="text" >
          <label > Fecha Prox. Mant:</label>
          <input type="text" >
          <label > Descripcion:</label>
          <input type="text" >
          <label > Obs Mant:</label>
          <input type="text" >
        </div>
        <button>Ver Documento</button>
        <input type="text">
      </div>
    </div>
    <div class="left-section ficha-tecnica">
      <div class="box">
        <h3>Ficha Técnica</h3>
        <div class="input-group">
          <label>Imagen del vehículo:</label>
        <input type="file" id="imagenVehiculo" accept="image/*">
        </div>
        <div class="input-group">
        <label>Ruta:</label>
        <input type="text" id="ruta">
      </div>
      <div class="input-group">
        <div class="column">
          <label for="">Placa:</label>
          <input type="text" placeholder="Campo 1">
          <label for="">Cliente:</label>
          <input type="text" placeholder="Campo 2">
          <label for="">Documento:</label>
          <input type="text" placeholder="Campo 3">
          <label for="">N° Motor:</label>
          <input type="text" placeholder="Campo 4">
          <label for="">N° Serie:</label>
          <input type="text" placeholder="Campo 5">
          <label for="">Marca:</label>
          <input type="text" placeholder="Campo 6">
        </div>
        <div class="column">
          <label for="">Modelo:</label>
          <input type="text" placeholder="Campo 7">
          <label for="">Año Fabricacion:</label>
          <input type="text" placeholder="Campo 8">
          <label for="">Color:</label>
          <input type="text" placeholder="Campo 9">
          <label for="">Kilometraje:</label>
          <input type="text" placeholder="Campo 10">
          <label for="">Tipo de Combustible:</label>
          <input type="text" placeholder="Campo 11">
          <label for="">Transmisión:</label>
          <input type="text" placeholder="Campo 12">
        </div>
      </div>
     

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      mantenimientos: [],
      vehiculos: [],
      choferes: [],
      filtroPlaca: '',  
      mantenimientoSeleccionado: null,
    };
  },
  computed: {
    mantenimientosFiltrados() {
      return this.mantenimientos.filter(mantenimiento => mantenimiento.placa && mantenimiento.placa.includes(this.filtroPlaca));
    },
  },
  methods: {
    async fetchVehicles() {
      const url = 'http://localhost:8069/api/mantenimiento/salida/listar';
      const response = await axios.get(url);
      this.mantenimientos = response.data;
    },
    async fetchVehiculos() {
    const url = 'http://localhost:8069/api/vehiculos/listar';  // Reemplaza esto con la URL de tu API
    const response = await axios.get(url);
    this.vehiculos = response.data;
  },
  async fetchChoferes() {
    const url = 'http://localhost:8069/api/choferes/listar';  // Reemplaza esto con la URL de tu API
    const response = await axios.get(url);
    this.choferes = response.data;
  },

  getVehiculo(id) {
    return this.vehiculos.find(vehiculo => vehiculo.id === id);
  },
  getChofer(id) {
    return this.choferes.find(chofer => chofer.id === id);
  },
  },
  created() {
    this.fetchVehicles();
    this.fetchVehiculos();
  this.fetchChoferes();
  },
};
</script>

<style scoped>
.container {
  display: flex;
}

.right-section {
  width: 50%;
}

.left-section {
  width: 50%;
}

.box {
  border: 1px solid #000;
  margin: 10px;
  padding: 10px;
}

.input-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.input-group label {
  width: 30%;
}

.input-group input {
  width: 65%;
}
.table-container {
  overflow-x: auto;
  max-width: 90%;
  margin: auto;
  overflow: auto;
  max-height: 500px;
}

.styled-table {
  width: 50%;
  border-collapse: collapse;
  background-color: #7c7d80; 
}

.styled-table td, .styled-table th {
  padding: 10px;
  border: 1px solid #000;
}

.column {
  display: flex;
  flex-direction: column;
}
.input-group::after {
  content: "";
  clear: both;
  display: table;
}
</style>