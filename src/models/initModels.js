const Sequelize = require('sequelize');
export default (sequelize) => {
  const userModel = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
  }, { timestamps: false });

  const eventModel = sequelize.define('events', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    topic: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATEONLY,
      defaultValue: new Date(),
    },
    scheduleStart: {
      type: Sequelize.STRING,
    },
    scheduleEnd: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    diary: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.BOOLEAN,
    },
  }, { timestamps: false });

  const assistanModel = sequelize.define('assistants', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: Sequelize.INTEGER,
    },
    event: {
      type: Sequelize.INTEGER,
    },
  }, { timestamps: false });

  const talkModel = sequelize.define('talks', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: Sequelize.INTEGER,
    },
    userName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    aboutTalk: {
      type: Sequelize.STRING,
    },
    aboutYou: {
      type: Sequelize.STRING,
    },
    twitter: {
      type: Sequelize.STRING,
    },
    linkedin: {
      type: Sequelize.STRING,
    },
    facebook: {
      type: Sequelize.STRING,
    },
  }, { timestamps: false });

  return {
    userModel,
    eventModel,
    assistanModel,
    talkModel,
  };
}
