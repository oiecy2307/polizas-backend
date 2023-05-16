const Sequelize = require('sequelize');

export default (callback) => {
	const sequelize = new Sequelize('prueba-proyecto', 'pruebas', 'Pruebas1234.', {
		host: '35.184.48.157',
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
