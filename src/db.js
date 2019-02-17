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
		sequelize.query(
			"if not exists (select * from sysobjects where name='presupuestos' and xtype='U')begin create table presupuestos (presupuestoid int not null identity primary key,periodo varchar(20) not null,gananciaPresupuestadaTotal float null,cantidadPresupuestadaTotal int null, anio int null, nombre varchar(100) null)create table itemPresupuestos (presupuestoitemid int not null identity primary key,presupuestoid int foreign key references presupuestos(presupuestoid),CIDPRODUCTO int foreign key references admProductos(CIDPRODUCTO))create table itemGanancias (itemgananciaid int not null identity primary key,presupuestoitemid int foreign key references itemPresupuestos(presupuestoitemid),cantidad float null, periodo int not null)create table itemCantidadUnidades (itemcantidadunidades int not null identity primary key,presupuestoitemid int foreign key references itemPresupuestos(presupuestoitemid),cantidad float null, periodo int not null) end"
		).spread((results) => {
			// connect to a database if needed, then pass it to `callback`:
			callback(sequelize);
		});
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
};
