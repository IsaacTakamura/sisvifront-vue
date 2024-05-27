<template>
  <div class="container">
    <h1 class="titulo">Gestión de Repuestos</h1>

    <div class="box consultas-stock">
        <h3>Consulta de Stock</h3>
        <div class="input-row">
          <div class="input-group">
            <label for="codigo-interno">Filtro por Codigo Interno</label>
            <input id="codigo-interno" type="text">
          </div>
          <div class="input-group">
            <label for="descripcion">Filtro por Descripcion</label>
            <input id="descripcion" type="text">
          </div>
        </div>
        <table>
      <thead>
        <tr>
          <th>Registro</th>
          <th>Código Interno</th>
          <th>Descripción del Repuesto</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        <!-- Tus filas de datos van aquí -->
      </tbody>
    </table>
        
    </div>
    <div class="box gestionar">
        <h3>Gestionar</h3>
        <div class="button-group">
      <button class="btn">Administrar Repuestos</button>
      <button class="btn">Registrar Ingreso</button>
      <button class="btn">Registrar Salida</button>
    </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box {
  width: 100%;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 20px;
}

.titulo {
  color: blue;
}

.input-row {
  display: flex;
  justify-content: space-between;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.input-group input {
  width: 40%;
}

table {
  margin-left: auto;
  margin-right: auto;
}

.button-group {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  .btn {
    background-color: #3a5f8f;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }

  

  
</style>