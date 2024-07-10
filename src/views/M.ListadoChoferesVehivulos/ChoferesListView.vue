<template>
    
    
    <div class="col-md-3">
      <h1>Choferes</h1>
      <p class="blockquote">Seleccione un conductor</p>
      <input type="text" :value="localSearch" @input="handleInput" placeholder="Nombre del Chofer" class="form-control">
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
  </template>
  
  <script>
  export default {
    props: ['search', 'choferes'], // Asegúrate de que search y choferes estén definidos como props si vienen del componente padre
    data() {
      return {
        localSearch: this.search, // Inicializa localSearch con el valor de search
      };
    },
    computed: {
      filteredChoferes() {
        // Usa localSearch para el filtrado
        return this.choferes.filter(chofer => {
          return chofer.primerNombre.toLowerCase().includes(this.localSearch.toLowerCase());
        });
      }
    },
    methods: {
      seleccionarChofer(chofer) {
        this.$emit('mostrar-datos', chofer);
      },
      updateSearch(event) {
        this.localSearch = event.target.value;
        this.$emit('update:search', this.localSearch); // Emite el evento con el nuevo valor
      },
    }
  };
  </script>
  