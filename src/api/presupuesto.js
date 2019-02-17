import express from 'express';

export default (sequelize, Producto, Presupuesto, ItemPresupuesto, ItemGananciaEstimada, ItemCantidadEstimada) => {
	const router = express.Router();

	// GET ALL PRODUCTS
	router.route('/')
		.get((req, res) => {
      Producto.findAll()
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
		});

	// GET PRESUPUESTO
	router.route('/presupuesto')
		.get((req, res) => {
			Presupuesto.findAll({
				include: [{
					model: ItemPresupuesto,
					include: [
						{
							model: Producto,
						},
						{
							model: ItemGananciaEstimada,
						},
						{
							model: ItemCantidadEstimada,
						},
					],
				}],
			})
			.then((products) => {
				res.status(200).json(products);
			})
			.catch((err) => {
				res.status(500).send(err);
			});
		});

	// CREATE NEW PRESUPUESTO
	router.route('/presupuesto')
		.post((req, res) => {
			try {
				const {
					periodo,
					gananciaPresupuestadaTotal,
					cantidadPresupuestadaTotal,
					anio,
				} = req.body;
				if (!periodo) {
					res.status(400).json({ error: 'Faltan parámetros' });
					return;
				}
				const presupuesto = Presupuesto.build({
					periodo,
					gananciaPresupuestadaTotal,
					cantidadPresupuestadaTotal,
					anio,
				});

				presupuesto
				.save()
				.then((newPresupuesto) => {
					res.status(200).json(newPresupuesto);
				})
				.catch((e) => {
					res.status(500).send(e);
				});
			}
			catch (e) {
				res.status(500).send(e);
			}
		});

	//CREATE NEW ITEM PRESUPUESTO
	router.route('/item-presupuesto')
		.post((req, res) => {
			try {
				const {
					presupuestoId,
					productoId,
				} = req.body;
				if (!presupuestoId || !productoId) {
					res.status(400).json({ error: 'Faltan parámetros' });
					return;
				}
				const itemPresupuesto = ItemPresupuesto.build({
					presupuestoid: presupuestoId,
					CIDPRODUCTO: productoId,
				});

				itemPresupuesto
					.save()
					.then((newItemPresupuesto) => {
						res.status(200).json(newItemPresupuesto);
					})
					.catch((e) => {
						res.status(500).send(e);
					});
			}
			catch (e) {
				res.status(500).send(e);
			}
		});

	//CREATE NEW ITEM GANANCIA
	router.route('/item-ganancia')
		.post((req, res) => {
			try {
				const {
					cantidad,
					periodo,
					presupuestoitemid,
				} = req.body;
				if (!cantidad || !periodo || !presupuestoitemid) {
					res.status(400).json({ error: 'Faltan parámetros' });
					return;
				}
				const itemGanancia = ItemGananciaEstimada.build({
					cantidad,
					periodo,
					presupuestoitemid,
				});

				itemGanancia
					.save()
					.then((newItemGanancia) => {
						res.status(200).json(newItemGanancia);
					})
					.catch((e) => {
						res.status(500).send(e);
					});
			}
			catch (e) {
				res.status(500).send(e);
			}
		});

		//CREATE NEW ITEM CANTIDAD
		router.route('/item-cantidad')
			.post((req, res) => {
				try {
					const {
						cantidad,
						periodo,
						presupuestoitemid,
					} = req.body;
					if (!cantidad || !periodo || !presupuestoitemid) {
						res.status(400).json({ error: 'Faltan parámetros' });
						return;
					}
					const itemCantidad = ItemCantidadEstimada.build({
						cantidad,
						periodo,
						presupuestoitemid,
					});

					itemCantidad
						.save()
						.then((newItemCantidad) => {
							res.status(200).json(newItemCantidad);
						})
						.catch((e) => {
							res.status(500).send(e);
						});
				}
				catch (e) {
					res.status(500).send(e);
				}
			});
	return router;
};
