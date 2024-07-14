export default {
    data() {
      return {
        showNotifications: false,
        notifications: []
      };
    },
    methods: {
      toggleNotifications() {
        this.showNotifications = !this.showNotifications;
      },
      addNotification(notification) {
        this.notifications.push(notification);
      },
      removeNotification(index) {
        this.notifications.splice(index, 1);
      }
    }
  };
  