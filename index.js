var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var userId = 0;
io.on('connection', function(socket){
  socket.userId = userId ++;
  console.log('a user connected, user id: ' + socket.userId);

  socket.on('chat', function(msg){
    console.log('message from user#' + socket.userId + ": " + msg);
    io.emit('chat', {
      id: socket.userId,
      msg: msg
    });
	
	socket.on('left', function(data) {
    	  console.log('left received');
		  //send a message to ALL connected clients
		  io.emit('left', userId);
    });
  });
});

http.listen(process.env.PORT, function(){
  console.log('listening on *:3000');
});