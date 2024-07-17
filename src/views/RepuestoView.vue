<template>
  <div class="main-container">
    <div class="header">
      <button @click="openRegistrarModal" class="btn btn-primary"><i class="fa fa-plus"></i></button>
      <button @click="openAumentarStockModal" class="btn btn-primary"><i class="fa fa-arrow-up"></i></button>
      <button @click="openRegistrarSalidaModal" class="btn btn-primary"><i class="fa fa-arrow-down"></i></button>
    </div>
    <input type="text" v-model="searchQuery" placeholder="Buscar repuesto" class="form-control my-3 search-bar" />
    <repuesto-table :repuestos="filteredRepuestos" :paginatedRepuestos="paginatedRepuestos"
      :currentPage="currentPage" :totalPages="totalPages" @prev-page="prevPage" @next-page="nextPage" @edit="openEditModal" @refresh="fetchRepuestos" />
    <registrar-repuesto-modal :isVisible="isRegistrarModalVisible" @close="closeRegistrarModal" @refresh="fetchRepuestos" />
    <aumentar-stock-modal :isVisible="isAumentarStockModalVisible" @close="closeAumentarStockModal" :repuestos="repuestos" @refresh="fetchRepuestos" />
    <registrar-salida-modal :isVisible="isRegistrarSalidaModalVisible" @close="closeRegistrarSalidaModal" :repuestos="repuestos" @refresh="fetchRepuestos" />
    <editar-repuesto-modal :isVisible="isEditModalVisible" :repuestoId="selectedRepuestoId" @close="closeEditModal" @refresh="fetchRepuestos" />
  </div>
</template>

<script src="../js/RepuestoView/RepuestoViewSc.js"></script>
<style scoped src="../assets/styles/St_RepuestoView/RepuestoViewSt.css"></style>
