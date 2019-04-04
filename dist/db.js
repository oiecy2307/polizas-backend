'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Sequelize = require('sequelize');

exports.default = function (callback) {
	var sequelize = new Sequelize('autopartes', 'pedro', 'M0r0cha95!', {
		host: '104.154.140.189',
		dialect: 'mysql',
		operatorsAliases: false,
		port: 3306,

		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		}
	});

	sequelize.authenticate().then(function () {
		callback(sequelize);
	}).catch(function (err) {
		console.error('Unable to connect to the database:', err);
	});
};
//# sourceMappingURL=db.js.map