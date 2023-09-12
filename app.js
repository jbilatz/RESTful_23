
// mongodb+srv://dBuser1:<password>@cluster0.schfn.mongodb.net/?retryWrites=true&w=majority


const express = require('express');
const mongoose = require('mongoose');
const Meeting = require('./models/meeting');

const app = express();
mongoose.connect('mongodb+srv://dBuser1:dBuser1@cluster0.schfn.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Conectados a MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('FALLA al conectarse a MongoDB Atlas!');
        console.error(error);
    });

app.use(express.json())

app.post('/api/v1/meetings', (req, res, next) => {
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

app.put('/api/v1/meetings/:id', (req, res, next) => {
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


app.delete('/api/v1/meetings/:id', (req, res, next) => {
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

  
app.get('/api/v1/meetings/:id', (req, res, next) => {
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



app.get('/api/v1/meetings', (req, res, next) => {
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


module.exports = app;

