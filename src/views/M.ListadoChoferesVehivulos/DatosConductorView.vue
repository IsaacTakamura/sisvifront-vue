<template>
    
    <div class="driver-license">
      <div class="header">
        <h1>Datos del Conductor</h1>
      </div>

      <div class="Datos_Conductor">

        <div class="container text-center">
            <div class="row">
                <div class="col">
                    <div class="portrait">
                        <img :src="perfilImg" alt="FotoPerfil">
                    </div>
                </div>
    <div class="col">
      Column
    </div>
    <div class="col">
      Column
    </div>
  </div>
</div>
  
      
        <div class="license-number">
          <span>License Number:</span>
          <span>{{ licenseNumber }}</span>
        </div>

        
  
        <div class="driver-name">
          <span>Driver Name:</span>
          <span>{{ firstName }} {{ middleName }} {{ lastName }}</span>
        </div>
  
        <div class="address">
          <span>Address:</span>
          <span>{{ address }}</span>
        </div>
  
        <div class="dob">
          <span>Date of Birth:</span>
          <span>{{ dob }}</span>
        </div>
  
        <div class="gender">
          <span>Gender:</span>
          <span>{{ gender }}</span>
        </div>
  
        <div class="issue-date">
          <span>Issue Date:</span>
          <span>{{ issueDate }}</span>
        </div>
  
        <div class="expiration-date">
          <span>Expiration Date:</span>
          <span>{{ expirationDate }}</span>
        </div>
  
        <div class="license-class">
          <span>License Class:</span>
          <span>{{ licenseClass }}</span>
        </div>
  
        <div class="restrictions">
          <span>Restrictions:</span>
          <span>{{ restrictions }}</span>
        </div>
      </div>
  
      
    </div>
  </template>
  
  <script>
  import perfilImg from '@/assets/styles/St_ChoferesVehiculosView/Perfil.jpg';

  export default {
    data() {
      return {
        licenseNumber: "14850",
        firstName: "John",
        middleName: "Doe",
        lastName: "Smith",
        address: "123 Main Street, Anytown, CA 12345",
        dob: "1980-01-01",
        gender: "M",
        issueDate: "2018-01-22",
        expirationDate: "2023-01-22",
        licenseClass: "A",
        restrictions: "None",
        portrait: "https://example.com/driver-portrait.jpg",
      };
    },
  };
  </script>
  
  <style scoped>
  .driver-license {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  .header {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .license-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }
  
  .license-info > div {
    flex: 0 0 200px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 10px;
  }
  
  .license-info span:first-child {
    font-weight: bold;
  }
  
  .portrait {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-top: 20px;
  }
  </style>
  