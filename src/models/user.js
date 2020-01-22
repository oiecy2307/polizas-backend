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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondLastName: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    role: {
      type: DataTypes.ENUM('admin', 'technical', 'salesman'),
      allowNull: false,
    },
  }, { timestamps: false });

  return User;
};
