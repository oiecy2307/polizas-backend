import { Models, DataTypes, Sequelize } from 'sequelize';
import user from './user';

export default (sequelize) => {
  const Poliza = sequelize.define('poliza', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    empleadoGenero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productoSku:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    inventarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'inventarios',
        key: 'id',
      },

    },
  }, {});
  return Poliza;
}
