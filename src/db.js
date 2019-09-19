const Sequelize = require('sequelize');

export default (callback) => {
	const sequelize = new Sequelize('datank-bd', 'pedro', 'pedroejemplo123', {
		host: '35.188.186.135',
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
