const Sequelize = require('sequelize');

export default (database, callback) => {
	const sequelize = new Sequelize(database, 'sa', '123', {
		host: 'localhost',
		dialect: 'mssql',
		operatorsAliases: false,
		port: 50827,

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
		// connect to a database if needed, then pass it to `callback`:
		callback(sequelize);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
};
