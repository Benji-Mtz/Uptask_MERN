import express from "express";
const router = express.Router();
import { usuarios } from '../controllers/usuarioController.js';

router.get('/', usuarios);

// router hace extensiva la url del endpoint a consultar por ejemplo: /api/usuarios/confirmar
router.get('/confirmar', (req, res) => {
    res.json({msg: "Desde CONFIRMAR API/USUARIOS"})
})

router.post('/', (req, res) => {
    res.send("Desde POST API/USUARIOS")
})

export default router;