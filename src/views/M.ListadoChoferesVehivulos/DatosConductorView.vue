<template>
    
    <div class="driver-license">
      <div class="header">
        <h1>Datos del Conductor</h1>
      </div>

      <div class="Datos_Conductor">

        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="portrait">
                        
                    </div>
                </div>
    <div class="col-md-4 container text-left">
      <div class="conductor-identificate">
        <span>DNI:</span>
        <span>{{ dni }}</span>
      </div>

      <div class="container text-left driver-first-name">
        <span>Nombre:</span>
        <span>{{ nombre }}</span>
      </div>

      <div class="driver-last-name">
        <span>Apellido:</span>
        <span>{{ apellido }}</span>
      </div>
      
      <div class="driver-licencia">
        <span>Licencia:</span>
        <span>{{ Licencia }}</span>
      </div>

      <div class="driver-category">
        <span>Categoria:</span>
        <span>{{ Categoria }}</span>
      </div>
      
    </div>
    <div class="col-md-4 ">
      <div class="driver-telefono">
        <span>Telefono:</span>
        <span>{{ Telefono }}</span>
      </div>

      <div class="second-name">
        <span>Segundo Nombre:</span>
        <span>{{ SegundoNombre }}</span>
      </div>

      <div class="second-last-name">
        <span>Segundo Apellido:</span>
        <span>{{ SegundoApellido }}</span>
      </div>

      <div class="driver-fecha-vencimiento">
        <span>Fecha de Vencimiento:</span>
        <span>{{ FechaVencimiento }}</span>
      </div>
    </div>
  </div>
</div>
  
      </div>
  
      
    </div>
  </template>
  
  <script>
  import perfilImg from '@/assets/styles/St_ChoferesVehiculosView/Perfil.jpg';
  import axios from 'axios';

  export default {
    data() {
      return {
        dni: '',
        nombre: '',
        apellido: '',
        Licencia: '',
        Categoria: '',
        Telefono: '',
        SegundoNombre: '',
        SegundoApellido: '',
        FechaVencimiento: '',
        perfilImg: perfilImg,
      };
    },
    mounted() {
      axios.get('http://localhost:8069/api/choferes/listar/1')
        .then((response) => {
          this.dni = response.data.dni;
          this.nombre = response.data.primerNombre;
          this.apellido = response.data.apellidoPaterno;
          this.Licencia = response.data.licencia;
          this.Categoria = response.data.categoria;
          this.Telefono = response.data.telefono;
          this.SegundoNombre = response.data.segundoNombre;
          this.SegundoApellido = response.data.apellidoMaterno;
          this.FechaVencimiento = response.data.fechaVencimiento;
        });
    },

    methods: {
      async fetchChoferes() {
        const url = 'http://localhost:8069/api/choferes/listar';  // Reemplaza esto con la URL de tu API
        const response = await axios.get(url);
        this.choferes = response.data;
      },
    },

    //darle click a uno para luego mostrar sus datos en la parte derecha o pagina llamada DatosConductorView.vue
    seleccionarChofer(chofer) {
      this.$emit('mostrar-datos', chofer);
    },


  };
  </script>
  <style scoped>
  
  .portrait {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 20px;
  background-image: url('../../assets/styles/St_ChoferesVehiculosView/Perfil.jpg');
  background-size: cover; /* Asegura que la imagen cubra completamente el área sin perder sus proporciones */
  background-position: center; /* Centra la imagen en el elemento */
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

</style>
  
  
  