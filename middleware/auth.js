/*
con este middleware vamos proteger las rutas seleccionadas de las reuniones,
y nos aseguraremos de que un usuario esté autenticado antes de permitir que sus solicitudes/requests pasen
*/


const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body._id && req.body._id !== userId) {
      throw 'Usuario invalido';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Solicitud invalida!')
    });
  }
};

/*
- estamos poniendo todo dentro de un bloque try ... catch para asegurarnos de tener un error para analizar cuando algo sale mal
- extraemos el token del encabezado Authorization de la request/solicitud entrante
(hay que recordar que también contendrá la palabra clave Bearer, por lo que usamos la función split()
para obtener todo después del espacio en el encabezado, y cualquier error arrojado aquí va a terminar en el bloque de catch
- usamos la función verify para decodificar nuestro token si el token no es válido, esto dará error
- extraemos el ID de usuario de nuestro token
- si la solicitud/request contiene un ID de usuario, lo comparamos con el extraído del token; si no son iguales, arrojamos un error
- de lo contrario, todo está bien y nuestro usuario está autenticado; pasamos la ejecución usando la const auth = require('../middleware/auth'); función next()
*/
