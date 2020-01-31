import express from 'express';
import { returnError, returnData, getOffset } from './utils';

export default (sequelize, Ticket) => {
  const router = express.Router();

  router
    .route('/')
    .get(async (req, res) => {
      try {
        const offset = getOffset(req);
        const filter = { limit: 10, offset };
        const tickets = await Ticket.findAndCountAll(filter);
        returnData(res, tickets);
      } catch (e) {
        returnError(res, 500, e);
      }
    });

  return router;
};
