'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Sequelize = require('sequelize');

exports.default = function (sequelize, presupuesto, producto) {
  var itemPresupuestoModel = sequelize.define('itemPresupuestos', {
    presupuestoitemid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, { timestamps: false });
  itemPresupuestoModel.belongsTo(presupuesto, { foreignKey: 'presupuestoid' });
  itemPresupuestoModel.belongsTo(producto, { foreignKey: 'CIDPRODUCTO' });
  return itemPresupuestoModel;
};
//# sourceMappingURL=itemPresupuesto.js.map