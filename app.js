

const express = require('express');
const app = express();

app.use(express.json())

app.post('/api/v1/meetings', (req, res) => {
    const datosReunion = req.body; // los datos de la reunión que recibimos
    console.log(datosReunion); 
    res.status(201).json({
        message: 'Reunion creada!',
        datosReunion
    });
});


app.get('/api/v1/meetings', (req, res, next) => {
    const meetings = [
        {
            titulo: 'Reunión 01',
            descripción: 'Presentacion',
            hora: '01-09-2021 18:00',
            usuarioId: 'rgse78ctq8gt387g',
        },
        {
            titulo: 'Reunión 02',
            descripción: 'Clase 04',
            hora: '08-09-2021 18:00',
            usuarioId: 'rgse78ctq8gt387g',

        },
    ];
    res.status(200).json(meetings);
    next();
});


module.exports = app;

