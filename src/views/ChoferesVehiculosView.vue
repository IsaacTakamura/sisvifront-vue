<template>
    <div id="2_Partes_Pagina" class="container text-center">
        <div class="row">
            <div class="col-md-3">
                <!--Aqui va el listado de choferes-->
                <!--para luego darle click a uno para luego mostrar sus datos-->
                <h1>Choferes</h1>
                <p class="blockquote" >Seleccione un conductor</p>
                <!--Barra de busqueda para filtrar por nombre de conductor-->
                <ChoferesListView :search="search" @update:search="search = $event"></ChoferesListView>
                <ul class="list-group list-group-flush">
                    <li class="list-group list-group-item">
                    </li>
                </ul>

                <!--Tabla que tiene el numero id del chofer y su nombre-->
                <table class="table table-striped table-bordered">
                    <thead class="table-light">
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="chofer in choferes">
                            <td>{{chofer.id}}</td>
                            <td>{{chofer.primerNombre}}</td>
                            <td>{{chofer.apellidoPaterno}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-sm-8">
                <!--Aqui va 2 cuadros, que tiene los datos del conductor y el vehiculo-->
                <div class="container text-center">
                    <div row row-cols>

                        <!--Aca va el cuadro con los datos del Conductor-->
                        <div class="col">
                            
                            <p>
                                <blockquote>
                                
                                </blockquote>
                            </p>
                            <DatosConductorView/>
                        </div>

                        <!--Aca va los datos del vehiculo que esta asignado el conductor-->
                        <div class="col">
                            <h1>
                                Datos del Vehiculo
                            </h1>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
    </div>
</template>
<script> 
import axios from 'axios';
import DatosConductorView from './M.ListadoChoferesVehivulos/DatosConductorView.vue';
import ChoferesList from './M.ListadoChoferesVehivulos/ChoferesListView.vue';

export default {
    components: {
        DatosConductorView,
        ChoferesList
    },
    data() {
        return {
            choferes: [],
            search: ''
        };
    },
    computed: {
        filteredChoferes() {
            return this.choferes.filter(chofer => {
                return chofer.primerNombre.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    },
    methods: {
        async fetchChoferes() {
            const url = 'http://localhost:8069/api/choferes/listar';  // Reemplaza esto con la URL de tu API
            const response = await axios.get(url);
            this.choferes = response.data;
        },
        seleccionarChofer(chofer) {
            this.$emit('mostrar-datos', chofer);
        }
    },
    created() {
        this.fetchChoferes();
    }
};

</script>