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
  // Se define la propiedad sections con un arreglo de objetos que contienen la información de cada sección
  name: 'App',
  data() {
    return {
      // Se define la propiedad sections con un arreglo de objetos que contienen la información de cada sección
      sections: [
        { title: 'REGISTRAR VEHICULO', image: require('../assets/register-vehiculo.jpg'), button: 'REGISTRAR', route: '/ficha' },
        { title: 'REGISTRAR CONDUCTOR', image: require('../assets/conductor.jpg'), button: 'REGISTRAR', route: '/registrou' },
        { title: 'REGISTRAR PRODUCTO', image: require('../assets/piezas.jpg'), button: 'REGISTRAR', route: '/gestion' }
      ]
    }
  },
  // Se define el método navigate que recibe un objeto item y redirige a la ruta especificada en el objeto
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
  background: #141414;
  padding-top: 55px;
  height: 100vh;

}

.container {
  display: flex;
  flex-wrap: wrap; /* Permite que las tarjetas se ajusten y envuelvan */
  justify-content: center;
  gap: 20px;
}


.card {
  background-color: #282828;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 10px;
}

.card h2 {
  color: #fff;
  margin-bottom: 20px;
  font-weight: 600;
}

.image-container {
  background-color: #353535;
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
}

.image-container img {
  width: 100%;
  max-height: 350px; /* Ajusta la altura máxima de las imágenes */
  object-fit: cover; /* Asegura que la imagen cubra el espacio disponible sin distorsionarse */
  border-radius: 10px;
}




.controls {
  margin-top: 20px;
}

.controls button {
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
}

.controls button:hover {
  background-color: #e10404e0;
}
</style>