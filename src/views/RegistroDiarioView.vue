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
                        <tr v-for="vehicle in filteredVehicles" :key="vehicle.id" @click="selectVehicle(vehicle)">
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
                    <div class="border p-3"
                        :style="{ backgroundImage: `url(${selectedVehicle.img})`, backgroundSize: 'cover', flex: '0 0 30%' }">
                        <!-- Aquí va la imagen del carro -->
                        <img v-if="imageUrl" :src="imageUrl" alt="Imagen seleccionada" class="uploaded-image">
                        <div :style="{ backgroundImage: 'url(' + imageUrl + ')' }">
                            <!-- Contenido aquí -->
                        </div>
                    </div>
                    <div class="border p-3" style="flex: 0 0 10%;">
                        <!-- Aquí va la ruta de la imagen -->
                        <input type="file" @change="onFileChange">

                    </div>
                    <div class="border p-3" style="flex: 0 0 60%;">
                        <!-- Aquí van los detalles del carro -->
                        <div v-if="selectedVehicle">
                            <div class="row">
                                <div class="col">
                                    <label>Placa:</label>
                                    <input type="text" :value="selectedVehicle ? selectedVehicle.placa : ''" readonly>
                                    <label>Número de Motor:</label>
                                    <input type="text" :value="selectedVehicle.numMotor" readonly>
                                    <label>Número de Serie:</label>
                                    <input type="text" :value="selectedVehicle.numSerie" readonly>
                                    <label>Marca:</label>
                                    <input type="text" :value="selectedVehicle.marca" readonly>
                                    <label>Modelo:</label>
                                    <input type="text" :value="selectedVehicle.modelo" readonly>
                                </div>
                                <div class="col">

                                    <label>Año de Fabricación:</label>
                                    <input type="text" :value="selectedVehicle.anioFabricacion" readonly>
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
                
                <div class="row border p-3">
                    <h5>HISTORIAL DE MANTENIMIENTO</h5>
                    <div style="overflow-x: auto;">
                        <table>
                            <thead>
                                <tr>
                                    <th>F-Salida</th>
                                    <th>Nvl-Daño</th>
                                    <th>Nvl-Combustible</th>
                                    <th>Nvl-Aceite</th>
                                    <th>Km-Salida</th>
                                    <th>Observaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="mantenimientos in mantenimientos" :key="mantenimientos.id">
                                    <td>{{ mantenimientos.fechaSalida }}</td>
                                    <td>{{ mantenimientos.nivelDanio }}</td>
                                    <td>{{ mantenimientos.nivelCombustible }}</td>
                                    <td>{{ mantenimientos.nivelAceite }}</td>
                                    <td>{{ mantenimientos.kilometrajeSalida }}</td>
                                    <td>{{ mantenimientos.observaciones }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="division">
                        <!-- espacio vacio para que no este muy pegado -->
                    </div>
                    <div class="row border p-3">
                        <h5>REGISTRAR INGRESO</h5><br>
                        <!-- Contenido de la segunda mitad -->
                        <div class="form-group">
                            <label for="placaVehiculo" class="col-sm-2 col-form-label-row">N°de Placa</label>
                            <div class="col-sm-7">
                                <input type="text" id="placaVehiculo" v-model="mantenimiento.placaVehiculo"
                                    class="form-control">
                            </div><br>
                        </div>
                        <div class="form-group">
                            <label for="dniChofer" class="col-sm-2 col-form-label-row">DNI Chofer</label>
                            <div class="col-sm-10">
                                <input type="text" id="dniChofer" v-model="mantenimiento.dniChofer"
                                    class="form-control">
                            </div><br>
                        </div>
                        <div class="form-group">
                            <label for="kilometrajeIngresado" class="col-sm-2 col-form-label-row">Kilometraje ingresado</label>
                            <div class="col-sm-10">
                                <input type="number" id="kilometrajeIngresado"
                                    v-model="mantenimiento.kilometrajeIngresado" class="form-control">
                            </div><br>

                        </div>
                        <div class="form-group">
                            <label for="observaciones" class="col-sm-2 col-form-label-row">observaciones</label>
                            <div class="col-sm-10">
                                <input type="text" id="observaciones" v-model="mantenimiento.observaciones"
                                    class="form-control">
                            </div>
                        </div>
                        <div class="division">
                            <!-- espacio vacio para que no este muy pegado -->
                        </div>
                        <button @click="guardarIngreso" class="btn btn-primary">Registrar Ingreso</button>
                        <label for="">*La placa y el DNI deben existir en la base de datos*</label>
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
        // Inicializa selectedVehicle con un objeto vacío
        return {
            selectedVehicle: {}, // Inicializa selectedVehicle con un objeto vacío
            // Resto del código
            search: '',
            vehicles: [],
            filteredVehicles: [],
            imageUrl: '',
            mantenimiento: {
                placaVehiculo: '',
                dniChofer: '',
                kilometrajeIngresado: 0,
                observaciones: '',
            },
            mantenimientos: []
        }
    },
    // Método que se ejecuta cuando el componente se monta
    mounted() {
        this.fetchImageData();
    },
    watch: {
        // Actualiza la lista filtrada cada vez que cambia el valor de 'search'
        search() {
            this.filterVehicles();
        }
    },
    methods: {
        // Método para manejar el cambio de imagen
        onFileChange(e) {
            const file = e.target.files[0];
            this.createImageUrl(file);
        },
        // Método para crear la URL de la imagen
        createImageUrl(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imageUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        // Método para obtener los vehículos
        fetchVehicles() {
            axios.get(`http://localhost:8069/api/vehiculos/listar`)
                .then(response => {
                    this.vehicles = response.data;
                    // Filtra los vehículos inmediatamente después de obtenerlos
                    this.filterVehicles();
                }) // Captura cualquier error y lo muestra en la consola
                .catch(error => {
                    console.error(error);
                });
        }, // Método para filtrar los vehículos
        filterVehicles() {
            // Filtra los vehículos basándose en el valor de 'search'
            this.filteredVehicles = this.vehicles.filter(vehicle => vehicle.placa.includes(this.search));
        },
        // Método para registrar una nueva placa
        registerNewPlate() {
            // Código para registrar una nueva placa
        },
        // Método para guardar un ingreso
        guardarIngreso() {
            axios.post('http://localhost:8069/api/mantenimiento/ingreso/guardar', this.mantenimiento)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // Método para seleccionar un vehículo
        selectVehicle(vehicle) {
            this.selectedVehicle = vehicle;
        },
        // Método para obtener la imagen de un vehículo
        fetchImageData() {
            axios.get('http://localhost:8069/api/vehiculos/listar')
                .then(response => {
                    this.imageUrl = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        }

    },
    // Método que se ejecuta cuando el componente se monta
    created() {
        // Obtiene los vehículos cuando se crea el componente
        this.fetchVehicles();
    },
    // Método para seleccionar un vehículo
    selectVehicle(vehicle) {
        this.vehicleSelected = vehicle;
    },

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

.uploaded-image {
    max-width: 100%;
    height: auto;
}
</style>