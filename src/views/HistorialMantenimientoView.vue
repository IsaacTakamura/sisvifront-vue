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
  // Se define la propiedad sections con un arreglo de objetos que contienen la información de cada sección
  data() {
    return {
      mantenimientos: [],
      vehiculos: [],
      choferes: [],
      filtroPlaca: '',  
      mantenimientoSeleccionado: null,
    };
  },
  // Se define el método navigate que recibe un objeto item y redirige a la ruta especificada en el objeto
  computed: {
    mantenimientosFiltrados() {
      return this.mantenimientos.filter(mantenimiento => mantenimiento.placa && mantenimiento.placa.includes(this.filtroPlaca));
    },
  },
  // Se define el método navigate que recibe un objeto item y redirige a la ruta especificada en el objeto
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

  // Método para obtener un vehículo por su id
  getVehiculo(id) {
    return this.vehiculos.find(vehiculo => vehiculo.id === id);
  },
  // Método para obtener un chofer por su id
  getChofer(id) {
    return this.choferes.find(chofer => chofer.id === id);
  },
  },
  // Se define el método navigate que recibe un objeto item y redirige a la ruta especificada en el objeto
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
  flex-wrap: wrap; /* Asegura una buena visualización en pantallas pequeñas */
}

.right-section, .left-section {
  flex: 1; /* Ocupa el espacio disponible de manera equitativa */
  padding: 20px; /* Espaciado interno */
}

.box {
  background-color: #fff; /* Fondo blanco */
  border: 1px solid #e0e0e0; /* Borde sutil */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Sombra suave */
  margin-bottom: 20px; /* Espaciado entre cajas */
  padding: 20px; /* Espaciado interno */
}

.input-group {
  display: flex;
  flex-wrap: wrap; /* Permite la envoltura de elementos */
  margin-bottom: 20px; /* Espaciado entre grupos de entrada */
}

.input-group label {
  flex-basis: 30%; /* Base del tamaño para la etiqueta */
  margin-right: 2%; /* Espaciado entre la etiqueta y el campo de entrada */
}

.input-group input, .input-group select {
  flex-basis: 68%; /* Base del tamaño para el campo de entrada */
  padding: 8px; /* Relleno interno */
  border: 1px solid #e0e0e0; /* Borde sutil */
  border-radius: 4px; /* Bordes redondeados */
}

.table-container {
  overflow-x: auto; /* Permite desplazamiento horizontal */
  max-width: 100%; /* Ancho máximo */
  margin: auto; /* Centrado */
  overflow-y: auto; /* Permite desplazamiento vertical */
  max-height: 500px; /* Altura máxima */
}

.styled-table {
  width: 100%; /* Ancho completo */
  border-collapse: collapse; /* Colapsa los bordes de la tabla */
  background-color: #fff; /* Fondo blanco */
}

.styled-table td, .styled-table th {
  padding: 10px; /* Relleno interno */
  border: 1px solid #e0e0e0; /* Borde sutil */
  text-align: left; /* Alineación del texto */
}

.column {
  display: flex;
  flex-direction: column;
}

/* Ajustes adicionales para botones y otros elementos si es necesario */
button {
  background-color: #007bff; /* Color de fondo */
  color: #ffffff; /* Color de texto */
  border: none; /* Sin borde */
  padding: 10px 20px; /* Relleno */
  border-radius: 4px; /* Bordes redondeados */
  cursor: pointer; /* Cursor en forma de mano */
  transition: background-color 0.3s; /* Transición suave al cambiar el color de fondo */
}

button:hover {
  background-color: #0056b3; /* Color de fondo al pasar el ratón */
}
</style>