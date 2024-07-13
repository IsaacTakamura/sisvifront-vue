<template>
  <div class="centered-container">
    <!-- Botón para mostrar el formulario de registro de choferes -->
    <button @click="toggleRegistrationForm" class="btn btn-primary">Registrar Chofer</button>
    
    <!-- Formulario de registro de choferes -->
    <div v-if="showRegistrationForm" class="registration-form">
      <!-- Componente de formulario de chofer -->
      <driver-form 
        @submit="confirmRegisterDriver" 
        :driver="driver" 
        :errors="errors" 
        :dateError="dateError" 
        :dateErrorMessage="dateErrorMessage" 
        @cancel="toggleRegistrationForm">
      </driver-form>
    </div>

    <!-- Campo de búsqueda -->
    <input type="text" v-model="search" placeholder="Buscar..." class="form-control my-3">
    
    <!-- Botones de filtro -->
    <filter-buttons @filter="setFilter"></filter-buttons>
    
    <!-- Tabla de choferes -->
    <driver-table 
      :drivers="filteredDrivers" 
      @edit="editDriver" 
      @c_est="changeDriverState">
    </driver-table>

    <!-- Modal de confirmación para cambiar el estado de un chofer -->
    <confirmation-modal 
      :isVisible="showModal" 
      message="¿Estás seguro de que deseas cambiar el estado de este chofer?" 
      @confirm="confirmChangeState" 
      @cancel="closeModal">
    </confirmation-modal>

    <!-- Modal para editar la información de un chofer -->
    <editar-chofer-modal 
      :isVisible="showEditModal" 
      :driver="selectedDriver" 
      @close="closeEditModal" 
      @save="updateDriver">
    </editar-chofer-modal>
    
    <!-- Modal de confirmación para el registro de un chofer -->
    <confirmacion-registro-modal 
      :isVisible="showConfirmRegisterModal" 
      @close="closeConfirmRegisterModal" 
      @confirm="registerDriver">
    </confirmacion-registro-modal>

    <!-- Nuevo modal para mostrar mensaje de infracciones excedidas -->
    <exceed-infractions-modal 
      :isVisible="showExceedInfractionsModal" 
      @close="closeExceedInfractionsModal">
    </exceed-infractions-modal>
  </div>
</template>

<script src="../js/RegistrarView/RegistroViewSc.js"></script>

<style scoped src="../assets/styles/St_RegistrarView/RegistroViewSt.css"></style>
