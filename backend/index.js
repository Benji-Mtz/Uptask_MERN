import express from 'express';
// import hola from './prueba.js';

import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
dotenv.config();

conectarDB();

// Routing
app.use('/api/usuarios', usuarioRoutes)

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});