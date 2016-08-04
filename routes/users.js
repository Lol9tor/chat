module.exports = function (User) {
	return {
		getAll: function (req, res) {
			console.log('session ', req.session);
			let where = {};
			if (req.query.where){
				try {
					where = {where: JSON.parse(req.query.where)};
				} catch(err){
					res.status(400).send({status: 400, message: '\'where\' parameter is no valid'});
					return false;
				}
			}
			User.findAll(where).then((data)=>{
				res.json(data);
			}).catch((err)=>{
				console.error(err);
				res.status(400).send(err);
			});
		},
		getById: function (req, res) {
			const id = req.params.id;
			console.log(id);
			User.findById(id).then((user)=>{
				if (user){
					res.json(user);
				} else {
					res.status(404).send({
						status: 404,
						message: `User with id '${id}' is not exist`
					})
				}
			}).catch((err) => {
			    res.json(err)
			});
		},
		authenticate: function (req, res) {
			console.log(req.isAuthenticated());
			console.log('session ', req.session);
			if (req.isAuthenticated()){
				this.login(req, res);
			} else {
				res.status(401).json({
					message: 'Session is expired or does not exist'
				});
			}
		},
		login: function (req, res) {
			console.log('user', req.user.toJSON());
			console.log('session ', req.session);
			res.json(req.user);
		},
		signup: function (req, res) {
			    var user = req.body;
				User.create(user).then(function (user) {
					req.login(user, function(err) {
						if (err) { return next(err); }
						res.json(user);
					});
				}).catch(function (err) {
				    console.log('sign up', err);
					var mapErrors = {};
					err.errors.map(function (errObj) {
						mapErrors[errObj.path] = errObj.message;
					});
					res.status(401).json({
						fields: mapErrors
					})
				});

		},
		update: function (req, res) {

		},
		delete: function (req, res) {

		},
	}
};
