module.exports = function(server){
    var socket = require('socket.io');
    var io = socket(server);

    io.on('connection', function(socket){
        console.log('a user connected');
        socket.on('chat message', function(msg){
            console.log('message: ' + msg);
            socket.broadcast.emit('chat message', msg);
        });
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });
}
