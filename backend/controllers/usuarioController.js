// Importar el modelo o schema para aceptar solo esos datos en NoSQL
import Usuario from "../models/Usuario.js";
import generarId from '../helpers/generarid.js';
import bcrypt from 'bcrypt';

const registrar = async(req, res) => {
    //  Evitar registros duplicados
    const { email } = req.body;

    const existeUsuario = await Usuario.findOne({ email: email});
    
    if(existeUsuario){
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({ msg: error.message })
    }

    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save();

        res.json(usuarioAlmacenado);

    } catch (error) {
        console.log(error);
    }    
};

const autenticar = async(req, res) => {

    const { email, password } = req.body;

    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message})
    }
    // Comprobar si esta confirmado
    if (!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({msg: error.message})
    }
    // Comprobar el password
    if(await usuario.comprobarPassword(password)){
        console.log("Es correcto!");
    }else {
        console.log("Es incorrecto");
    }
};

export { registrar, autenticar };