// Importa Leaflet y su CSS
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Importa el icono del auto desde la ruta especificada
import carIcon from '../../assets/auto.png'; // Asegúrate de que la ruta sea correcta

export default {
  name: 'MapComponent', // Nombre del componente
  props: {
    lat: {
      type: Number,
      required: true // Latitud del marcador, es un número y es requerido
    },
    lon: {
      type: Number,
      required: true // Longitud del marcador, es un número y es requerido
    },
    prevLat: {
      type: Number,
      default: null // Latitud de la ubicación anterior, es un número y tiene un valor por defecto de null
    },
    prevLon: {
      type: Number,
      default: null // Longitud de la ubicación anterior, es un número y tiene un valor por defecto de null
    },
    placa: {
      type: String,
      required: true // Placa del vehículo, es una cadena y es requerida
    },
    nombreVehiculo: {
      type: String,
      required: true // Nombre del vehículo, es una cadena y es requerida
    }
  },
  data() {
    return {
      map: null, // Instancia del mapa
      marker: null, // Marcador del vehículo
      prevMarker: null, // Marcador de la ubicación anterior
      polyline: null // Línea que conecta las ubicaciones
    };
  },
  mounted() {
    this.initMap(); // Inicializa el mapa cuando el componente se monta
  },
  watch: {
    // Observa cambios en la latitud y actualiza el marcador
    lat(newLat) {
      this.updateMarker(newLat, this.lon);
    },
    // Observa cambios en la longitud y actualiza el marcador
    lon(newLon) {
      this.updateMarker(this.lat, newLon);
    },
    // Observa cambios en la latitud anterior y actualiza el marcador anterior
    prevLat(newPrevLat) {
      this.updatePrevMarker(newPrevLat, this.prevLon);
    },
    // Observa cambios en la longitud anterior y actualiza el marcador anterior
    prevLon(newPrevLon) {
      this.updatePrevMarker(this.prevLat, newPrevLon);
    }
  },
  methods: {
    initMap() {
      // Inicializa el mapa centrado en la ubicación actual
      this.map = L.map('map', {
        zoomAnimation: false, // Deshabilita la animación de zoom
        zoomControl: true // Habilita el control de zoom
      }).setView([this.lat, this.lon], 13);

      // Agrega la capa de tiles de OpenStreetMap al mapa
      L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // Define el icono del marcador del vehículo
      const carMarkerIcon = L.icon({
        iconUrl: carIcon,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
      });

      // Agrega el marcador del vehículo al mapa
      this.marker = L.marker([this.lat, this.lon], { icon: carMarkerIcon }).addTo(this.map)
        .bindPopup(`Última ubicación del vehículo. <br> Placa: ${this.placa} <br> Vehículo: ${this.nombreVehiculo}`)
        .openPopup();

      // Si hay una ubicación anterior, agrega un marcador y una línea que conecta las ubicaciones
      if (this.prevLat !== null && this.prevLon !== null) {
        this.prevMarker = L.marker([this.prevLat, this.prevLon], { icon: carMarkerIcon }).addTo(this.map)
          .bindPopup(`Ubicación anterior del vehículo. <br> Placa: ${this.placa} <br> Vehículo: ${this.nombreVehiculo}`)
          .openPopup();

        this.polyline = L.polyline([[this.prevLat, this.prevLon], [this.lat, this.lon]], { color: 'red' }).addTo(this.map);
      }
    },
    updateMarker(lat, lon) {
      if (!this.map) return;
      if (this.marker) {
        // Actualiza la posición del marcador del vehículo
        this.marker.setLatLng([lat, lon])
          .bindPopup(`Última ubicación del vehículo. <br> Placa: ${this.placa} <br> Vehículo: ${this.nombreVehiculo}`)
          .openPopup();
      } else {
        // Crea un nuevo marcador si no existe
        const carMarkerIcon = L.icon({
          iconUrl: carIcon,
          iconSize: [50, 50],
          iconAnchor: [25, 50],
          popupAnchor: [0, -50]
        });

        this.marker = L.marker([lat, lon], { icon: carMarkerIcon }).addTo(this.map)
          .bindPopup(`Última ubicación del vehículo. <br> Placa: ${this.placa} <br> Vehículo: ${this.nombreVehiculo}`)
          .openPopup();
      }
      // Centra el mapa en la nueva ubicación del marcador
      if (this.map) {
        this.map.setView([lat, lon], 13, { animate: false });
      }
      // Actualiza la línea que conecta las ubicaciones
      if (this.prevLat !== null && this.prevLon !== null) {
        if (this.polyline) {
          this.polyline.setLatLngs([[this.prevLat, this.prevLon], [lat, lon]]);
        } else {
          this.polyline = L.polyline([[this.prevLat, this.prevLon], [lat, lon]], { color: 'red' }).addTo(this.map);
        }
      }
    },
    updatePrevMarker(lat, lon) {
      if (!this.map || lat === null || lon === null) return;
      if (this.prevMarker) {
        // Actualiza la posición del marcador anterior
        this.prevMarker.setLatLng([lat, lon])
          .bindPopup(`Ubicación anterior del vehículo. <br> Placa: ${this.placa} <br> Vehículo: ${this.nombreVehiculo}`)
          .openPopup();
      } else {
        // Crea un nuevo marcador anterior si no existe
        const carMarkerIcon = L.icon({
          iconUrl: carIcon,
          iconSize: [50, 50],
          iconAnchor: [25, 50],
          popupAnchor: [0, -50]
        });

        this.prevMarker = L.marker([lat, lon], { icon: carMarkerIcon }).addTo(this.map)
          .bindPopup(`Ubicación anterior del vehículo. <br> Placa: ${this.placa} <br> Vehículo: ${this.nombreVehiculo}`)
          .openPopup();
      }
      // Actualiza la línea que conecta las ubicaciones
      if (this.polyline) {
        this.polyline.setLatLngs([[lat, lon], [this.lat, this.lon]]);
      } else {
        this.polyline = L.polyline([[lat, lon], [this.lat, this.lon]], { color: 'red' }).addTo(this.map);
      }
    }
  }
};
