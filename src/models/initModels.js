const Sequelize = require('sequelize');
export default (sequelize) => {
  const vehiculoModel = sequelize.define('vehiculos', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
    },
  }, { timestamps: false });

  const servicioModel = sequelize.define('servicios', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
    },
  }, { timestamps: false });

  const clienteModel = sequelize.define('clientes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    telefono: {
      type: Sequelize.STRING,
    },
  }, { timestamps: false });

  const pedidoModel = sequelize.define('pedidos', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
    placa: {
      type: Sequelize.STRING,
    },
    factura: {
      type: Sequelize.STRING,
    },
    folio: {
      type: Sequelize.STRING,
    },
    manoObraTotal: {
      type: Sequelize.DECIMAL(10, 2),
    },
    total: {
      type: Sequelize.DECIMAL(10, 2),
    },
  }, { timestamps: false });

  const registroServicioModel = sequelize.define('registroservicio', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numeroParte: {
      type: Sequelize.STRING,
    },
    manoObra: {
      type: Sequelize.DECIMAL(10, 2),
    },
    precio: {
      type: Sequelize.DECIMAL(10, 2),
    },
  }, { timestamps: false });

  // clienteModel.belongsTo(pedidoModel, { foreignKey: 'idCliente' });
  clienteModel.hasMany(pedidoModel, { foreignKey: 'id' });
  pedidoModel.hasOne(clienteModel, { foreignKey: 'id' });

  vehiculoModel.belongsTo(pedidoModel, { foreignKey: 'id' });
  pedidoModel.hasOne(vehiculoModel, { foreignKey: 'id' });

  registroServicioModel.belongsTo(pedidoModel, { foreignKey: 'id' });
  pedidoModel.hasMany(registroServicioModel, { foreignKey: 'id' });

  vehiculoModel.belongsTo(registroServicioModel, { foreignKey: 'id' });
  registroServicioModel.hasOne(vehiculoModel, { foreignKey: 'id' });

  servicioModel.belongsTo(registroServicioModel, { foreignKey: 'id' });
  registroServicioModel.hasMany(servicioModel, { foreignKey: 'id' });

  return {
    vehiculoModel,
    servicioModel,
    clienteModel,
    pedidoModel,
    registroServicioModel,
  };
}
