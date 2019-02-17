const Sequelize = require('sequelize');
export default (sequelize) => {
  const presupuestoModel = sequelize.define('presupuestos', {
    presupuestoid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    periodo: {
      type: Sequelize.STRING,
    },
    gananciaPresupuestadaTotal: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    },
    cantidadPresupuestadaTotal: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    anio: {
      type: Sequelize.INTEGER,
      defaultValue: new Date().getFullYear(),
    },
  }, { timestamps: false });
  return presupuestoModel;
}
