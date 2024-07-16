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
