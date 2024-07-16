<!-- Pag.Name=DatosConductorView.vue -->
<template>
  <div class="driver-license">
    <div class="header">
      <h1>Datos del Conductor</h1>
    </div>
    <div class="Datos_Conductor">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="center-container">
              <div class="portrait" :style="{ backgroundImage: `url(${perfilImg})` }"></div>
            </div>
          </div>
          <div class="col-md-4 container text-left">
            <div class="conductor-identificate">
              <span>DNI:</span>
              <span>{{ chofer.dni }}</span>
            </div>
            <div class="container text-left driver-first-name">
              <span>Nombre:</span>
              <span>{{ chofer.primerNombre }}</span>
            </div>
            <div class="driver-last-name">
              <span>Apellido:</span>
              <span>{{ chofer.apellidoPaterno }}</span>
            </div>
            <div class="driver-licencia">
              <span>Licencia:</span>
              <span>{{ chofer.licenciaConducir }}</span>
            </div>
            <div class="driver-category">
              <span>Categoria:</span>
              <span>{{ chofer.categoriaLicencia }}</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="driver-telefono">
              <span>Telefono:</span>
              <span>{{ chofer.telefono }}</span>
            </div>
            <div class="second-name">
              <span>Segundo Nombre:</span>
              <span>{{ chofer.segundoNombre }}</span>
            </div>
            <div class="second-last-name">
              <span>Segundo Apellido:</span>
              <span>{{ chofer.apellidoMaterno }}</span>
            </div>
            <div class="driver-fecha-vencimiento">
              <span>Fecha de Vencimiento:</span>
              <span>{{ new Date(chofer.fechaVencimientoLicencia).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chofer: {
      type: Object,
      required: true,
      default: () => ({
        dni: '',
        primerNombre: '',
        apellidoPaterno: '',
        licenciaConducir: '',
        categoriaLicencia: '',
        telefono: '',
        segundoNombre: '',
        apellidoMaterno: '',
        fechaVencimientoLicencia: '',
      })
    }
  },
  data() {
    return {
      perfilImg: require('@/assets/styles/St_ChoferesVehiculosView/Perfil.jpg'),
    };
  }
};
</script>

<style scoped>
.portrait {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 20px;
  background-size: cover;
  background-position: center;
}

.driver-license {
  margin-top: 20px;
}

.img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.FotoPerfil {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
