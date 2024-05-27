<template>
  <div class="container">
    <h1 class="titulo">Gestión de Repuestos</h1>

    <div class="box consultas-stock">
        <h3>Consulta de Stock</h3>
        <div class="input-row">
          <div class="input-group">
            <label for="codigo-interno">Filtro por Codigo Interno</label>
            <input id="codigo-interno" type="text" v-model="filtroCodigoInterno">
          </div>
          <div class="input-group">
            <label for="descripcion">Filtro por Descripcion</label>
            <input id="descripcion" type="text" v-model="filtroDescripcion">
          </div>
        </div>
        <table class="tabla-repuestos">
          <thead>
      <tr>
        <th>ID</th>
        <th>Código Interno</th>
        <th>Descripción</th>
        <th>Fabricante</th>
        <th>Fecha de Fabricación</th>
        <th>Cantidad en Stock</th>
      </tr>
    </thead>
      <tbody>
        <tr v-for="(repuesto, index) in repuestosFiltrados" :key="index">
          <td>{{ repuesto.id }}</td>
          <td>{{ repuesto.codigoInterno }}</td>
          <td>{{ repuesto.descripcion }}</td>
          <td>{{ repuesto.fabricante }}</td>
          <td>{{ repuesto.fechaFabricacion }}</td>
          <td>{{ repuesto.cantidadStock }}</td>


        </tr>
      </tbody>
    </table>
        
    </div>
    <div class="box gestionar">
        <h3>Gestionar</h3>
        <div class="button-group">
      <button class="btn">Administrar Repuestos</button>
      <button class="btn">Registrar Ingreso</button>
      <button class="btn">Registrar Salida</button>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      repuestos: [],
      filtroCodigoInterno: '',
      filtroDescripcion: '',
      selectedRow: null,
    };
  },
  computed: {
    repuestosFiltrados() {
      return this.repuestos.filter(repuesto =>
        repuesto.codigoInterno.includes(this.filtroCodigoInterno) &&
        repuesto.descripcion.includes(this.filtroDescripcion)
      );
    },
  },
  methods: {
    selectRow(repuesto) {
      this.selectedRow = repuesto;
    },
    async fetchRepuestos() {
      const url = 'http://localhost:8069/api/repuestos/listar'; 
      const response = await axios.get(url);
      this.repuestos = response.data;
    },
  },
  created() {
    this.fetchRepuestos();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box {
  width: 100%;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 20px;
}

.titulo {
  color: blue;
}

.input-row {
  display: flex;
  justify-content: space-between;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.input-group input {
  width: 40%;
}

table {
  margin-left: auto;
  margin-right: auto;
}

.button-group {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  .btn {
    background-color: #3a5f8f;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  .tabla-repuestos {
  width: 100%; 
  border-collapse: collapse; 
}

.tabla-repuestos th, .tabla-repuestos td {
  border: 1px solid #ddd; 
  padding: 8px; 
  text-align: center; 
}

.tabla-repuestos th {
  background-color: #f2f2f2; 
}
  
.tabla-repuestos tr:hover {
  background-color: #f5f5f5; 
  cursor: pointer;
}

  

  
</style>