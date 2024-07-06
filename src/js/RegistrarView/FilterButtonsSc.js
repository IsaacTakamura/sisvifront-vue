export default {
    name: 'FilterButtons',
    methods: {
      filterActive() {
        this.$emit('filter', 'active');
      },
      filterAll() {
        this.$emit('filter', 'all');
      },
      filterInactive() {
        this.$emit('filter', 'inactive');
      }
    }
  };