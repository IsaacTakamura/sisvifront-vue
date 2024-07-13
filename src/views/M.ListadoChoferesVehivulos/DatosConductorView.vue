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
                    <div class="portrait"></div>
                    <!--combobox para seleccionar un numero de id para cargar los datos-->
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Seleccionar ID</option>
                        <!--Aqui se cargara las opciones dinamicamentes-->
                    </select>
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

      //cargar los datos del chofer seleccionado
      //con el id del combobox seleccionado
      document.querySelector('select').addEventListener('change', (event) => {
        const id = event.target.value;
        axios.get(`http://localhost:8069/api/choferes/listar/${id}`)
          .then((response) => {
            const chofer = response.data;
            this.dni = chofer.dni;
            this.nombre = chofer.primerNombre;
            this.primerNombre = chofer.primerNombre;
            this.apellido = chofer.apellidoPaterno;
            this.SegundoApellido = chofer.apellidoMaterno;
            this.Licencia = chofer.licenciaConducir;
            this.Categoria = chofer.categoriaLicencia;
            this.Telefono = chofer.telefono;
            this.SegundoNombre = chofer.segundoNombre;
            this.FechaVencimiento = new Date(chofer.fechaVencimientoLicencia).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'

          });

      });
    });
    },

    methods: {
      async fetchChoferes() {
        const url = 'http://localhost:8069/api/choferes/listar';  // Reemplaza esto con la URL de tu API
        const response = await axios.get(url);
        this.choferes = response.data;
      },
      //cargar combobox con los id de los choferes
    cargarChoferes() {
      axios.get('http://localhost:8069/api/choferes/listar')
        .then((response) => {
          response.data.forEach((chofer) => {
            const option = document.createElement('option');
            option.value = chofer.id;
            option.text = chofer.id;
            document.querySelector('select').appendChild(option);
          });
        });
    },
    },

    //cargar los datos del chofer seleccionado
    created() {
      this.fetchChoferes();
      this.cargarChoferes();
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
.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
  
  
  