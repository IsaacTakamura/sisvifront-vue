<template>
    <!-- Contenedor principal para el registro diario -->
    <div class="registro-diario">
      <div class="contenedor">
        <!-- Sección para seleccionar la placa del vehículo -->
        <div class="seleccionar-placa">
          <h2 class="title">Seleccionar Placa</h2>
          <!-- Filtro de búsqueda para la placa -->
          <label class="centered-label">1. Filtrar por Placa:</label>
          <input type="text" v-model="filtroPlaca" placeholder="Filtrar por placa"
            class="form-control my-3 filtro-placa" />
          <!-- Lista de placas filtradas -->
          <label class="centered-label">2. Seleccionar Placa</label>
          <div class="lista-contenedor">
            <ul class="list-group mb-3 lista-scrollable">
              <li v-for="vehiculo in vehiculosFiltrados" :key="vehiculo.id" @click="seleccionarVehiculo(vehiculo)"
                class="list-group-item">
                {{ vehiculo.placa }} - {{ vehiculo.marca }}
              </li>
            </ul>
          </div>
        </div>
        <!-- Sección de ficha técnica del vehículo seleccionado -->
        <div v-if="vehiculoSeleccionado" class="ficha-tecnica">
          <h2 class="title">Ficha Técnica</h2>
          <!-- Formulario para mostrar la información del vehículo seleccionado -->
          <form class="ficha-form">
            <div class="form-group">
              <label for="placa" class="form-label centered-label">Placa</label>
              <input type="text" id="placa" v-model="vehiculoSeleccionado.placa"
                class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="numMotor" class="form-label centered-label">Número de Motor</label>
              <input type="text" id="numMotor" v-model="vehiculoSeleccionado.numMotor"
                class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="numSerie" class="form-label centered-label">Número de Serie</label>
              <input type="text" id="numSerie" v-model="vehiculoSeleccionado.numSerie"
                class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="marca" class="form-label centered-label">Marca</label>
              <input type="text" id="marca" v-model="vehiculoSeleccionado.marca"
                class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="modelo" class="form-label centered-label">Modelo</label>
              <input type="text" id="modelo" v-model="vehiculoSeleccionado.modelo"
                class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="anioFabricacion" class="form-label centered-label">Año de Fabricación</label>
              <input type="text" id="anioFabricacion" v-model="vehiculoSeleccionado.anioFabricacion"
                class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="color" class="form-label centered-label">Color</label>
              <input type="text" id="color" v-model="vehiculoSeleccionado.color"
                class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="kilometraje" class="form-label centered-label">Kilometraje</label>
              <input type="text" id="kilometraje" v-model="vehiculoSeleccionado.kilometraje"
                class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="tipoCombustible" class="form-label centered-label">Tipo de Combustible</label>
              <input type="text" id="tipoCombustible" v-model="vehiculoSeleccionado.tipoCombustible"
                class="form-control input-reducido centered-text" readonly />
            </div>
            <div class="form-group">
              <label for="transmision" class="form-label centered-label">Transmisión</label>
              <input type="text" id="transmision" v-model="vehiculoSeleccionado.transmision"
                class="form-control input-reducido centered-text" readonly />
            </div>
          </form>
        </div>
        <!-- Sección para mostrar la última ubicación del vehículo -->
        <div v-if="ubicacion" class="mapa-ubicacion">
          <h2 class="title">Última Ubicación</h2>
          <!-- Componente de mapa para mostrar la ubicación del vehículo -->
          <MapComponent :lat="ubicacion.lat" :lon="ubicacion.lon" :prevLat="prevUbicacion ? prevUbicacion.lat : null"
            :prevLon="prevUbicacion ? prevUbicacion.lon : null" :placa="vehiculoSeleccionado.placa"
            :nombreVehiculo="vehiculoSeleccionado.marca" />
          <div class="ubicacion-info">
            <label>Ubicación Actual: </label>
            <input type="text" :value="ubicacion.direccion" readonly class="form-control input-reducido centered-text" />
            <label>Ubicación Anterior: </label>
            <input type="text" :value="prevUbicacion ? prevUbicacion.direccion : 'N/A'" readonly
              class="form-control input-reducido centered-text" />
            <label>Estado: </label>
            <input type="text" :value="estadoVehiculo" readonly class="form-control input-reducido centered-text" />
            <label>Velocidad: </label>
            <input type="text" :value="velocidadVehiculo" readonly class="form-control input-reducido centered-text" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import MapComponent from './M.Ubicacion/MapComponent.vue';
  import * as turf from '@turf/turf';
  
  // Definición del polígono de Ancash que delimita la región de interés
  const ancashPolygon = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-78.2268, -10.0718], // Punto noroeste
          [-77.1140, -9.1235],  // Punto noreste
          [-76.4089, -9.4986],  // Punto sureste
          [-77.6101, -11.0672], // Punto suroeste
          [-78.2268, -10.0718]  // Cerrando el polígono
        ]
      ]
    }
  };
  
  // Función para generar una coordenada aleatoria dentro del polígono de Ancash
  function getRandomCoordinateInAncash(center, radius = 0.03) { // Ajustamos el radio a 3 km
    const point = turf.randomPoint(1, { bbox: [center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius] });
    return point.features[0].geometry.coordinates;
  }
  
  // Función para generar un estado y velocidad aleatorios del vehículo
  function getRandomSpeedAndState() {
    const isMoving = Math.random() < 0.8; // 80% de probabilidad de que el vehículo esté en movimiento
    return {
      estado: isMoving ? 'En movimiento' : 'En reposo', // Estado del vehículo
      velocidad: isMoving ? Math.floor(Math.random() * 41) + 60 : 0 // Velocidad entre 60 y 100 km/h si está en movimiento, 0 si está en reposo
    };
  }
  
  export default {
    components: {
      MapComponent // Registro del componente MapComponent
    },
    data() {
      return {
        filtroPlaca: '', // Texto de filtro para la lista de vehículos
        vehiculos: [], // Lista de vehículos
        vehiculoSeleccionado: null, // Vehículo seleccionado
        ubicacion: null, // Última ubicación del vehículo seleccionado
        prevUbicacion: null, // Ubicación anterior del vehículo seleccionado
        lastLocations: {}, // Almacena las últimas ubicaciones conocidas por vehículo
        estadoVehiculo: '', // Estado del vehículo (en movimiento o en reposo)
        velocidadVehiculo: '', // Velocidad del vehículo
        intervalId: null // ID del intervalo para actualizar la ubicación
      };
    },
    computed: {
      // Computed property para filtrar la lista de vehículos según el texto de filtro
      vehiculosFiltrados() {
        return this.vehiculos.filter((vehiculo) =>
          vehiculo.placa.includes(this.filtroPlaca.toUpperCase())
        );
      },
    },
    methods: {
      // Método para cargar la lista de vehículos desde una API
      async cargarVehiculos() {
        try {
          const response = await fetch('http://localhost:8069/api/vehiculos/listar'); // Realiza una solicitud a la API para obtener la lista de vehículos
          this.vehiculos = await response.json(); // Almacena la lista de vehículos en el estado del componente
        } catch (error) {
          console.error('Error al cargar vehículos:', error); // Muestra un error en la consola si falla la solicitud
        }
      },
      // Método para seleccionar un vehículo de la lista
      async seleccionarVehiculo(vehiculo) {
        this.vehiculoSeleccionado = vehiculo; // Establece el vehículo seleccionado en el estado del componente
        if (this.lastLocations[vehiculo.id]) {
          // Si ya hay ubicaciones almacenadas para este vehículo, las utiliza
          this.prevUbicacion = this.lastLocations[vehiculo.id].prevUbicacion;
          this.ubicacion = this.lastLocations[vehiculo.id].ubicacion;
          this.estadoVehiculo = this.lastLocations[vehiculo.id].estado;
          this.velocidadVehiculo = this.lastLocations[vehiculo.id].velocidad;
        } else {
          // Si no hay ubicaciones almacenadas, establece los valores por defecto
          this.prevUbicacion = null;
          this.ubicacion = null;
          this.estadoVehiculo = '';
          this.velocidadVehiculo = '';
        }
  
        // Llama a buscarUbicacion() una vez al seleccionar el vehículo
        await this.buscarUbicacion();
  
        // Limpia cualquier intervalo previo para evitar múltiples intervalos activos
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
  
        // Inicia un intervalo que actualiza la ubicación cada 5 segundos
        this.intervalId = setInterval(this.buscarUbicacion, 5000);
      },
      // Método para buscar la ubicación actual del vehículo
      async buscarUbicacion() {
        // Establece el centro de la búsqueda en la ubicación actual o en el centro de Ancash
        const center = this.ubicacion ? [this.ubicacion.lon, this.ubicacion.lat] : [-77.532, -9.327];
        // Genera una nueva coordenada aleatoria dentro de un radio de 3 km del centro
        const [lon, lat] = getRandomCoordinateInAncash(center, 0.03);
        try {
          // Realiza una solicitud a la API para obtener la dirección de la nueva coordenada
          const response = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.445d029b86d0a62e62443cd6e2428c56&lat=${lat}&lon=${lon}&format=json`);
          const data = await response.json();
          // Genera un nuevo estado y velocidad para el vehículo
          const { estado, velocidad } = getRandomSpeedAndState();
          // Actualiza las ubicaciones anterior y actual del vehículo
          this.prevUbicacion = this.ubicacion;
          this.ubicacion = {
            lat: lat,
            lon: lon,
            direccion: data.display_name
          };
          // Actualiza el estado y la velocidad del vehículo
          this.estadoVehiculo = estado;
          this.velocidadVehiculo = velocidad;
          // Almacena las nuevas ubicaciones, estado y velocidad en el objeto lastLocations
          this.lastLocations[this.vehiculoSeleccionado.id] = {
            prevUbicacion: this.prevUbicacion,
            ubicacion: this.ubicacion,
            estado: this.estadoVehiculo,
            velocidad: this.velocidadVehiculo
          };
        } catch (error) {
          console.error('Error al obtener la dirección:', error); // Muestra un error en la consola si falla la solicitud
          // Si falla la solicitud, genera una dirección genérica
          const { estado, velocidad } = getRandomSpeedAndState();
          this.prevUbicacion = this.ubicacion;
          this.ubicacion = {
            lat: lat,
            lon: lon,
            direccion: `Lat: ${lat}, Lon: ${lon}`
          };
          this.estadoVehiculo = estado;
          this.velocidadVehiculo = velocidad;
          this.lastLocations[this.vehiculoSeleccionado.id] = {
            prevUbicacion: this.prevUbicacion,
            ubicacion: this.ubicacion,
            estado: this.estadoVehiculo,
            velocidad: this.velocidadVehiculo
          };
        }
      }
    },
    // Método que se ejecuta al crear el componente
    created() {
      this.cargarVehiculos(); // Carga la lista de vehículos al crear el componente
    },
    // Método que se ejecuta antes de destruir el componente
    beforeDestroy() {
      if (this.intervalId) {
        clearInterval(this.intervalId); // Limpia el intervalo de actualización de ubicación
      }
    }
  };
  </script>
  
  
  <style scoped>
  /* Estilos CSS para la vista */
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
  
  .seleccionar-placa,
  .ficha-tecnica,
  .mapa-ubicacion {
    width: 30%;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-right: 20px;
    /* Add margin-right to separate the boxes */
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
  
  .filtro-placa,
  .input-reducido {
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
  
  .ubicacion-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .ubicacion-info label {
    width: 100%;
    text-align: center;
    margin-bottom: 5px;
    font-weight: bold;
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
  