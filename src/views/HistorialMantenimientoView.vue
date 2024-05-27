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
            <thead>
              <tr>
                <th>Id</th>
                <th>Placa</th>
                <th>N° Motor</th>
                <th>N° Serie</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año de Fabricación</th>
                <th>Color</th>
                <th>Kilometraje</th>
                <th>Tipo de Combustible</th>
                <th>Transmisión</th>
                <th>Imagen</th>
                <th>Estado</th>
                <th>Fecha de Registro</th>
                <th>Fecha de Modificación</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(vehiculo, index) in vehiculosFiltrados" :key="index">
                <td>{{ vehiculo.id }}</td>
                <td>{{ vehiculo.placa }}</td>
                <td>{{ vehiculo.numMotor }}</td>
                <td>{{ vehiculo.numSerie }}</td>
                <td>{{ vehiculo.marca }}</td>
                <td>{{ vehiculo.modelo }}</td>
                <td>{{ vehiculo.anioFabricacion }}</td>
                <td>{{ vehiculo.color }}</td>
                <td>{{ vehiculo.kilometraje }}</td>
                <td>{{ vehiculo.tipoCombustible }}</td>
                <td>{{ vehiculo.transmision }}</td>                
                <td>{{ vehiculo.img }}</td>
                <td>{{ vehiculo.estado }}</td>
                <td>{{ vehiculo.fechaRegistro }}</td>
                <td>{{ vehiculo.fechaModificacion }}</td>
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
        <img alt="Imagen del vehículo">
        <div class="input-group">
            <label > Ruta:</label>
          <input type="text" >
        </div>
        <div class="input-group" >
          <label > Placa:</label>
          <input type="text" >
          <label > Cliente:</label>
          <input type="text" >
          <label > Documento:</label>
          <input type="text" >
          <label > N° Motor:</label>
          <input type="text" >
          <label > N° Serie:</label>
          <input type="text" >
          <label > Marca:</label>
          <input type="text" >
          <label > Año de Fabricacion:</label>
          <input type="text" >
          <label > Color:</label>
          <input type="text" >
          <label > Kilometraje:</label>
          <input type="text" >
          <label > Tipo de Combustible:</label>
          <input type="text" >
          <label > Transmision:</label>
          <input type="text" >
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
      vehiculos: [],
      filtroPlaca: '',  
    };
  },
  computed: {
    vehiculosFiltrados() {
      return this.vehiculos.filter(vehiculo => vehiculo.placa.includes(this.filtroPlaca));
    },
  },
  methods: {
    async fetchVehicles() {
      const url = 'http://localhost:8069/api/vehiculos/listar';
      const response = await axios.get(url);
      this.vehiculos = response.data;
    },
  },
  created() {
    this.fetchVehicles();
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
}

.styled-table {
  width: 50%;
  border-collapse: collapse;
  background-color: #808080; 
}

.styled-table td, .styled-table th {
  padding: 10px;
  border: 1px solid #000;
}
</style>