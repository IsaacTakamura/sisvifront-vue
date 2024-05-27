<template>
  <div class="container">
    <div class="right-section">
      <div class="box seleccionar-ingreso">
        <h3>Seleccionar Ingreso</h3>
        <h2>1.Filtrar por Placa:</h2>
        <input type="text" id="placa" >
        <h2>2.Seleccionar Registro de Ingreso:</h2>
        <table>
          <tr >
            <td></td>
          </tr>
        </table>
      </div>
      <div class="box mantenimiento-realizado">
        <h3>Mantenimiento Realizado</h3>
        <div class="input-group" >
          <label > N° Ingreso:</label>
          <input type="text" >
          <label > N° Orden T:</label>
          <input type="text" >
          <label > Fecha Salida:</label>
          <input type="text" >
          <label > Nivel Daño:</label>
          <input type="text" >
          <label > Nivel Concepto:</label>
          <input type="text" >
          <label > Nivel Deteccion:</label>
          <input type="text" >
          <label > Kilometraje Prox Mant.:</label>
          <input type="text" >
          <label > Fecha Prox. Mant:</label>
          <input type="text" >
          <label > Descripcion:</label>
          <input type="text" >
          <label > Obs Mant:</label>
          <input type="text" >
        </div>
        <button>Ver Documento</button>
        <input type="text">
      </div>
    </div>
    <div class="left-section ficha-tecnica">
      <div class="box">
        <h3>Ficha Técnica</h3>
        <img alt="Imagen del vehículo">
        <div class="input-group">
            <label > Ruta:</label>
          <input type="text" >
        </div>
        <div class="input-group" >
          <label > Placa:</label>
          <input type="text" >
          <label > Cliente:</label>
          <input type="text" >
          <label > Documento:</label>
          <input type="text" >
          <label > N° Motor:</label>
          <input type="text" >
          <label > N° Serie:</label>
          <input type="text" >
          <label > Marca:</label>
          <input type="text" >
          <label > Año de Fabricacion:</label>
          <input type="text" >
          <label > Color:</label>
          <input type="text" >
          <label > Kilometraje:</label>
          <input type="text" >
          <label > Tipo de Combustible:</label>
          <input type="text" >
          <label > Transmision:</label>
          <input type="text" >
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.right-section {
  width: 50%;
}

.left-section {
  width: 50%;
}

.box {
  border: 1px solid #000;
  margin: 10px;
  padding: 10px;
}

.input-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.input-group label {
  width: 30%;
}

.input-group input {
  width: 65%;
}
</style>