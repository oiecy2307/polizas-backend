import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Ticket = sequelize.define('ticket', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {});
  return Ticket;
}
