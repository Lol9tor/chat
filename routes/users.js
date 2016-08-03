module.exports = function (User) {
	return {
		getAll: function (req, res) {
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
		login: function (req, res) {
			res.json(req.user);
		},
		create: function (req, res) {

		},
		update: function (req, res) {

		},
		delete: function (req, res) {

		},
	}
};
