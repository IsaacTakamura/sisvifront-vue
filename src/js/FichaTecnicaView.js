import axios from 'axios';

export default {
  data() {
    return {
      form: {
        placa: '',
        nMotor: '',
        nSerie: '',
        marca: '',
        modelo: '',
        anioFabricacion: '',
        color: '',
        kilometraje: '',
        tipoCombustible: '',
        transmision: '',
        img: null,
        descripcion: '',
      },
      imagePreview: null,
    };
  },
  methods: {
    clearForm() {
      this.form = {
        placa: '',
        nMotor: '',
        nSerie: '',
        marca: '',
        modelo: '',
        anioFabricacion: '',
        color: '',
        kilometraje: '',
        tipoCombustible: '',
        transmision: '',
        img: null,
        descripcion: '',
      };
      this.imagePreview = null;
    },
    async onFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:8069/api/vehiculos/subir-imagen', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.form.img = response.data.fileName;
        this.imagePreview = URL.createObjectURL(file);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    },
    selectImage() {
      document.getElementById('imagen').click();
    },
    async submitForm() {
      const formData = {
        placa: this.form.placa,
        numMotor: this.form.nMotor,
        numSerie: this.form.nSerie,
        marca: this.form.marca,
        modelo: this.form.modelo,
        anioFabricacion: parseInt(this.form.anioFabricacion, 10),
        color: this.form.color,
        kilometraje: parseInt(this.form.kilometraje, 10),
        tipoCombustible: this.form.tipoCombustible,
        transmision: this.form.transmision,
        img: this.form.img,
        descripcion: this.form.descripcion,
      };

      try {
        const response = await axios.post('http://localhost:8069/api/vehiculos/registrar', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Success:', response.data);
        // Maneja la respuesta, como mostrar un mensaje de éxito
        this.clearForm();
      } catch (error) {
        console.error('Error:', error);
        // Manejar el error, por ejemplo, mostrando un mensaje de error
      }
    },
  },
};
