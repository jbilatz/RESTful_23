
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');



exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
          const user = new Usuario({
            email: req.body.email,
            password: hash
          });
          user.save().then(
            () => {
              res.status(201).json({
                message: 'Usuario registrado con exito!'
              });
            }
          ).catch(
            (error) => {
              res.status(500).json({
                error: error
              });
            }
          );
        }
      );  
};

exports.login = (req, res, next) => {
    Usuario.findOne({ email: req.body.email }).then(
        (usuario) => {
          if (!usuario) {
            return res.status(401).json({
              error: new Error('Usuario no encontrado!')
            });
          }

          bcrypt.compare(req.body.password, usuario.password).then(
            (valid) => {
              if (!valid) {
                return res.status(401).json({
                  error: new Error('Password incorrecto!')
                });
              }
  
            }
          ).catch(
            (error) => {
              res.status(500).json({
              error: error
              });
            }
          );

          res.status(200).json({
            tknUserId: usuario._id,
            token: 'token'
          });

      }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );  
};


exports.listadoUsuarios = (req, res, next) => {
    Usuario.find().then(
        (usuarios) => {
            res.status(200).json(usuarios);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};
