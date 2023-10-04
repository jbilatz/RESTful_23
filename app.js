/*
datos que tomamos del proceso de confirguracion de la base de datos online MongoDB Altas
*/
// mongodb+srv://dBuser1:<password>@cluster0.schfn.mongodb.net/?retryWrites=true&w=majority


const express = require('express'); // carga el módulo Express
const mongoose = require('mongoose'); // carga el módulo Mongoose
const Meeting = require('./models/meeting'); // carga el esquema de Mongoose que generamos en la carpeta "models"

const app = express(); // instancia nuetra app
/*
usa el método .conect() de Mongoose
para conectarse a nuestra base de datos online MongoDB Altas,
pasándole como parámetro el string que nos dió la misma cuando la configuramos,
al elegir el método de conexión. Ese método .conect() devuelve una Promesa/Promise
que resolvemos con la función .then() (... y .catch() para los posibles errores)
*/
mongoose.connect('mongodb+srv://dBuser1:dBuser1@cluster0.schfn.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Conectados a MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('FALLA al conectarse a MongoDB Atlas!');
        console.error(error);
    });

app.use(express.json()) // para parsear como JSON el cuerpo de nuestra solicitud, y la respuesta

const calenRoutes = require('./rutas/calendario');
const usuariosRoutes = require('./rutas/usuario');


app.use('/api/v1/meetings', calenRoutes);
app.use('/api/v1/auth', usuariosRoutes);



module.exports = app; // exportamos nuestra app para poder tomarla en el server

