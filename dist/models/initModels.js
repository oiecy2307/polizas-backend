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
    },
    nombre: {
      type: Sequelize.STRING
    }
  }, { timestamps: false });

  var productoModel = sequelize.define('admProductos', {
    CIDPRODUCTO: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    CNOMBREPRODUCTO: {
      type: Sequelize.STRING
    },
    CTIPOPRODUCTO: {
      type: Sequelize.INTEGER
    },
    CDESCRIPCIONPRODUCTO: {
      type: Sequelize.STRING
    },
    CPRECIO1: {
      type: Sequelize.FLOAT
    },
    CPRECIO2: {
      type: Sequelize.FLOAT
    },
    CPRECIO3: {
      type: Sequelize.FLOAT
    },
    CPRECIO4: {
      type: Sequelize.FLOAT
    },
    CPRECIO5: {
      type: Sequelize.FLOAT
    },
    CPRECIO6: {
      type: Sequelize.FLOAT
    },
    CPRECIO7: {
      type: Sequelize.FLOAT
    },
    CPRECIO8: {
      type: Sequelize.FLOAT
    },
    CPRECIO9: {
      type: Sequelize.FLOAT
    },
    CPRECIO10: {
      type: Sequelize.FLOAT
    }
  }, { timestamps: false });

  var itemPresupuestoModel = sequelize.define('itemPresupuestos', {
    presupuestoitemid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, { timestamps: false });

  var itemGananciaEstimadaModel = sequelize.define('itemGanancias', {
    itemgananciaid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    periodo: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    cantidad: {
      type: Sequelize.FLOAT
    }
  }, { timestamps: false });

  var itemCantidadEstimadaModel = sequelize.define('itemCantidadUnidades', {
    itemcantidadunidades: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    periodo: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    cantidad: {
      type: Sequelize.FLOAT
    }
  }, { timestamps: false });

  presupuestoModel.hasMany(itemPresupuestoModel, { foreignKey: 'presupuestoid' });
  itemPresupuestoModel.belongsTo(presupuestoModel, { foreignKey: 'presupuestoid' });
  itemPresupuestoModel.belongsTo(productoModel, { foreignKey: 'CIDPRODUCTO' });
  itemPresupuestoModel.hasMany(itemGananciaEstimadaModel, { foreignKey: 'presupuestoitemid' });
  itemPresupuestoModel.hasMany(itemCantidadEstimadaModel, { foreignKey: 'presupuestoitemid' });
  itemGananciaEstimadaModel.belongsTo(itemPresupuestoModel, { foreignKey: 'presupuestoitemid' });
  itemCantidadEstimadaModel.belongsTo(itemPresupuestoModel, { foreignKey: 'presupuestoitemid' });

  return {
    presupuestoModel: presupuestoModel,
    productoModel: productoModel,
    itemPresupuestoModel: itemPresupuestoModel,
    itemGananciaEstimadaModel: itemGananciaEstimadaModel,
    itemCantidadEstimadaModel: itemCantidadEstimadaModel
  };
};
//# sourceMappingURL=initModels.js.map