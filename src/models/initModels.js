const Sequelize = require('sequelize');
export default (sequelize) => {
  // const vehiculoModel = sequelize.define('vehiculos', {
  //   id: {
  //     type: Sequelize.INTEGER,
  //     primaryKey: true,
  //     autoIncrement: true,
  //   },
  //   nombre: {
  //     type: Sequelize.STRING,
  //   },
  // }, { timestamps: false });
  //
  // const pedidoModel = sequelize.define('pedidos', {
  //   id: {
  //     type: Sequelize.INTEGER,
  //     primaryKey: true,
  //     autoIncrement: true,
  //   },
  //   fecha: {
  //     type: Sequelize.DATEONLY,
  //     defaultValue: new Date(),
  //   },
  //   placa: {
  //     type: Sequelize.STRING,
  //   },
  //   factura: {
  //     type: Sequelize.STRING,
  //   },
  //   folio: {
  //     type: Sequelize.STRING,
  //   },
  //   manoObraTotal: {
  //     type: Sequelize.DECIMAL(10, 2),
  //   },
  //   total: {
  //     type: Sequelize.DECIMAL(10, 2),
  //   },
  //   costoOtros: {
  //     type: Sequelize.DECIMAL(10, 2),
  //   },
  //   otros: {
  //     type: Sequelize.TEXT,
  //     defaultValue: '',
  //   },
  //   cambioAceite: {
  //     type: Sequelize.BOOLEAN,
  //   },
  //   afinacion: {
  //     type: Sequelize.BOOLEAN,
  //   },
  //   idVehiculo: {
  //     type: Sequelize.INTEGER,
  //   },
  //   idCliente: {
  //     type: Sequelize.INTEGER,
  //   },
  // }, { timestamps: false });
  //
  // pedidoModel.belongsTo(vehiculoModel, { foreignKey: 'idVehiculo' });
  // vehiculoModel.hasMany(pedidoModel, { foreignKey: 'idVehiculo' });


  return {
    // vehiculoModel,
    // pedidoModel,
  };
}
