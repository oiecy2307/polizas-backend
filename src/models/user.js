import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidoPaterno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidoMaterno: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    role: {
      type: DataTypes.ENUM('admin', 'vendedor'),
      allowNull: false,
    },
  }, {});

  return User;
};
