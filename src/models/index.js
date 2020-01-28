import user from './user';
import ticket from './ticket';

export default (sequelize) => {
  const userModel = user(sequelize);
  const ticketModel = ticket(sequelize);

  userModel.hasMany(ticketModel);
  ticketModel.belongsTo(userModel, {
    foreignKey: 'reporterId',
  });
  ticketModel.belongsTo(userModel, {
    foreignKey: 'technicalId',
  });

  return {
    userModel,
    ticketModel,
  };
}
