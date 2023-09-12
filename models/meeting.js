

const mongoose = require('mongoose'); // carga el módulo Mangoose

/*
el equema que vamos a usar para darle formato a nustros datos en mongodb
*/
const meetingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    time: { type: String, required: true },
    userId: { type: String, required: true },
});

module.exports = mongoose.model('Meeting', meetingSchema); // exportamos nuestro esquema para poder tomarlo en la app

