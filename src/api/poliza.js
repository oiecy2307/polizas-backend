import express from 'express';
import { returnError, returnData, getOffset } from './utils';
import moment from 'moment';

export default (sequelize, Poliza) => {
  const router = express.Router();

  router
    .route('/')
    .get(async (req, res) => {
      try {
        const polizas = await Poliza.findAll({ include: [{ all: true }]});
        returnData(res, polizas);
      } catch (e) {
        returnError(res, 500, e);
      }
    });

    router
    .route('/:id')
    .get(async (req, res) => {
      try {
        const { id } = req.params;
        const poliza = await Poliza.findByPk(id, { include: [{ all: true }]});
        returnData(res, poliza);
      } catch (e) {
        returnError(res, 500, e);
      }
    });

    router
    .route('/:id')
    .delete(async (req, res) => {
      try {
        const { id } = req.params;
        const poliza = await Poliza.findByPk(id, { include: [{ all: true }]});
        await poliza.destroy();
        returnData(res);
      } catch (e) {
        returnError(res, 500, e);
      }
    });

    router
    .route('/:id')
    .patch(async (req, res) => {
      try {
        let aux, diferencia=0;
        const { id } = req.params;
        const { body } = req;
        const { cantidad, inventarioId } = body;
        const polizaResponse = await Poliza.findByPk(id, { include: [{ all: true }]});

        if (cantidad){
        const inventarioResponse = await sequelize.models.inventario.findByPk(inventarioId);
          if(inventarioResponse.cantidad > 0){
            if(polizaResponse.cantidad > cantidad){
              aux = polizaResponse.cantidad - cantidad + inventarioResponse.cantidad;
            }
            else {
              diferencia = cantidad - polizaResponse.cantidad;
              if(inventarioResponse.cantidad >= diferencia){
                aux = inventarioResponse.cantidad - diferencia;
              } else {
                returnError(res, 500, 'Existencia insuficiente');
              }
            }
          }
          else {
              returnError(res, 500, 'Existencia agotada');
          }
          inventarioResponse.cantidad = aux;
          inventarioResponse.save();
      }


        for (const [key, value] of Object.entries(body)) {
					polizaResponse[key] = value;
				}
        await polizaResponse.save();
        returnData(res, polizaResponse);
      } catch (e) {
        returnError(res, 500, e);
      }
    });

  router
    .route('/')
    .post(async (req, res) => {
      try {
        const {
          empleadoGenero,
          cantidad,
          inventarioId,
          userId,

        } = req.body;
        if (!(
          empleadoGenero &&
          cantidad &&
          inventarioId &&
          userId
        )) {
          returnError(res, 412, 'Information not completed');
          return;
        }
        let aux = 0;
          const inventarioResponse = await sequelize.models.inventario.findByPk(inventarioId);
            if(inventarioResponse.cantidad > 0){
              if(cantidad > inventarioResponse.cantidad){
                returnError(res, 500, 'Existencia insuficiente');
              } else if(cantidad <= inventarioResponse.cantidad){
                aux = inventarioResponse.cantidad - cantidad
              }

            } else {
              returnError(res, 500, 'Existencia agotada');
            }
            inventarioResponse.cantidad = aux;
            inventarioResponse.save();

        const newPoliza = await Poliza
          .build({
            empleadoGenero,
            productoSku: inventarioResponse.sku,
            cantidad,
            fecha: null,
            inventarioId,
            userId,
          }).save();
        returnData(res, newPoliza);
      } catch (e) {
        returnError(res, 500, e);
      }
    });

    router
    .route('/:id')
    .delete(async (req, res) => {
      try {
        let aux = 0;
        const { id } = req.params;
        const poliza = await Poliza.findByPk(id, { include: [{ all: true }]});
        const { inventarioId } = poliza;
        const inventarioResponse = await sequelize.models.inventario.findByPk(inventarioId);
        aux = inventarioResponse.cantidad + poliza.cantidad;
        inventarioResponse.cantidad = aux;
        await inventarioResponse.save()
        await poliza.destroy();
        returnData(res);
      } catch (e) {
        returnError(res, 500, e);
      }
    });

  return router;
};
