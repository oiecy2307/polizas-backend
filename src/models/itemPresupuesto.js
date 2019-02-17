const Sequelize = require('sequelize');
export default (sequelize, presupuesto, producto) => {
  const itemPresupuestoModel = sequelize.define('itemPresupuestos', {
    presupuestoitemid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, { timestamps: false });
  itemPresupuestoModel.belongsTo(presupuesto, { foreignKey: 'presupuestoid' });
  itemPresupuestoModel.belongsTo(producto, { foreignKey: 'CIDPRODUCTO' });
  return itemPresupuestoModel;
}
