<template>
  <div class="index-page">
    <!-- Hero section -->
    <section class="hero">
      <div class="hero-content">
        <h1>{{ pageTitle }}</h1>
        <p>{{ pageSubtitle }}</p>
        <router-link to="/about" class="button">Conoce más</router-link>
      </div>
      <img class="hero-image" src="../assets/images/index/hero-image.png" alt="Hero Image">
    </section>

    <!-- About SISVI section -->
    <section class="about">
      <div class="about-content">
        <h2>Acerca de SISVI</h2>
        <p>En un mundo empresarial en constante evolución, SISVI se posiciona como la solución definitiva para la gestión de flotas, integrando tecnología de vanguardia y análisis de datos en tiempo real. Nuestra misión es optimizar las operaciones de transporte de manera estratégica y rentable, ofreciendo a nuestros clientes la capacidad de tomar decisiones informadas basadas en datos concretos obtenidos de dispositivos OBD-II.</p>
      </div>
      <img class="about-image" src="../assets/images/index/about-image.jpg" alt="About Image">
    </section>

    <!-- Features section -->
    <section class="features">
      <div class="feature">
        <img id="feature-image-1" src="../assets/images/index/feauture-image-1.png" alt="Feature Image">
        <div class="feature-content">
          <h2>Optimización y Sostenibilidad</h2>
          <p>Integra tecnología avanzada y análisis de datos para optimizar las operaciones de transporte de manera estratégica y rentable.</p>
        </div>
      </div>
      <div class="feature">
        <img id="feature-image-2" src="../assets/images/index/feature-image-2.png" alt="Feature Image">
        <div class="feature-content">
          <h2>Decisiones Basadas en Datos</h2>
          <p>Obtén insights precisos para tomar decisiones estratégicas basadas en datos concretos obtenidos de dispositivos OBD-II.</p>
        </div>
      </div>
    </section>

    <!-- Testimonials section -->
    <section class="testimonials">
      <h2>Testimonios de Clientes</h2>
      <div class="clients">
        <div class="testimonial">
          <img src="../assets/images/index/client-1.jpg" alt="Client Image">
          <p>"SISVI ha transformado nuestra flota, reduciendo costos y mejorando la eficiencia de manera significativa."</p>
          <span>— Gustavo García, CEO UniteDs</span>
        </div>
        <div class="testimonial">
          <img src="../assets/images/index/client-2.jpg" alt="Client Image">
          <p>"Recomendaría SISVI a cualquier empresa que busque optimizar su gestión de flotas de manera inteligente y sostenible."</p>
          <span>— Andrea Carajulca, Directora Xperience</span>
        </div>
      </div>
    </section>

    <!-- Contact section -->
    <section class="contact">
      <h2>Contacto</h2>
      <p>Estamos aquí para ayudarte. Contáctanos para más información sobre nuestras soluciones.</p>
      <router-link to="/contact" class="button">Contactar</router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      pageTitle: 'Bienvenido a SISVI: Su solución integral para la gestión de flotas.',
      pageSubtitle: 'Optimización y sostenibilidad en la gestión de flotas a través de tecnología de vanguardia y análisis de datos.'
    }
  }
}
</script>

<style scoped>
/* Estilos para cada sección */
body,html {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80px 20px;
  background-color: #f0f0f0;
}

.hero-content {
  max-width: 50%;
}

.hero h1 {
  font-size: 3em;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.1em;
}

.about {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80px 20px;
}

.about-content {
  max-width: 50%;
}

.about h2 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.about p {
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 30px;
}

.features {
  display: flex;
  justify-content: space-around;
  padding: 80px 20px;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 45%;
}

.feature img {
  max-width: 100%;
  margin-bottom: 20px;
}

.feature-content {
  text-align: center;
}

.testimonials {
  padding: 80px 20px;
  background-color: #f0f0f0;
  text-align: center;
}

.clients {
  display: flex;
  justify-content: space-around;
  
}

.testimonial {
  margin-top: 10px;
  margin-bottom: 40px;
  max-width: 45%;
  text-align: center;
}

.testimonial img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 10px;

}

.contact {
  padding: 80px 20px;
  text-align: center;
}
/* Estilos para imágenes específicas usando clases */
.hero-image {
  width: 50%; /* Ajusta según necesites */
  height: auto; /* Mantiene la proporción */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.about-image {
  width: 40%; /* Ajusta según necesites */
  height: auto; /* Mantiene la proporción */
  border-radius: 10px;
}

/* Estilos para imágenes específicas usando identificadores */
#feature-image-1 {
  width: 75%; /* Ajusta según necesites */
  height: auto; /* Mantiene la proporción */
  border-radius: 10px;
}

#feature-image-2 {
  width: 71%; /* Ajusta según necesites */
  height: auto; /* Mantiene la proporción */
  border-radius: 10px;
}



</style>
