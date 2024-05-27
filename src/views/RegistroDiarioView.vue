<template>
    <div class="container px-4 text-left">
        <div class="row gx-5">
            <div class="col-2 border p-3">
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
            <div class="col-5 border p-3">
                <h5>FICHA TECNICA</h5>
                <div class="d-flex flex-column vh-100">
                    <div class="border p-3" style="background-color: gray; flex: 0 0 30%;">
                        <!-- Aquí va la imagen del carro -->
                        <img v-if="selectedVehicle" :src="selectedVehicle.image" alt="Car image">
                    </div>
                    <div class="border p-3" style="flex: 0 0 10%;">
                        <!-- Aquí va la ruta de la imagen -->
                        <input type="file" @change="updateImage">
                    </div>
                    <div class="border p-3" style="flex: 0 0 60%;">
                        <!-- Aquí van los detalles del carro -->
                        <div v-if="selectedVehicle">
                            <div class="row">
                                <div class="col">
                                    <label>Placa:</label>
                                    <input type="text" :value="selectedVehicle.placa" readonly>
                                    <label>Cliente:</label>
                                    <input type="text" :value="selectedVehicle.cliente" readonly>
                                    <label>Documento:</label>
                                    <input type="text" :value="selectedVehicle.documento" readonly>
                                    <label>Número de Motor:</label>
                                    <input type="text" :value="selectedVehicle.numeroMotor" readonly>
                                    <label>Número de Serie:</label>
                                    <input type="text" :value="selectedVehicle.numeroSerie" readonly>
                                    <label>Marca:</label>
                                    <input type="text" :value="selectedVehicle.marca" readonly>
                                </div>
                                <div class="col">
                                    <label>Modelo:</label>
                                    <input type="text" :value="selectedVehicle.modelo" readonly>
                                    <label>Año de Fabricación:</label>
                                    <input type="text" :value="selectedVehicle.anoFabricacion" readonly>
                                    <label>Color:</label>
                                    <input type="text" :value="selectedVehicle.color" readonly>
                                    <label>Kilometraje:</label>
                                    <input type="text" :value="selectedVehicle.kilometraje" readonly>
                                    <label>Tipo de Combustible:</label>
                                    <input type="text" :value="selectedVehicle.tipoCombustible" readonly>
                                    <label>Transmisión:</label>
                                    <input type="text" :value="selectedVehicle.transmision" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">

                <div class="row">
                    <div class="row border p-3">
                        <h5>HISTORIAL DE MANTENIMIENTO</h5>
                        <div style="overflow-x: auto;">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Fecha de Salida</th>
                                        <th>Nivel de Daño</th>
                                        <th>Nivel de Combustible</th>
                                        <th>Nivel de Aceite</th>
                                        <th>Kilometraje de Salida</th>
                                        <th>Observaciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="mantenimiento in mantenimientos" :key="mantenimiento.id">
                                        <td>{{ mantenimiento.fechaSalida }}</td>
                                        <td>{{ mantenimiento.nivelDanio }}</td>
                                        <td>{{ mantenimiento.nivelCombustible }}</td>
                                        <td>{{ mantenimiento.nivelAceite }}</td>
                                        <td>{{ mantenimiento.kilometrajeSalida }}</td>
                                        <td>{{ mantenimiento.observaciones }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="division">
                        <!-- espacio vacio para que no este muy pegado -->
                    </div>
                    <div class="row border p-3">
                        <h5>REGISTRAR INGRESO</h5>
                        <!-- Contenido de la segunda mitad -->
                        <div class="form-group row">
                            <label for="ingreso" class="col-sm-2 col-form-label">N°Ingreso</label>
                            <div class="col-sm-10">
                                <input type="number" id="ingreso" v-model="mantenimiento.id" class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="placa" class="col-sm-2 col-form-label">N°de Placa</label>
                            <div class="col-sm-10">
                                <input type="number" id="placa" v-model="mantenimiento.idVehiculo" class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="fecha" class="col-sm-2 col-form-label">Fecha</label>
                            <div class="col-sm-10">
                                <input type="date" id="fecha" v-model="mantenimiento.fechaIngreso" readonly
                                    class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="chofer" class="col-sm-2 col-form-label">Chofer</label>
                            <div class="col-sm-10">
                                <input type="number" id="chofer" v-model="mantenimiento.idChofer" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="kilometraje" class="col-sm-2 col-form-label">Kilometraje Ingreso</label>
                            <input type="number" id="kilometraje" v-model="mantenimiento.kilometrajeIngresado" class="form-control">
                        </div>
                        <div class="division">
                            <!-- espacio vacio para que no este muy pegado -->
                        </div>
                        <button @click="guardarIngreso" class="btn btn-primary">Registrar Ingreso</button>
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
            selectedVehicle: {}, // Inicializa selectedVehicle con un objeto vacío
            // Resto del código
            search: '',
            vehicles: [],
            filteredVehicles: [],
            mantenimiento: {
                id: 0,
                idVehiculo: 0,
                idChofer: 0,
                fechaIngreso: '',
                kilometrajeIngresado: 0,
                observaciones: '',
                estado: true
            }
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
        },
        guardarIngreso() {
            axios.post('http://localhost:8066/api/mantenimiento/ingreso/guardar', this.mantenimiento)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
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

label {
    display: block;
    color: black;

}
</style>