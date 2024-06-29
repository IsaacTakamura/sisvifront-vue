<template>
  <div id="map" :style="{ height: '500px', width: '100%' }"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import carIcon from './auto.png'; // Asegúrate de que la ruta sea correcta

export default {
  name: 'MapComponent',
  props: {
    lat: {
      type: Number,
      required: true
    },
    lon: {
      type: Number,
      required: true
    },
    prevLat: {
      type: Number,
      default: null
    },
    prevLon: {
      type: Number,
      default: null
    },
    placa: {
      type: String,
      required: true
    },
    nombreVehiculo: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      map: null,
      marker: null,
      prevMarker: null,
      polyline: null
    };
  },
  mounted() {
    this.initMap();
  },
  watch: {
    lat(newLat) {
      this.updateMarker(newLat, this.lon);
    },
    lon(newLon) {
      this.updateMarker(this.lat, newLon);
    },
    prevLat(newPrevLat) {
      this.updatePrevMarker(newPrevLat, this.prevLon);
    },
    prevLon(newPrevLon) {
      this.updatePrevMarker(this.prevLat, newPrevLon);
    }
  },
  methods: {
    initMap() {
      this.map = L.map('map', {
        zoomAnimation: false, // Deshabilita la animación de zoom
        zoomControl: true
      }).setView([this.lat, this.lon], 13);

      L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      const carMarkerIcon = L.icon({
        iconUrl: carIcon,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
      });

      this.marker = L.marker([this.lat, this.lon], { icon: carMarkerIcon }).addTo(this.map)
        .bindPopup(`Última ubicación del vehículo. <br> Placa: ${this.placa} <br> Vehículo: ${this.nombreVehiculo}`)
        .openPopup();

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
        this.marker.setLatLng([lat, lon])
          .bindPopup(`Última ubicación del vehículo. <br> Placa: ${this.placa} <br> Vehículo: ${this.nombreVehiculo}`)
          .openPopup();
      } else {
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
      if (this.map) {
        this.map.setView([lat, lon], 13, { animate: false });
      }
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
        this.prevMarker.setLatLng([lat, lon])
          .bindPopup(`Ubicación anterior del vehículo. <br> Placa: ${this.placa} <br> Vehículo: ${this.nombreVehiculo}`)
          .openPopup();
      } else {
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
      if (this.polyline) {
        this.polyline.setLatLngs([[lat, lon], [this.lat, this.lon]]);
      } else {
        this.polyline = L.polyline([[lat, lon], [this.lat, this.lon]], { color: 'red' }).addTo(this.map);
      }
    }
  }
};
</script>

<style scoped>
#map {
  height: 500px;
  width: 100%;
}
</style>
