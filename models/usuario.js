


const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');


const usuarioSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },

    password: { type: String, required: true }


});

usuarioSchema.plugin(uniqueValidator);

/*
El valor unique en el esquema, junto con mongoose-unique-validator pasado como plug-in,
nos va a garantizar que no haya dos usuarios que puedan compartir nombre, o sea, su email
*/

module.exports = mongoose.model('Usuario', usuarioSchema);



