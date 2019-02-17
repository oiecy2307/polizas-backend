const Sequelize = require('sequelize');
export default (sequelize) =>
  sequelize.define('admProductos', {
    CIDPRODUCTO: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    CNOMBREPRODUCTO: {
      type: Sequelize.STRING,
    },
    CTIPOPRODUCTO: {
      type: Sequelize.INTEGER,
    },
    CDESCRIPCIONPRODUCTO: {
      type: Sequelize.STRING,
    },
    CPRECIO1: {
      type: Sequelize.FLOAT,
    },
    CPRECIO2: {
      type: Sequelize.FLOAT,
    },
    CPRECIO3: {
      type: Sequelize.FLOAT,
    },
    CPRECIO4: {
      type: Sequelize.FLOAT,
    },
    CPRECIO5: {
      type: Sequelize.FLOAT,
    },
    CPRECIO6: {
      type: Sequelize.FLOAT,
    },
    CPRECIO7: {
      type: Sequelize.FLOAT,
    },
    CPRECIO8: {
      type: Sequelize.FLOAT,
    },
    CPRECIO9: {
      type: Sequelize.FLOAT,
    },
    CPRECIO10: {
      type: Sequelize.FLOAT,
    },
  }, { timestamps: false });
