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
    CPRECIO1: {
      type: Sequelize.INTEGER,
    },
  }, { timestamps: false });
