<template>
    <!-- Modal de confirmación de registro, se muestra solo si isVisible es verdadero -->
    <div v-if="isVisible" class="modal-overlay" @click.self="close">
        <!-- Contenido del modal -->
        <div class="modal-content">
            <!-- Título del modal -->
            <h3>Confirmar Registro</h3>
            <!-- Mensaje de confirmación -->
            <p>¿Está seguro de que desea registrar este chofer?</p>
            <!-- Botones de acción del modal -->
            <div class="modal-buttons">
                <!-- Botón para confirmar la acción -->
                <button class="modal-button confirm-button" @click="confirm">Aceptar</button>
                <!-- Botón para cancelar y cerrar el modal -->
                <button class="modal-button cancel-button" @click="close">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script src="../../../js/RegistrarView/ConfirmacionRegistroModalSc.js"></script>

<style scoped src="../../../assets/styles/St_RegistrarView/ConfirmationModalSt.css"></style>
