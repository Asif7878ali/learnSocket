const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const app = express();
const port = 4000;

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const io = socketIo(server);

// Serve the index.html file
app.get('/', (req, res) => {
    const options = {
        root: path.join(__dirname)
    };
    res.sendFile('index.html', options);
});
  let users = 0;
// Setup Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');
     users++;
     io.sockets.emit('broadcast', {msg : users+' user connected'});

    // setTimeout(function(){
    //      //create a custom from server side
    //     socket.emit('sentmessagefromserver' , {msg: 'hii hello'})
    // },3000);
    socket.on('disconnect', () => {
        console.log('A user disconnected');
        users--;
     io.sockets.emit('broadcast', {msg : users+'user disconnected'});
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
