import express from 'express';
// import hola from './prueba.js';

const app = express();

app.listen(4000, () => {
    console.log(`Running on http://localhost:4000`);
});