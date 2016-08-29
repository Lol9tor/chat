var crypto = require('crypto');

module.exports = function (connection, DataTypes) {
	var hiddenFields = ['salt', 'hashedPassword'];

	var User = connection.define('User', {
		email: {
			type: DataTypes.STRING,
			unique: true,
			validate: {
				isEmail: true,
				notEmpty: true,
				len: [1,255]
			}
		},
		username: {
			type: DataTypes.STRING,
			unique: true
		},
		hashedPassword: DataTypes.STRING,
		salt: DataTypes.STRING,
		password: {
			type:DataTypes.VIRTUAL,
			validate: {notEmpty: true},
			set: function (val) {
				this._plainPassword = val;
				this.salt = Math.random() + '';
				this.hashedPassword = this.encryptPassword(val);
			},
			get: function () {
				return this._plainPassword;
			}
		}
	}, {
		instanceMethods: {
			encryptPassword: function (val) {
				return crypto.createHmac('sha1', this.salt).update(val).digest('hex');
			},
			checkPassword: function (val) {
				return this.encryptPassword(val) === this.hashedPassword;
			},
			getPublic: function () {
				hiddenFields.forEach( (key) => {
				   delete this.dataValues[key];
				});
			    return this.dataValues;
			}
		}
	});

	return User;
};