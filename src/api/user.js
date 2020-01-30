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

  router
    .route('/getAll')
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
    .route('/:id')
    .get(async (req, res) => {
      try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        delete user.password;
        res.status(200).json({ user });
      } catch (e) {
        res.status(500).send(e);
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
        res.status(200).json({ user });
      } catch (e) {
        res.status(500).send(e);
      }
    });

  return router;
};
