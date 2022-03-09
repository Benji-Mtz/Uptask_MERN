import mongoose from "mongoose";
// Middleware|hooks de hash en mongoose
import bcrypt from 'bcrypt';

// Schema o estructura de la DB
const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
// timestamps agrega la columna de creado y editado

// Antes de guardar al usuario aplicamos una operación de hasheo
usuarioSchema.pre('save', async function (next) {

    if(!this.isModified("password")){
        // Si no editamos el pass pasate al siguiente middleware sin romper la app
        next();
    }
    
    const salt = await bcrypt.genSalt(10);
    // obteniendo el objeto usuario con this
    this.password = await bcrypt.hash(this.password, salt);
})

// Funciones personalizadas
usuarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
    // compare(string, pass_hasheado);
    return await bcrypt.compare(passwordFormulario, this.password);
}

// creacion y exportacion del schema
const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;