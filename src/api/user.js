import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { get } from 'lodash';

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
    .post(async ({ body }, res) => {
      try {
        const {
          password,
          email,
          username,
          name,
          lastname,
          secondLastName,
          role,
        } = body;
        if (!(password && email && username && name && lastname && role)) {
          res.status(412).json({ error: true, message: 'Datos incompletos' });
          return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User
          .build({
            password: hashedPassword,
            email,
            username,
            name,
            lastname,
            secondLastName,
            role,
          })
          .save();
        // TODO: CHANGE SECRET FOR: process.env.APP_SECRET
        const token = await jwt.sign({ userId: newUser.id }, 'temporal-pedro');
        res
          .status(200)
          .json({
            user: newUser,
            token,
          });
      } catch (e) {
        res.status(500).send(e);
      }
    });

  return router;
};
