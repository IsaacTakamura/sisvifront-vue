<template>
    <div class="col-md-3">
        <h1>Choferes</h1>
        <p class="blockquote">Seleccione un conductor</p>
        <input type="text" v-model="search" placeholder="Nombre del Chofer" class="form-control">
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="chofer in filteredChoferes" :key="chofer.id" @click="seleccionarChofer(chofer)">
                {{ chofer.primerNombre }} {{ chofer.apellidoPaterno }}
            </li>
        </ul>
        <table class="table table-striped table-bordered">
            <thead class="table-light">
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="chofer in filteredChoferes" :key="chofer.id">
                <td>{{ chofer.id }}</td>
                <td>{{ chofer.primerNombre }}</td>
                <td>{{ chofer.apellidoPaterno }}</td>
            </tr>
        </tbody>
    </table>
</div>
</template >

    <script>
        export default {
            props: ['choferes', 'search'],
        computed: {
            filteredChoferes() {
      return this.choferes.filter(chofer => {
        return chofer.primerNombre.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
        methods: {
            seleccionarChofer(chofer) {
            this.$emit('mostrar-datos', chofer);
    }
  }
};
    </script>
