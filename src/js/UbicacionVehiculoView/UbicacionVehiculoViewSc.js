// Importa los componentes necesarios para esta vista
import SeleccionarPlaca from '../../components/C_UbicacionVehiculoView/SeleccionarPlaca.vue';
import FichaTecnica from '../../components/C_UbicacionVehiculoView/FichaTecnica.vue';
import MapaUbicacion from '../../components/C_UbicacionVehiculoView/MapaUbicacion.vue';
// Importa la biblioteca turf para manipulación de datos geoespaciales
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
  // Registro de los componentes que se utilizarán en esta vista
  components: {
    SeleccionarPlaca,
    FichaTecnica,
    MapaUbicacion
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
