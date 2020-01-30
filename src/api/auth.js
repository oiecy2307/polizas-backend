import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

export default (sequelize, User) => {
  const router = express.Router();

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
        const token = await jwt.sign({ userId: newUser.id, role }, 'temporal-pedro');
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

  router
    .route('/login')
    .post(async ({ body }, res) => {
      try {
        const { email, username, password } = body;
        if ((!email && !username) || !password) {
          res.status(412).json({ error: true, message: 'Datos incompletos' });
          return;
        }
        const user = await User
          .findOne({
            where: {
              [Op.or]: [
                { email: email || '' },
                { username: username || '' },
              ],
            },
          });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!user || !isPasswordValid) {
          res.status(404).json({ error: true, message: 'El usuario o contraseña son incorrectos' });
          return;
        }
        delete user.password;
        // TODO: CHANGE SECRET FOR: process.env.APP_SECRET
        const token = await jwt.sign({ userId: user.id, role: user.role }, 'temporal-pedro');
        res
          .status(200)
          .json({
            user,
            token,
          });
      } catch (e) {
        res.status(500).send(e);
      }
    });

  return router;
};
