

const express = require('express');
const router = express.Router();
const Meeting = require('../models/meeting'); // carga el esquema de Mongoose que generamos en la carpeta "models"

/*
middleware para postear una reunión nueva
*/
router.post('/', (req, res) => {
    const meeting = new Meeting({
        title: req.body.title,
        description: req.body.description,
        time: req.body.time,
        userId: req.body.userId
    });
    meeting.save().then(
        () => {
            res.status(201).json({
                message: 'Reunion guardada!',
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

/*
middleware para pedir los datos de una determinada reunión
*/
router.get('/:id', (req, res) => {
    Meeting.findOne({
        _id: req.params.id
    }).then(
        (meeting) => {
            res.status(200).json(meeting);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
});


/*
middleware para modificar los datos de una determinada reunión
*/
router.put('/:id', (req, res, next) => {
    const meeting = new Meeting({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        time: req.body.time,
        userId: req.body.userId
    });
    Meeting.updateOne({ _id: req.params.id }, meeting).then(
        () => {
            res.status(201).json({
                message: 'Reunión Actualizada!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});


/*
middleware para borrar una determinada reunión
*/
router.delete(':id', (req, res) => {
    Meeting.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Borrada!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


/*
middleware para pedir los listado de reuniones
*/
  router.get('/', (req, res, next) => {
    Meeting.find().then(
        (meetings) => {
            res.status(200).json(meetings);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

module.exports = router;



