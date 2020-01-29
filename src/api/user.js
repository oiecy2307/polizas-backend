import express from 'express';
import bcrypt from 'bcryptjs';

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

  router
    .route('/signup')
    .post(async (req, res) => {
      try {
        const password = await bcrypt.hash(req.body.password, 10);
        res.status(200).send(password);
      } catch (e) {
        res.status(500).send(e);
      }
    });

  return router;
};
