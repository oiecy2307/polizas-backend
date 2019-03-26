'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, Producto, Presupuesto, ItemPresupuesto, ItemGananciaEstimada, ItemCantidadEstimada) {
	var router = _express2.default.Router();

	// GET ALL PRODUCTS
	router.route('/').get(function (req, res) {
		Producto.findAll().then(function (products) {
			res.status(200).json(products);
		}).catch(function (err) {
			res.status(500).send(err);
		});
	});

	// GET PRESUPUESTO
	router.route('/presupuesto').get(function (req, res) {
		Presupuesto.findAll({
			include: [{
				model: ItemPresupuesto,
				include: [{
					model: Producto
				}, {
					model: ItemGananciaEstimada
				}, {
					model: ItemCantidadEstimada
				}]
			}]
		}).then(function (products) {
			res.status(200).json(products);
		}).catch(function (err) {
			res.status(500).send(err);
		});
	});

	// CREATE NEW PRESUPUESTO
	router.route('/presupuesto').post(function (req, res) {
		try {
			var _req$body = req.body,
			    periodo = _req$body.periodo,
			    gananciaPresupuestadaTotal = _req$body.gananciaPresupuestadaTotal,
			    cantidadPresupuestadaTotal = _req$body.cantidadPresupuestadaTotal,
			    anio = _req$body.anio;

			if (!periodo) {
				res.status(400).json({ error: 'Faltan parámetros' });
				return;
			}
			var presupuesto = Presupuesto.build({
				periodo: periodo,
				gananciaPresupuestadaTotal: gananciaPresupuestadaTotal,
				cantidadPresupuestadaTotal: cantidadPresupuestadaTotal,
				anio: anio
			});

			presupuesto.save().then(function (newPresupuesto) {
				res.status(200).json(newPresupuesto);
			}).catch(function (e) {
				res.status(500).send(e);
			});
		} catch (e) {
			res.status(500).send(e);
		}
	});

	//CREATE NEW ITEM PRESUPUESTO
	router.route('/item-presupuesto').post(function (req, res) {
		try {
			var _req$body2 = req.body,
			    presupuestoId = _req$body2.presupuestoId,
			    productoId = _req$body2.productoId;

			if (!presupuestoId || !productoId) {
				res.status(400).json({ error: 'Faltan parámetros' });
				return;
			}
			var itemPresupuesto = ItemPresupuesto.build({
				presupuestoid: presupuestoId,
				CIDPRODUCTO: productoId
			});

			itemPresupuesto.save().then(function (newItemPresupuesto) {
				res.status(200).json(newItemPresupuesto);
			}).catch(function (e) {
				res.status(500).send(e);
			});
		} catch (e) {
			res.status(500).send(e);
		}
	});

	//CREATE NEW ITEM GANANCIA
	router.route('/item-ganancia').post(function (req, res) {
		try {
			var _req$body3 = req.body,
			    cantidad = _req$body3.cantidad,
			    periodo = _req$body3.periodo,
			    presupuestoitemid = _req$body3.presupuestoitemid;

			if (!cantidad || !periodo || !presupuestoitemid) {
				res.status(400).json({ error: 'Faltan parámetros' });
				return;
			}
			var itemGanancia = ItemGananciaEstimada.build({
				cantidad: cantidad,
				periodo: periodo,
				presupuestoitemid: presupuestoitemid
			});

			itemGanancia.save().then(function (newItemGanancia) {
				res.status(200).json(newItemGanancia);
			}).catch(function (e) {
				res.status(500).send(e);
			});
		} catch (e) {
			res.status(500).send(e);
		}
	});

	//CREATE NEW ITEM CANTIDAD
	router.route('/item-cantidad').post(function (req, res) {
		try {
			var _req$body4 = req.body,
			    cantidad = _req$body4.cantidad,
			    periodo = _req$body4.periodo,
			    presupuestoitemid = _req$body4.presupuestoitemid;

			if (!cantidad || !periodo || !presupuestoitemid) {
				res.status(400).json({ error: 'Faltan parámetros' });
				return;
			}
			var itemCantidad = ItemCantidadEstimada.build({
				cantidad: cantidad,
				periodo: periodo,
				presupuestoitemid: presupuestoitemid
			});

			itemCantidad.save().then(function (newItemCantidad) {
				res.status(200).json(newItemCantidad);
			}).catch(function (e) {
				res.status(500).send(e);
			});
		} catch (e) {
			res.status(500).send(e);
		}
	});
	return router;
};
//# sourceMappingURL=presupuesto.js.map