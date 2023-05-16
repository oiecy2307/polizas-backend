import express from 'express';
import { returnError, returnData, getOffset } from './utils';

export default (sequelize, Inventario) => {
  const router = express.Router();

  router
    .route('/')
    .get(async (req, res) => {
      try {
        const offset = getOffset(req);
        const filter = { limit: 10, offset, console };
        const inventario = await Inventario.findAll();
        returnData(res, inventario);
      } catch (e) {
        returnError(res, 500, e);
      }
    });

    router
    .route('/:id')
    .get(async (req, res) => {
      try {
        const { id } = req.params;
        const inventario = await Inventario.findByPk(id);
        returnData(res, inventario);
      } catch (e) {
        returnError(res, 500, e);
      }
    });

  // router
  //   .route('/')
  //   .post(async (req, res) => {
  //     try {
  //       const {
  //         reporterId,
  //         technicalId,
  //         // clientId,
  //         description,
  //         status,
  //         reportedDate,
  //         dueDate,
  //         shortName,
  //         // closed,
  //         // documentId,
  //         // timeNeeded,
  //         // cost,
  //         // solution,
  //       } = req.body;
  //       if (!(
  //         reporterId &&
  //         technicalId &&
  //         description &&
  //         status &&
  //         reportedDate &&
  //         dueDate &&
  //         shortName
  //       )) {
  //         returnError(res, 412, 'Information not completed');
  //         return;
  //       }
  //       const newInventario = await Inventario
  //         .build({
  //           reporterId,
  //           technicalId,
  //           description,
  //           status,
  //           reportedDate,
  //           dueDate,
  //           shortName,
  //         })
  //         .save();
  //       returnData(res, newInventario);
  //     } catch (e) {
  //       returnError(res, 500, e);
  //     }
  //   });

  return router;
};
