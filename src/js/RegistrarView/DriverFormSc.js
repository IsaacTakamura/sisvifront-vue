export default {
    name: 'DriverForm',
    props: {
      driver: Object,
      errors: Object,
      dateError: Boolean,
      dateErrorMessage: String
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
  