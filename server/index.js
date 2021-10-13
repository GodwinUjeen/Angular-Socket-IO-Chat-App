const express = require('express');
const socket = require('socket.io')
const cors = require('cors')
const app = express();

app.use(cors());

const server = app.listen(3000,
    () => console.log('Server running on port 3000!'));

// Socket setup
const io = socket(server);

io.set( 'origins', '*localhost:4200' );

//Listen for new connection.
io.sockets.on('connection', ((socket) => {

    console.log(`New connection ${socket.id}`)

    //Listening for chat event.
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    //Listening for Typing event
    socket.on('typing', (data) => {
        //This will emit the data to all the machines including ours
        // io.sockets.emit('typing', data);

        //This will emit the message to the receivers.
        socket.broadcast.emit('typing', data);
    });
}));