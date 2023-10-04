
const express = require('express');
const router = express.Router();

const Meeting = require('../models/meeting'); // carga el esquema de Mongoose que generamos en la carpeta "models"
const reunionCtrl = require('../controladores/reunion');

const auth = require('../middleware/auth');


/*
middleware para pedir los datos de una determinada reunión
*/
router.get('/:id', auth, reunionCtrl.datosUnaReunion );

/*
middleware para modificar los datos de una determinada reunión
*/
router.put('/:id', auth, reunionCtrl.modificarReunion );

/*
middleware para borrar el registro de una determinada reunión
*/
router.delete('/:id', auth, reunionCtrl.borrarReunion );

/*
middleware para registrar una reunión nueva
*/
router.post('/', auth, reunionCtrl.crearReunion );

/*
middleware para pedir el listado de todas las reuniones
*/
router.get('/', reunionCtrl.listadoReuniones );

module.exports = router;
