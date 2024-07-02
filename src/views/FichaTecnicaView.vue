<template>
    <div class="container px-4">
        <div class="row">
            <div class="col">
                <form @submit.prevent="submitForm" class="compact-form">
                    <div class="form-group">
                        <label for="placa">PLACA</label>
                        <input type="text" id="placa" v-model="form.placa" class="form-control">
                    </div>
                    <!-- Repite el patrón anterior para los demás campos -->

                    <div class="form-group">
                        <label for="nMotor">N_MTOR</label>
                        <input type="text" id="nMotor" v-model="form.nMotor" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="nSerie">N_SERIE</label>
                        <input type="text" id="nSerie" v-model="form.nSerie" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="marca">MARCA</label>
                        <input type="text" id="marca" v-model="form.marca" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="modelo">MODELO</label>
                        <input type="text" id="modelo" v-model="form.modelo" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="anioFabricacion">AÑO FABRICADO</label>
                        <input type="text" id="Fabricado" v-model="form.anioFabricacion" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="color">COLOR</label>
                        <input type="text" id="color" v-model="form.color" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="kilometraje">KILOMETRAJE</label>
                        <input type="text" id="kilometraje" v-model="form.kilometraje" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="tipoCombustible">COMBUSTIBLE</label>
                        <select id="combustible" v-model="form.tipoCombustible" class="form-control">
                            <option value="Gasolina">Gasolina</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Eléctrico">Eléctrico</option>
                            <option value="Híbrido">Híbrido</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="transmision">TRANSMISION</label>
                        <select id="combustible" v-model="form.transmision" class="form-control">
                            <option value="Automatica">Automatica</option>
                            <option value="Manual">Manual</option>
                        </select>
                    </div>
                    <!-- ... -->
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </form>
            </div>
            <div class="col">
                <div class="form-group">

                    <div class="col">
                        <div class="form-group">
                            <label for="img">
                                <H4>IMAGEN</H4>
                            </label><br><br>
                            <input type="file" id="imagen" @change="onFileChange" class="img-fluid" hidden>
                            <div v-if="form.img" class="image-preview">
                                <img :src="imagePreview" class="img-fluid">
                            </div>
                            <div v-else class="image-placeholder"></div>
                            <div class="form-group">
                                <label for="descripcion">Descripción de la imagen</label>
                                <textarea id="descripcion" v-model="form.descripcion"
                                    class="form-control"></textarea><br>
                            </div>
                            <button @click="selectImage" class="btn btn-primary">Seleccionar imagen</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
</script>

<style scoped>
.compact-form .form-group {
    margin-bottom: 0.5rem;
    /* Reduce el margen inferior */
}

.compact-form label {
    font-size: 0.8rem;
    /* Reduce el tamaño de la fuente */
}

.compact-form .form-control {
    padding: 0.25rem 0.5rem;
    /* Reduce el relleno */
    font-size: 0.8rem;
    /* Reduce el tamaño de la fuente */
}

.image-placeholder {
    width: 100%;
    height: 200px;
    background-color: grey;
}

.image-preview img {
    max-width: 100%;
    height: auto;
}
</style>