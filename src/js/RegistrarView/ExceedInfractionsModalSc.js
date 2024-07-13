export default {
    props: {
      isVisible: Boolean
    },
    watch: {
      isVisible(val) {
        if (val) {
          setTimeout(() => {
            this.$emit('close');
          }, 3000);
        }
      }
    }
  };
  