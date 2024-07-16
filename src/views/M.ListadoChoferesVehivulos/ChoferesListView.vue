<template>
  <div>
    <input
      type="text"
      :value="localSearch"
      @input="handleInput"
      placeholder="Nombre del Chofer"
      class="form-control"
    />
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="chofer in filteredChoferes"
        :key="chofer.id"
        @click="seleccionarChofer(chofer)"
      >
        {{ chofer.primerNombre }} {{ chofer.apellidoPaterno }}
      </li>
    </ul>
  </div>
</template>

<script src="@/js/ChoferesVehiculosView/ChoferesListViewSc.js"></script>
<style src="@/assets/styles/St_ChoferesListView/ChoferesListViewST.css"></style>
