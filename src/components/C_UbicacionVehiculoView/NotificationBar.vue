<template>
    <div class="notification-bar">
      <button @click="toggleNotifications" class="toggle-button">
        {{ notifications.length }} Notificaciones
      </button>
      <div v-if="showNotifications" class="notifications-list">
        <div v-for="(notification, index) in notifications" :key="index" class="notification-item" :class="notification.tipo">
          <button @click="removeNotification(index)" class="close-button">x</button>
          <strong>Placa:</strong> {{ notification.vehiculo.placa }} <br />
          <strong>Modelo:</strong> {{ notification.vehiculo.modelo }} <br />
          <strong>Advertencia:</strong> {{ notification.tipo }} <br />
          <strong>Código:</strong> {{ notification.codigo }} <br />
          <strong>Descripción:</strong> {{ notification.descripcion }} <br />
        </div>
      </div>
    </div>
  </template>
  
  <script src="../../js/UbicacionVehiculoView/NotificationBarSc.js"></script>
  <style scoped src="../../assets/styles/St_UbicacionVehiculoView/NotificationBarSt.css"></style>
  