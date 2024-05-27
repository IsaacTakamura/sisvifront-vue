<template>
  <div class="container">
    <h1 style="color: darkblue;">Ingreso de Repuesto</h1>
    <div class="box" id="datos-documento">
      Datos de Documento
      <form class="form">
        <div class="form-field">
          <label for="id">ID:</label>
          <input type="text" id="id" name="id">
        </div>
        <div class="form-field">
          <label for="fecha">Fecha de Ingreso:</label>
          <input type="date" id="fecha" name="fecha">
        </div>
        <div class="form-field">
          <label for="documento">Documento:</label>
          <input type="text" id="documento" name="documento">
        </div>
        <div class="form-field">
          <label for="responsable">Responsable:</label>
          <input type="text" id="responsable" name="responsable">
        </div>
      </form>
    </div>
    <div class="row">
      <div class="box" id="referencias">
        Referencias
        <form class="form-column">
      <div class="form-field">
        <label for="moneda">Tipo de Moneda:</label>
        <select id="moneda" name="moneda">
          <option value="dolar">Dólar</option>
          <option value="sol">Sol</option>
          <!-- Agrega más opciones si es necesario -->
        </select>
      </div>
      <div class="form-field">
        <label for="precio">Precio del Dólar:</label>
        <input type="number" id="precio" name="precio">
      </div>
      <div class="form-field">
        <label for="igv">IGV:</label>
        <input type="number" id="igv" name="igv">
      </div>
    </form>

      </div>
      <div class="box" id="selecciona-repuestos">
        Selecciona Repuestos
        <form class="form">
      <div class="form-field">
        <label for="codigo-interno">Filtrar por Código Interno:</label>
        <input type="text" id="codigo-interno" name="codigo-interno">
      </div>
      <div class="form-field">
        <label for="descripcion">Filtrar por Descripción:</label>
        <input type="text" id="descripcion" name="descripcion">
      </div>
    </form>
    <table>
      <thead>
        <tr>
          <th>Registro</th>
          <th>Código Interno</th>
          <th>Descripción de Repuesto</th>
        </tr>
      </thead>
      <tbody>
        <!-- Aquí irán los registros -->
      </tbody>
    </table>
      </div>
    </div>
    <div class="box" id="registrar-ingreso">
      Registrar Ingreso de Repuesto
      <table>
      <thead>
        <tr>
          <th>Ítem</th>
          <th>Regist</th>
          <th>Descripción</th>
          <th>Cant</th>
          <th>C/Uni sin/IGV</th>
          <th>C/Total sin/IGV</th>
          <th>Total IGV</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 8" :key="i">
          <td><input type="text" :id="'item-' + i" :name="'item-' + i" :placeholder="'Ítem ' + i"></td>
          <td><input type="text" id="" name="" placeholder=""></td>
          <td><input type="text" id="" name="" placeholder=""></td>
          <td><input type="text" id="" name="" placeholder=""></td>
          <td><input type="text" id="" name="" placeholder=""></td>
          <td><input type="text" id="" name="" placeholder=""></td>
          <td><input type="text" id="" name="" placeholder=""></td>
          <td><input type="text" id="" name="" placeholder=""></td>
        </tr>
      </tbody>
    </table>
    <div class="button-row">
      <button class="blue-button">Administrar Repuestos</button>
      <button class="blue-button">Guardar</button>
    </div>   
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
}

.box {
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
}

#datos-documento {
  flex: 1;
}

#referencias, #selecciona-repuestos {
  flex: 1;
}

#registrar-ingreso {
  flex: 1;
}

.form {
  display: flex;
  justify-content: space-between;
}

.form-field {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.form-column {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.form-field {
  margin: 10px 0;
}

input, select {
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid black;
  padding: 10px;
}
.label-row {
  display: flex;
  justify-content: space-between;
}

input {
  width: 100%;
  height: 20px; /* Hacer los campos de entrada más pequeños */
}

.button-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.blue-button {
  background-color: darkblue;
  color: white;
  padding: 10px;
  margin-left: 10px;
}

</style>