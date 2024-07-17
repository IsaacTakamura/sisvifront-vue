export default {
  props: ['drivers'],
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 6
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.drivers.length / this.itemsPerPage);
    },
    paginatedDrivers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.drivers.slice(start, end);
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('es-ES', options);
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  }
};
