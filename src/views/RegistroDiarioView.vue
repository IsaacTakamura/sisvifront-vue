<template>
    <div class="app">
        <div class="container px-4 text-left">
            <div class="row" id="info-veh">
                <div class="col-2 p-3" id="sl-placa">
                    <h4>Seleccionar Placa</h4>
                    <hr>
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
                    
                </div>
                <div class="col-10 p-3" id="info-tecnica">
                    <div class="d-flex flex-column ">
                        <div class=" p-3" style="flex: 0 0 10%;">
            <h4 class="text-center">Ficha Técnica</h4>
            <hr>
            <!-- Botón para seleccionar imagen -->
            <input type="file" @change="onFileChange">
        </div>
        <div class="p-3"
        :style="{ backgroundImage: `url(${selectedVehicle.img})`, backgroundSize: 'cover', flex: '0 0 30%' }">
        <!-- Aquí se muestra la imagen seleccionada -->
        <img v-if="imageUrl" :src="imageUrl" alt="Imagen seleccionada" class="uploaded-image">
    </div>
    <hr>
        <div class="p-3">
            <!-- Detalles del carro -->
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
                    
                    <div class="row p-3" id="ht-mant">
                        <h4>Historial de Mantenimiento</h4>
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
    <div class="row p-3" id="reg-ing">
        <h4>Registrar Ingreso</h4>
        <hr>
        <!-- Contenido de la segunda mitad -->
        <div class="form-row"> <!-- Contenedor Flex para dos columnas -->
            <div class="form-group col-md-6"> <!-- Columna izquierda -->
                <label for="placaVehiculo" class="col-form-label">N° de Placa</label>
                <input type="text" id="placaVehiculo" v-model="mantenimiento.placaVehiculo" class="form-control">
                <label for="dniChofer" class="col-form-label">DNI Chofer</label>
                <input type="text" id="dniChofer" v-model="mantenimiento.dniChofer" class="form-control">
            </div>
            <div class="form-group col-md-6"> <!-- Columna derecha -->
                <label for="kilometrajeIngresado" class="col-form-label">Kilometraje ingresado</label>
                <input type="number" id="kilometrajeIngresado" v-model="mantenimiento.kilometrajeIngresado" class="form-control">
                <label for="observaciones" class="col-form-label">Observaciones</label>
                <input type="text" id="observaciones" v-model="mantenimiento.observaciones" class="form-control">
            </div>
        </div>
        <button @click="guardarIngreso" class="btn btn-primary">Registrar Ingreso</button>
        <p>La placa y el DNI  deben existir en la base de datos</p>
  
</div>
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
            axios.get('http://localhost:8069/api/vehiculos/imagen')
                .then(response => {
                    this.imageUrl = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        // Método para obtener el historial de mantenimiento
        fetchMaintenanceHistory() {
            axios.get('http://localhost:8069/api/mantenimiento/historial')
                .then(response => {
                    this.mantenimientos = response.data;
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

<style src="../assets/styles/St_RegistrarView/registroDiarioView.css"></style>