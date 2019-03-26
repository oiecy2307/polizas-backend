'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Sequelize = require('sequelize');

exports.default = function (sequelize) {
  var presupuestoModel = sequelize.define('presupuestos', {
    presupuestoid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    periodo: {
      type: Sequelize.STRING
    },
    gananciaPresupuestadaTotal: {
      type: Sequelize.FLOAT,
      defaultValue: 0
    },
    cantidadPresupuestadaTotal: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    anio: {
      type: Sequelize.INTEGER,
      defaultValue: new Date().getFullYear()
    }
  }, { timestamps: false });
  return presupuestoModel;
};
//# sourceMappingURL=presupuesto.js.map