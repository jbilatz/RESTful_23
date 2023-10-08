
const Usuario = require('../models/usuario');

/*
paquete de cifrado bcrypt para nuestro signup/Registro,
para no guardar en nuestra base de datos el password como texto plano
El paquete de encriptación que usaremos, bcrypt , utiliza un algoritmo de una sola vía para encriptar
y crear un hash de las contraseñas de nuestros usuarios, que luego almacenaremos
en el documento de la base de datos de ese usuario.  Cuando un usuario intente iniciar sesión,
utilizaremos bcrypt para crear un nuevo hash con la contraseña introducida,
y luego lo compararemos con el hash almacenado en la base de datos.
Estos dos hashes NO serán iguales - eso sería inseguro, ya que un hacker podría simplemente
adivinar las contraseñas hasta que los hashes coincidieran,
pero bcrypt puede decir si ambos hashes fueron generados usando la misma contraseña inicial.
Esto nos permitirá implementar correctamente el almacenamiento y la verificación de contraseñas de forma segura.
*/
const bcrypt = require('bcrypt');

// Para poder crear y verificar tokens de autenticación, necesitaremos un nuevo paquete:
const jwt = require('jsonwebtoken');


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

/*
No necesitamos una función LogOut,
porque como dijimos no vamos a mantener sesiones en el servidor,
sino que vamos a usar autenticación basada en token
*/

exports.login = (req, res, next) => {
/*
usamos nuestro modelo Mongoose para verificar si el email ingresado por el usuario
corresponde a un usuario existente en la base de datos
si no es así, devolvemos un error 401 no autorizado si lo hace, seguimos adelante: return
*/
    Usuario.findOne({ email: req.body.email }).then(
        (usuario) => {
          if (!usuario) {
            return res.status(401).json({
              error: new Error('Usuario no encontrado!')
            });
          }
/*
usamos la función de comparación de bcrypt para comparar
la contraseña ingresada por el usuario con el hash guardado en la base de datos
si no coinciden, devolvemos un error 401 no autorizado
si coinciden, es que nuestro usuario tiene credenciales válidas
*/
          bcrypt.compare(req.body.password, usuario.password).then(
            (valid) => {
              if (!valid) {
                return res.status(401).json({
                  error: new Error('Password incorrecto!')
                });
              }
/*
usamos la función ign() de jsonwebtoken para codificar un nuevo token,
que usamos en nuestra respuesta/response, en vez del string ‘token’ que usamos inicialmente

sign() toma como parámetros:
- el ID del usuario 
- una cadena secreta para codificar nuestro token (en desarrollo, temporaria, para ser reemplazada por una cadena aleatoria mucho más larga para producción)
- el tiempo de validez del token , q establecemos de 24 horas
-  en el bloque siguiente enviamos dicho token de vuelta al front-end con nuestra respuesta
*/
              const token = jwt.sign(
                { tknUserId: usuario._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' });
/*
si pasa de todo esto, nuestro usuario tiene credenciales válidas,
devolvemos una respuesta 200 que contiene el ID de usuario y un token,
que inicialmente fue un sgting genérico: "token"
*/
              res.status(200).json({
                tknUserId: usuario._id,
                token: token
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
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );  
};

/*
en los DevTools de cualquier navegador podemos comprobar que, al iniciar la sesión / hacer login,
la solicitud procedente de la interfaz contiene un encabezado/header "Authorization",
con la palabra clave/keyword "Bearer" y un String largo, codificado: este es nuestro token.
*/


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
