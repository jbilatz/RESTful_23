

const http = require('http');

const server = http.createServer((req, res) => {
    const respuesta = {
        message: 'ok',
        meetings: [
            {
                title: 'Reunion 01',
                descripcion: 'Presentacion / Tema 01'
            },
            {
                title: 'Reunion 02',
                descripcion: 'Tema 02'
            }
        ]
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(respuesta));
});

server.listen(3000);



