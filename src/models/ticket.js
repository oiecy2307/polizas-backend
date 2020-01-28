import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Ticket = sequelize.define('ticket', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // reporterId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // technicalId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // clientId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('new', 'in-progress', 'finished', 'closed', 'cancelled'),
      allowNull: false,
    },
    reportedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    shortName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    closed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    documentId: {
      type: DataTypes.STRING,
    },
    timeNeeded: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cost: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    solution: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: false,
    },
  }, {});
  return Ticket;
}
