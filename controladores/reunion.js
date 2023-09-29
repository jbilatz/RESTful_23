
const Meeting = require('../models/meeting');

exports.crearReunion = (req, res, next) => {
    const meeting = new Meeting({
        title: req.body.title,
        description: req.body.description,
        time: req.body.time,
        userId: req.body.userId
    });
    meeting.save().then(
        () => {
            res.status(201).json({
                message: 'Reunion creada!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.datosUnaReunion = (req, res, next) => {
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
  };

exports.listadoReuniones = (req, res, next) => {
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
  };

exports.modificarReunion = (req, res, next) => {
    const meeting = new Meeting({
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      time: req.body.time,
      userId: req.body.userId
  });
    Meeting.updateOne({_id: req.params.id}, meeting).then(
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
  };

exports.borrarReunion = (req, res, next) => {
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
  };





