import express from 'express';

export default (sequelize, User) => {
  const router = express.Router();

  router
    .route('/')
    .get(async (req, res) => {
      try {
        const users = await User.findAndCountAll();
        res.status(200).json({
          data: users,
          error: false,
        });
      } catch (e) {
        res.status(500).send(e);
      }
    });

  return router;
};
