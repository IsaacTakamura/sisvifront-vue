<!-- Pag.Name= ChoferesListView.vue -->
<template>
  <div>
    <input
      type="text"
      :value="localSearch"
      @input="handleInput"
      placeholder="Nombre del Chofer"
      class="form-control"
    />
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="chofer in filteredChoferes"
        :key="chofer.id"
        @click="seleccionarChofer(chofer)"
      >
        {{ chofer.primerNombre }} {{ chofer.apellidoPaterno }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    search: {
      type: String,
      required: true,
    },
    choferes: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      localSearch: this.search,
    };
  },
  computed: {
    filteredChoferes() {
      return this.choferes.filter((chofer) => {
        return chofer.primerNombre
          .toLowerCase()
          .includes(this.localSearch.toLowerCase());
      });
    },
  },
  methods: {
    seleccionarChofer(chofer) {
      this.$emit("mostrar-datos", chofer);
    },
    handleInput(event) {
      this.localSearch = event.target.value;
      this.$emit("update:search", this.localSearch);
    },
  },
};
</script>

<style scoped>
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
