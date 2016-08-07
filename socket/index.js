module.exports = function(server){
    var socket = require('socket.io');
    var io = socket(server);

    io.on('connection', function(socket){
        console.log('a user connected');
        console.log(socket.id);

        socket.on('user join', function (user, cb) {
            socket.broadcast.emit('user join', {
                message: user.username+' connected to chat',
                timestamp: Date.now()
            });
            console.log('user join');
        });

        socket.on('chat message', function(obj, cb){
            console.log('message: ' + obj.message);
            obj.timestamp = Date.now();
            socket.broadcast.emit('chat message', obj);
            cb(obj.timestamp);
        });

        socket.on('user leave', function(user){
            socket.broadcast.emit('user leave', {
                message: user.username+' leave chat',
                timestamp: Date.now()
            });
            console.log('user leave');
        });

        socket.on('disconnect', function(obj){
            console.log(obj);
            socket.broadcast.emit('user leave', {
                message: 'Stranger leave chat',
                timestamp: Date.now()
            });
            console.log('user disconnected');
        });
    });
};
