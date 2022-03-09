import express from "express";
const router = express.Router();
import { registrar, autenticar } from '../controllers/usuarioController.js';

// Autenticación, Registro y Confirmación de usuarios
router.post('/', registrar)
router.post('/login', autenticar)

export default router;