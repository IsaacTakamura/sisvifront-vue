<template>
  <div id="app">
    <div class="container">
      <section v-for="(item, index) in sections" :key="index" class="card">
        <h2>{{ item.title }}</h2>
        <div class="image-container">
          <img :src="item.image" alt="vehicle" />
        </div>
        <div class="controls">
          <!-- Se agrega @click para manejar el evento de clic en el botón, llamando a navigate(item) -->
          <button @click="navigate(item)">{{ item.button }}</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      sections: [
        { title: 'REGISTRAR VEHICULO', image: require('../assets/vehicle.png'), button: 'REGISTRAR', route: '/registro' },
        { title: 'REGISTRAR CONDUCTOR', image: require('../assets/driver.png'), button: 'REGISTRAR', route: '/registrou' },
        { title: 'REGISTRAR PRODUCTO', image: require('../assets/spear.png'), button: 'REGISTRAR', route: '/gestion' }
      ]
    }
  },
  methods: {
    navigate(item) {
      if (item.route) {
        this.$router.push(item.route);
      }
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.card {
  background-color: #1e1e2f;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card h2 {
  color: #fff;
  margin-bottom: 20px;
}

.image-container {
  background-color: #2a2a3f;
  padding: 10px;
  border-radius: 10px;
}

.image-container img {
  width: 100%;
  border-radius: 10px;
}

.controls {
  margin-top: 20px;
}

.controls button {
  background-color: #ff5722;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.controls button:hover {
  background-color: #e64a19;
}
</style>