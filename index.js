var app = require('express')(); // web framework for node
var http = require('http').Server(app); // idk
// socket.io, alows bidirectional communication between server and client without refreshing the page
var io = require('socket.io')(http);

app.get('/', function(req, res){ // returns the index.html if pointed tothe root directory
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){ // defining a list of options when a user connects
  console.log('a user connected'); // prints to the console on the server
  socket.on('disconnect', function(){ // defines what to do when a user disconnects
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){ // defines what to do when a message is typed in
    console.log('message: ' + msg);
    io.emit('chat message', msg); // sends messages to everyone that is connected
  });
});


http.listen(3000, function(){ // connects us to the local host, starts server
  console.log('listening on *:3000');
});
