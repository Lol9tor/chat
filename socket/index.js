

module.exports = function(io){

    var passportSocketIo = require('passport.socketio');

    // io.use(passportSocketIo.authorize({
    //     key: 'connect.sid',
    //     secret: 'secretNinja',
    //     store: sessionStore,
    //     passport: passport
    // }));

    io.on('connection', function(socket){
        console.log('a user connected. id: ', socket.id);

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
