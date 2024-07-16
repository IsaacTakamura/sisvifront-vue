<template>
  <!-- Barra superior horizontal -->
  <nav class="navbar navbar-expand-lg navbar-dark" style="margin-bottom: 0; height: 60px; background-color: #18181c;">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand" href="#">
      <h1 style="font-size: 24px; font-weight: bold; margin-right: 100px;">SISVI</h1>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-5 mb-lg-0">
        <li class="nav-item" style="margin-right: 15px;">
          <router-link to="/dashboard" class="nav-link" href="#">
          <i class="fa-solid fa-chart-bar"></i>
          Dashboard
          </router-link>
        </li>

        <li class="nav-item" style="margin-right: 15px;">
          <router-link to="/registraractivos" class="nav-link" href="#">
            <i class="fa-solid fa-plus"></i>
            Registro
          </router-link>
        </li>

        <li class="nav-item" style="margin-right: 15px;">
          <router-link to="/registro" class="nav-link" aria-current="page" href="#">
            <i class="fa-solid fa-car"></i>
            Vehiculos
          </router-link>
        </li>

        <li class="nav-item"  style="margin-right: 15px;">
          <router-link to="/historial" class="nav-link" href="#">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            Mantenimiento
          </router-link>
        </li>
        
        <li class="nav-item"  style="margin-right: 15px;">
          <router-link to="/ubicacionv" class="nav-link" href="#">
            <i class="fa-solid fa-location-dot"></i>
            Ubicacion
          </router-link>
        </li>

        <li class="nav-item"  style="margin-right: 15px;">
          <router-link to="/gestionfaltas" class="nav-link" href="#">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            Gestion Faltas
          </router-link>
        </li>

        <li class="nav-item"  style="margin-right: 15px;">
          <router-link to="/fallovehicular" class="nav-link" href="#">
            <i class="fas fa-car-crash"></i>
            Fallos Vehiculares
          </router-link>
        </li>

        <li class="nav-item"  style="margin-right: 15px;">
          <router-link to="/choferesVehiculos" class="nav-link" href="#">
            <i class="fa-solid fa-id-card"></i>
            Conductores
          </router-link>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jacquard+12&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

</style>