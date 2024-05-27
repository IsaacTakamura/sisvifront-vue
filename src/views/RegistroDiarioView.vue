<template>
    <div class="container px-4 text-left">
        <div class="row gx-5">
            <div class="col-3 border p-3">
                <h5>SELECCIONAR PLACA</h5><br>
                <h6>Buscar placa</h6>
                <input type="text" v-model="search" @input="fetchVehicles" placeholder="Placa">
                <table v-if="vehicles.length">
                    <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Marca</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="vehicle in filteredVehicles" :key="vehicle.id">
                            <td>{{ vehicle.placa }}</td>
                            <td>{{ vehicle.marca }}</td>
                        </tr>
                    </tbody>
                </table>
                <button @click="registerNewPlate">Registrar nueva placa</button>
            </div>
            <div class="col border p-3">
                <h5>FICHA TECNICA</h5>
                <div class="p-3">Custom column padding</div>
            </div>
            <div class="col">

                <div class="row">
                    <div class="row border p-3">
                        <h5>HISTORIAL DE MANTENIMIENTO</h5>
                        <!-- Contenido de la primera mitad -->
                    </div>
                    <div class="division">
                        <!-- espacio vacio para que no este muy pegado -->
                    </div>
                    <div class="row border p-3">
                        <h5>REGISTRAR INGRESO</h5>
                        <!-- Contenido de la segunda mitad -->
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
            search: '',
            vehicles: [],
            filteredVehicles: []
        }
    },
    watch: {
        // Actualiza la lista filtrada cada vez que cambia el valor de 'search'
        search() {
            this.filterVehicles();
        }
    },
    methods: {
        fetchVehicles() {
            axios.get(`http://localhost:8063/api/vehiculos/listar`)
                .then(response => {
                    this.vehicles = response.data;
                    // Filtra los vehículos inmediatamente después de obtenerlos
                    this.filterVehicles();
                })
                .catch(error => {
                    console.error(error);
                });
        },
        filterVehicles() {
            // Filtra los vehículos basándose en el valor de 'search'
            this.filteredVehicles = this.vehicles.filter(vehicle => vehicle.placa.includes(this.search));
        },
        registerNewPlate() {
            // Código para registrar una nueva placa
        }
    },
    created() {
        // Obtiene los vehículos cuando se crea el componente
        this.fetchVehicles();
    }
}
</script>

<style scoped>
.division {
    margin: 10px 0;
    /* Ajusta este valor a tus necesidades */
}
</style>