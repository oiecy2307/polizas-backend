const Sequelize = require('sequelize');

export default (callback) => {
	const sequelize = new Sequelize('incidencias', 'pedro', 'M0r0cha95!', {
		host: '104.154.140.189',
		dialect: 'mysql',
		operatorsAliases: false,
		port: 3306,

		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	});

	sequelize
  .authenticate()
  .then(() => {
		callback(sequelize);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
};
