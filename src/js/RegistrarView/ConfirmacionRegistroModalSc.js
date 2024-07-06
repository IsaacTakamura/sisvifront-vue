export default {
    props: {
      isVisible: Boolean,
    },
    methods: {
      close() {
        this.$emit('close');
      },
      confirm() {
        this.$emit('confirm');
      },
    },
  };
  