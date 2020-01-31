import express from 'express';
import { returnError, returnData, getOffset } from './utils';

export default (sequelize, User) => {
  const router = express.Router();

  router
    .route('/')
    .get(async (req, res) => {
      try {
        const offset = getOffset(req);
        const filter = { limit: 10, offset };
        const users = await User.findAndCountAll(filter);
        returnData(res, users);
      } catch (e) {
        returnError(res, 500, e);
      }
    });

  router
    .route('/getAll')
    .get(async (req, res) => {
      try {
        const users = await User.findAndCountAll();
        returnData(res, users);
      } catch (e) {
        returnError(res, 500, e);
      }
    });

  router
    .route('/:id')
    .get(async (req, res) => {
      try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        delete user.password;
        returnData(res, user);
      } catch (e) {
        returnError(res, 500, e);
      }
    });

  router
    .route('/:id')
    .patch(async (req, res) => {
      try {
        const { id } = req.params;
        const { body } = req;

        const user = await User.findByPk(id);
        for (const [key, value] of Object.entries(body)) {
					user[key] = value;
				}
        delete user.password;
        await user.save();
        returnData(res, user)
      } catch (e) {
        returnError(res, 500, e);
      }
    });

  return router;
};
