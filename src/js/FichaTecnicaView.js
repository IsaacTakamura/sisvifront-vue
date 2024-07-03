export default {
    data() {
        return {
            // Inicialización del objeto form con los campos vacíos o valores por defecto
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
                imagePreview: null,
            },
            imagePreview: null, // Para la vista previa de la imagen
        };
    },
    methods: {
        // Método para limpiar el formulario y la vista previa de la imagen
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
                imagePreview: null,
            };
            this.imagePreview = null;
        },
        // Método para manejar el cambio de archivo de imagen
        onFileChange(e) {
            const file = e.target.files[0];
            this.form.img = file;
            this.imagePreview = URL.createObjectURL(file);
        },
        // Método para activar el input de archivo
        selectImage() {
            document.getElementById('imagen').click();
        },
        // Método para enviar el formulario
        submitForm() {
            const formData = {
                placa: this.form.placa,
                numMotor: this.form.nMotor, // Asegúrate de que las claves coincidan con las esperadas por tu backend
                numSerie: this.form.nSerie,
                marca: this.form.marca,
                modelo: this.form.modelo,
                anioFabricacion: parseInt(this.form.anioFabricacion, 10),
                color: this.form.color,
                kilometraje: parseInt(this.form.kilometraje, 10),
                tipoCombustible: this.form.tipoCombustible,
                transmision: this.form.transmision,
                img: this.form.img // Asegúrate de manejar correctamente la carga de archivos en tu backend
            };
            // Envía los datos al backend
            fetch('http://localhost:8069/api/vehiculos/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    // Aquí puedes manejar la respuesta, como mostrar un mensaje de éxito
                })
                .catch((error) => {
                    console.error('Error:', error);
                    // Manejar el error, por ejemplo, mostrando un mensaje de error
                });
        }
    }
}
