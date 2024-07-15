<template>
  <!-- Barra superior horizontal -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand" href="#">SISVI</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link" href="#">
          <i class="fa-solid fa-chart-bar"></i>
          Dashboard
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/registraractivos" class="nav-link" href="#">
            <i class="fa-solid fa-plus"></i>
            Registro
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/registro" class="nav-link active" aria-current="page" href="#">
            <i class="fa-solid fa-car"></i>
            Vehiculos
          </router-link>
        </li>

        <li>
          <router-link to="/historial" class="nav-link" href="#">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            Mantenimiento
          </router-link>
        </li>
        <li>
          <router-link to="/repuesto" class="nav-link" href="#">
            <i class="fa-solid fa-gauge"></i>
            Ingresar Repuesto
          </router-link>
        </li>
        <li>
          <router-link to="/ubicacionv" class="nav-link" href="#">
            <i class="fa-solid fa-location-dot"></i>
            Ubicacion
          </router-link>
        </li>

        <li>
          <router-link to="/gestionfaltas" class="nav-link" href="#">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            Gestion Faltas
          </router-link>
        </li>

        <li>
          <router-link to="/fallovehicular" class="nav-link" href="#">
            <i class="fas fa-car-crash"></i>
            Fallos Vehiculares
          </router-link>
        </li>

        <li>
          <router-link to="/choferesVehiculos" class="nav-link" href="#">
            <i class="fa-solid fa-id-card"></i>
            Conductores
          </router-link>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>

  <div class="coniter-fluid mt-3"></div>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jacquard+12&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

</style>