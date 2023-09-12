

const http = require('http'); // carga el módulo http de Node.js
const app = require('./app'); // carga la app que generamos

app.set('port', 3000);
/*
creamos el servidor, pasándole como parámetro la app que creamos con express,
en vez de la función con la que lo probamos inicialmente en la clase 3*/
const server = http.createServer(app);


server.listen(3000);



