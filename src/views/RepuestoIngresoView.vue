<template>
    <div class="container">
      <div class="box datos-documento">
        <h3>Ingreso de Repuesto</h3>
        <div class="input-row">
        <div class="input-group">
          <label for="registro">Registro:</label>
          <input id="registro" type="text" >
        </div>
        <div class="input-group">
          <label for="fecha-ingreso">Fecha de Ingreso:</label>
          <input id="fecha-ingreso" type="date" >
        </div>
        <div class="input-group">
          <label for="documento">Documento:</label>
          <input id="documento" type="text" >
        </div>
        <div class="input-group">
          <label for="responsable">Responsable:</label>
          <input id="responsable" type="text" >
        </div>
      </div>
      </div>
      <div class="box referencias">
        <h3>Referencias</h3>
        <div class="input-group">
      <label for="tipo-moneda">Tipo de Moneda:</label>
      <select id="tipo-moneda">
        <option value="dolar">Dólar</option>
        <option value="sol">Sol</option>
      </select>
    </div>
    <div class="input-group">
      <label for="precio-dolar">Precio del Dólar:</label>
      <input id="precio-dolar" type="number" >
    </div>
    <div class="input-group">
      <label for="igv">IGV:</label>
      <input id="igv" type="number" >
    </div>
      </div>
      <div class="box seleccionar-repuestos">
        <h3>Seleccionar Repuestos</h3>
        <div class="input-group">
      <label for="filtrar-codigo-interno">Filtrar por Código Interno:</label>
      <input id="filtrar-codigo-interno" type="text" >
    </div>
    <div class="input-group">
      <label for="filtrar-descripcion">Filtrar por Descripción:</label>
      <input id="filtrar-descripcion" type="text" >
    </div>
    <table>
      <thead>
        <tr>
          <th>Registro</th>
          <th>Código Interno</th>
          <th>Descripción de Repuesto</th>
        </tr>
      </thead>
    </table>
      </div>
      <div class="box ultima-caja">
        <h3>Última Caja</h3>
        <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Regis</th>
          <th>Descripción Repuesto</th>
          <th>Cant</th>
          <th>C/Total Sin/IGV</th>
          <th>Total IGV</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 8" :key="i">
          <td>
            <button>Borrar</button>
            {{ i }}
          </td>
          <!-- Agrega las demás celdas aquí -->
        </tr>
      </tbody>
    </table>
    <button>Administrar Repuesto</button>
    <button>Guardar</button>
      </div>
    </div>
  </template>
  
  <style scoped>
  .container {
    display: grid;
    grid-template-areas:
      "datos-documento datos-documento"
      "referencias seleccionar-repuestos"
      "ultima-caja ultima-caja";
    grid-gap: 20px;
    
    
  }
  .grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 20px;
}

  .box {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .ingreso-repuesto {
    grid-area: ingreso-repuesto;
  }
  
  .referencias {
    grid-area: referencias;
  }
  
  .seleccionar-repuestos {
    grid-area: seleccionar-repuestos;
    width: 120%;
  }
  
  .ultima-caja {
    grid-area: ultima-caja;
  }

  .datos-documento, .input-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}


.referencias .input-group input,
.referencias .input-group select {
display: flex;
width: 150px; 
}

.seleccionar-repuestos .input-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px; 
}
.ultima-caja table {
  width: 100%;
  border-collapse: collapse;
}

.ultima-caja th,
.ultima-caja td {
  border: 1px solid #ddd;
  padding: 8px;
}

.ultima-caja th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #3a5f8f;
  color: white;
}

.ultima-caja button {
  margin-right: 10px;
}




.input-group {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

.input-group label {
  margin-bottom: 5px;
}


  </style>