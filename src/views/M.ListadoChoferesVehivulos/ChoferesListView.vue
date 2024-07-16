<template>
  <div class="col-md-3">
    <h1 class="title">Choferes</h1>
    <p class="subtitle">Seleccione un conductor</p>
    <input type="text" :value="localSearch" @input="handleInput" placeholder="Nombre del Chofer" class="form-control">
    <ul class="list-group">
      <li class="list-group-item" v-for="chofer in filteredChoferes" :key="chofer.id" @click="seleccionarChofer(chofer)">
        {{ chofer.primerNombre }} {{ chofer.apellidoPaterno }}
      </li>
    </ul>
    <table class="table">
      <thead class="table-light">
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Apellido</th>
        </tr>
      </thead>
      <tbody>
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
  props: ['search', 'choferes'],
  data() {
    return {
      localSearch: this.search,
    };
  },
  computed: {
    filteredChoferes() {
      return this.choferes.filter(chofer => {
        return chofer.primerNombre.toLowerCase().includes(this.localSearch.toLowerCase());
      });
    }
  },
  methods: {
    seleccionarChofer(chofer) {
      this.$emit('mostrar-datos', chofer);
    },
    handleInput(event) {
      this.localSearch = event.target.value;
      this.$emit('update:search', this.localSearch);
    },
  }
};
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: bold;
}

.subtitle {
  font-size: 16px;
  color: #888;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.list-group-item {
  cursor: pointer;
  padding: 8px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 8px;
  border: 1px solid #ccc;
}

.table-light {
  background-color: #f8f9fa;
}

.table-group-divider tr:nth-child(even) {
  background-color: #f8f9fa;
}
</style>