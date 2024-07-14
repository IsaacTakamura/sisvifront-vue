import SeleccionarPlaca from '../../components/C_UbicacionVehiculoView/SeleccionarPlaca.vue';
import FichaTecnica from '../../components/C_UbicacionVehiculoView/FichaTecnica.vue';
import MapaUbicacion from '../../components/C_UbicacionVehiculoView/MapaUbicacion.vue';
import AlertaModal from '../../components/modals/M_UbicacionVehiculoView/AlertaModal.vue';
import * as turf from '@turf/turf';
import fallas from '../../assets/json/obd_fallas.json'; // Importa el archivo JSON

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

// Función para generar una advertencia aleatoria
function getRandomAdvertencia() {
  const probabilidad = Math.random();
  let tipoAdvertencia = 'Bajo';

  if (probabilidad < 0.4) { // Ajustamos la probabilidad a 40%
    const tipoProb = Math.random();
    if (tipoProb < 0.6) {
      tipoAdvertencia = 'Bajo';
    } else if (tipoProb < 0.9) {
      tipoAdvertencia = 'Mediano';
    } else {
      tipoAdvertencia = 'Alto';
    }
  }

  return tipoAdvertencia;
}

export default {
  components: {
    SeleccionarPlaca,
    FichaTecnica,
    MapaUbicacion,
    AlertaModal
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
      intervalId: null, // ID del intervalo para actualizar la ubicación
      mostrarAlerta: false, // Controla la visibilidad de la alerta
      advertenciaActual: {}, // Datos de la advertencia actual
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
      this.vehiculoSeleccionado = vehiculo;
      if (this.lastLocations[vehiculo.id]) {
        this.prevUbicacion = this.lastLocations[vehiculo.id].prevUbicacion;
        this.ubicacion = this.lastLocations[vehiculo.id].ubicacion;
        this.estadoVehiculo = this.lastLocations[vehiculo.id].estado;
        this.velocidadVehiculo = this.lastLocations[vehiculo.id].velocidad;
      } else {
        this.prevUbicacion = null;
        this.ubicacion = null;
        this.estadoVehiculo = '';
        this.velocidadVehiculo = '';
      }
      await this.buscarUbicacion();
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      this.intervalId = setInterval(this.buscarUbicacion, 5000);
    },
    async buscarUbicacion() {
      const center = this.ubicacion ? [this.ubicacion.lon, this.ubicacion.lat] : [-77.532, -9.327];
      const [lon, lat] = getRandomCoordinateInAncash(center, 0.03);
      try {
        const response = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.445d029b86d0a62e62443cd6e2428c56&lat=${lat}&lon=${lon}&format=json`);
        const data = await response.json();
        const { estado, velocidad } = getRandomSpeedAndState();
        this.prevUbicacion = this.ubicacion;
        this.ubicacion = {
          lat: lat,
          lon: lon,
          direccion: data.display_name || `Lat: ${lat}, Lon: ${lon}`
        };
        this.estadoVehiculo = estado;
        this.velocidadVehiculo = velocidad;
        this.lastLocations[this.vehiculoSeleccionado.id] = {
          prevUbicacion: this.prevUbicacion,
          ubicacion: this.ubicacion,
          estado: this.estadoVehiculo,
          velocidad: this.velocidadVehiculo
        };

        const advertencia = getRandomAdvertencia();
        if (advertencia !== 'Bajo') {
          const fallaSeleccionada = fallas.fallas_obd[Math.floor(Math.random() * fallas.fallas_obd.length)];

          this.advertenciaActual = {
            tipo: advertencia,
            codigo: fallaSeleccionada.codigo,
            descripcion: fallaSeleccionada.descripcion,
            placa: this.vehiculoSeleccionado.placa,
            modelo: this.vehiculoSeleccionado.modelo
          };

          this.mostrarAlerta = true;

          // Enviar los datos a la API para guardar la advertencia
          const averiaData = {
            vehiculoId: this.vehiculoSeleccionado.id,
            tipo: fallaSeleccionada.codigo,
            descripcion: fallaSeleccionada.descripcion,
            ubicacion: this.ubicacion.direccion
          };
          console.log('Datos que se enviarán a la API:', averiaData);

          const guardarResponse = await fetch('http://localhost:8069/api/averias/guardar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(averiaData)
          });

          if (!guardarResponse.ok) {
            console.error('Error al guardar la advertencia:', guardarResponse.statusText);
          } else {
            console.log('Advertencia guardada con éxito');
          }

          if (advertencia === 'Alto') {
            clearInterval(this.intervalId);
          }
        }
      } catch (error) {
        console.error('Error al obtener la dirección:', error);
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
    },
    cerrarAlerta() {
      this.mostrarAlerta = false;
    }
  },
  created() {
    this.cargarVehiculos();
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
};
