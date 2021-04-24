const express = require('express');
const app = express();

//creamos servidor http desde la librearia de express
const http = require('http').Server(app);

//para generar comunicación empezamos cponsocketio
const io = require('socket.io')(http);

//routes
app.use(require('./routes/zoom.routes'));

//cargar archivos html
app.use(express.static(__dirname + "/public"));

io.on('connection', (socket) => {
    socket.on('stream', (image) => {
        //emitir el evento a todos los sockets conectados
        socket.broadcast.emit('stream', image);
    })
});

module.exports = http;  