var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config/config');

var SequelizeStore = require('connect-session-sequelize')(session.Store);
var routes = require('./routes/index');

var app = express();

var Sequelize = require('sequelize'),
		connection = new Sequelize('chat', 'root', 'mysql', config.db);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	"secret": "secretNinja",
	"store": new SequelizeStore({
		db: connection
	}),
	"cookie": {
		"path": "/",
		"httpOnly": true,
		"secure": false,
		"maxAge": null
	},
	"name": "sid",
	"resave": false,
	"saveUninitialized": false
}));
app.use(express.static(path.join(__dirname, 'public')));

// setup database

var userModel = require('./models/user')(connection, Sequelize);

connection
	.authenticate().then(()=>{
		console.log('Database is working...');
	}).catch((err)=>{console.log(err);});
connection.sync({force: true})
	.then(()=>{
	userModel.bulkCreate([{
		email: 'osemenovich@qualium-systems.com.ua',
		username: 'Oleh',
		password: '123456'
	}, {
		email: 'test@qualium-system.com.ua',
		username: 'Vasya',
		password: '123456'
	}])
})
	.catch((err)=>{
	console.error(err);
});
/*
app.use('/', function (req, res, next) {
	console.log('____________------------------____________________------------');
	console.log('user ',req.user);
	console.log('isAuthenticated ',req.isAuthenticated());
	console.log('session ', req.session);
	console.log('cookies ', req.cookies);
	next();
});*/

var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
},
	function(email, password, done) {

		console.log(email, password);
		userModel.findOne({ where: {email: email} }).then(function (user) {
			if (!user || !user.checkPassword(password)) {
				return done(null, false, { fields:{
					email: 'Incorrect email or password.',
					password: 'Incorrect email or password.'
				}});
			}

			return done(null, user);
		}).catch(function (err) {
		    console.log(err);
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	userModel.findById(id).then(function(user) {
		console.log('deserializing user:',user);
		done(null, user);
	}).catch(function(err) {
		if (err) {
			console.error(err);
			done(err, false);
		}
	});
});

app.post('/auth/me', routes.users(userModel).authenticate);

app.post('/login', function (req, res, next) {

	passport.authenticate('local',{ session: false }, function(err, user, info) {
		if (err) { return next(err); }
		if (!user) { return res.status(401).json(info); }
		req.logIn(user, function(err) {
			if (err) { return next(err); }
			return routes.users(userModel).login(req, res);
		});
	})(req, res, next)
});
app.post('/signup', routes.users(userModel).signup);

app.post('/logout', routes.users(userModel).logout);

app.get('/users', routes.users(userModel).getAll);

//setup webpack config and hot reload
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);

var serverOptions = {
	contentBase: 'http://localhost:3000/public/static',
	quiet: false,
	noInfo: true,
	hot: true,
	inline: true,
	lazy: false,
	publicPath: webpackConfig.output.publicPath,
	headers: {'Access-Control-Allow-Origin': '*'},
	stats: {colors: true}
};

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: {}
	});
});


module.exports = app;
