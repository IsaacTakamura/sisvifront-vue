<template>
    <div id="2_Partes_Pagina" class="container text-center">
        <div class="row">
            <div class="col-md-3">
                <!--Aqui va el listado de choferes-->
                <!--para luego darle click a uno para luego mostrar sus datos-->
                <h1>Choferes</h1>
                <p class="blockquote" >Seleccione un conductor</p>
                <!--Barra de busqueda para filtrar por nombre de conductor-->
                <input type="text" v-model="search" placeholder="Nombre deL Chofer" class="form-control">
                <ul class="list-group
                    list-group-flush">
                    <li class="list-group
                        list-group-item" v-for="chofer in choferes" @click="mostrarDatos(chofer)">
                        {{chofer.nombre}}
                    </li>
                </ul>

                <!--Tabla que tiene el numero id del chofer y su nombre-->
                <table class="table table-striped table-bordered">
                    <thead class="table-light">
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="chofer in choferes">
                            <td>{{chofer.id}}</td>
                            <td>{{chofer.nombre}}</td>
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
                            <h1>
                                Datos del Conductor
                            </h1>
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