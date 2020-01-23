const Sequelize = require('sequelize');
import user from './user';

export default (sequelize) => {
  // const eventModel = sequelize.define('events', {
  //   id: {
  //     type: Sequelize.INTEGER,
  //     primaryKey: true,
  //     autoIncrement: true,
  //   },
  //   topic: {
  //     type: Sequelize.STRING,
  //   },
  //   date: {
  //     type: Sequelize.DATEONLY,
  //     defaultValue: new Date(),
  //   },
  //   scheduleStart: {
  //     type: Sequelize.STRING,
  //   },
  //   scheduleEnd: {
  //     type: Sequelize.STRING,
  //   },
  //   address: {
  //     type: Sequelize.STRING,
  //   },
  //   diary: {
  //     type: Sequelize.STRING,
  //   },
  //   active: {
  //     type: Sequelize.BOOLEAN,
  //   },
  //   talks: {
  //     type: Sequelize.TEXT,
  //   },
  // }, { timestamps: false });

  const userModel = user(sequelize);

  return {
    userModel,
  };
}
