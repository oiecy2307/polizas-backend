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

  router
    .route('/')
    .post(async (req, res) => {
      try {
        const {
          reporterId,
          technicalId,
          // clientId,
          description,
          status,
          reportedDate,
          dueDate,
          shortName,
          // closed,
          // documentId,
          // timeNeeded,
          // cost,
          // solution,
        } = req.body;
        if (!(
          reporterId &&
          technicalId &&
          description &&
          status &&
          reportedDate &&
          dueDate &&
          shortName
        )) {
          returnError(res, 412, 'Information not completed');
          return;
        }
        const newTicket = await Ticket
          .build({
            reporterId,
            technicalId,
            description,
            status,
            reportedDate,
            dueDate,
            shortName,
          })
          .save();
        returnData(res, newTicket);
      } catch (e) {
        returnError(res, 500, e);
      }
    });

  return router;
};
