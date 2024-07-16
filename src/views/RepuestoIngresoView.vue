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
  max-width: 1200px; /* Limita el ancho máximo para una mejor lectura */
  margin: auto; /* Centra el contenedor */
  padding: 20px;
  background-color: #f9f9f9; /* Fondo más claro para el contenedor */
}

.box {
  overflow-x: auto; /* Agrega desplazamiento horizontal si es necesario */
}

.row {
  display: flex;
  flex-direction: row;
}

/* Mejoras en el diseño para un aspecto más moderno y profesional */


h1 {
  color: #0056b3; /* Color más suave para el título */
  text-align: center; /* Centra el título */
  margin-bottom: 20px; /* Espacio debajo del título */
}

.box {
  border: none; /* Elimina el borde */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Sombra suave para dar profundidad */
  padding: 20px;
  margin: 20px 0; /* Mayor espaciado entre cajas */
  background-color: white; /* Fondo blanco para las cajas */
}

.form, .form-column {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Diseño adaptable */
  gap: 20px; /* Espaciado entre campos */
}

.form-field {
  display: flex;
  flex-direction: column;
}

input[type="text"], input[type="date"], input[type="number"], select {
  padding: 10px; /* Relleno más amplio para facilidad de interacción */
  border: 1px solid #ced4da; /* Borde más sutil */
  border-radius: 4px; /* Bordes redondeados */
  font-size: 16px; /* Tamaño de fuente mayor para mejor legibilidad */
}

table {
  margin-top: 20px; /* Espaciado superior para la tabla */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Sombra suave para la tabla */
  
}

th, td {
  text-align: left; /* Alineación del texto a la izquierda */
  border-bottom: 1px solid #ddd; /* Borde inferior más suave */
}

th {
  background-color: #f2f2f2; /* Fondo para los encabezados de tabla */
  color: #333; /* Color de texto más oscuro para contraste */
}

.button-row {
  display: flex;
  justify-content: space-between; /* Distribuye los botones a ambos extremos */
  margin-top: 30px; /* Espaciado superior */
}

.blue-button {
  background-color: #007bff; /* Azul más brillante */
  border: none; /* Elimina el borde */
  border-radius: 4px; /* Bordes redondeados */
  padding: 10px 15px; /* Relleno más amplio */
  font-size: 16px; /* Tamaño de fuente mayor */
  cursor: pointer; /* Cambia el cursor a puntero */
  transition: background-color 0.3s; /* Transición suave del color de fondo */
}

.blue-button:hover {
  background-color: #0056b3; /* Oscurece el botón al pasar el mouse */
}

</style>