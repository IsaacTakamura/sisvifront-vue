export default {
  name: 'DriverForm',
  props: {
    driver: Object,
    errors: Object,
    dateError: Boolean,
    dateErrorMessage: String
  },
  data() {
    return {
      showErrors: {}
    };
  },
  watch: {
    errors: {
      handler(newErrors) {
        this.showErrors = { ...newErrors };
        // Clear error messages after 3 seconds
        setTimeout(() => {
          this.showErrors = {};
        }, 3000);
      },
      immediate: true,
      deep: true
    },
    dateError(newVal) {
      if (newVal) {
        this.showErrors.dateError = true;
        // Clear date error message after 3 seconds
        setTimeout(() => {
          this.showErrors.dateError = false;
        }, 3000);
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit');
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
