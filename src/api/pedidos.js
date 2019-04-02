import express from 'express';

export default (sequelize, Vehiculo, Servicio, Cliente, Pedido, RegistroServicio) => {
	const router = express.Router();

	// Métodos get all
	router.route('/vehiculos')
		.get((req, res) => {
      Vehiculo.findAll()
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
		});

	router.route('/servicios')
		.get((req, res) => {
      Servicio.findAll()
      .then((servicios) => {
        res.status(200).json(servicios);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
		});

	router.route('/clientes')
		.get((req, res) => {
      Cliente.findAll()
      .then((clientes) => {
        res.status(200).json(clientes);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
		});

	router.route('/pedidos')
		.get((req, res) => {
			Pedido.findAll()
			.then((pedidos) => {
				res.status(200).json(pedidos);
			})
			.catch((err) => {
				res.status(500).send(err);
			});
		});

	router.route('/registroservicios')
		.get((req, res) => {
			RegistroServicio.findAll()
			.then((registros) => {
				res.status(200).json(registros);
			})
			.catch((err) => {
				res.status(500).send(err);
			});
		});

	router.route('/nueva-orden')
		.post((req, res) => {
			const {
				nombreCliente,
				telefono,
				nombreVehiculo,
				placa,
				manoObraTotal,
				factura,
				folio,
				total,
				frenos,
				suspensiones,
			} = req.body;
			Cliente.findOrCreate({
				where: {
					nombre: nombreCliente,
				},
				defaults: {
					nombre: nombreCliente,
					telefono,
				},
			})
			.then(([cliente, clientCreated]) => {
				if (!clientCreated && cliente.dataValues.telefono !== telefono) {
					cliente.update({
						telefono,
					});
				}
				Vehiculo.findOrCreate({
					where: {
						nombre: nombreVehiculo,
					},
					defaults: {
						nombre: nombreVehiculo,
					},
				})
				.then(([vehiculo, vehiculoCreated]) => {
					const registro = Pedido.build({
						idVehiculo: vehiculo.id,
						idCliente: cliente.id,
						fecha: new Date(),
						placa,
						manoObraTotal,
						factura,
						folio,
						total,
					});
					registro.save().then(() => {
						console.log('vehiculo', vehiculo);
						console.log('vehiculo', vehiculo.id);
						console.log('cliente', cliente);
						console.log('cliente', cliente.id);
						res.status(200).send(registro);
					});
				});
			})
			.catch((err) => {
        res.status(500).send(err);
      });
			// RegistroServicio.create({
			//
			// })
		});









	// GET PRESUPUESTO
	router.route('/presupuesto')
		.get((req, res) => {
			Servicio.findAll({
				include: [{
					model: Cliente,
					include: [
						{
							model: Vehiculo,
						},
						{
							model: Pedido,
						},
						{
							model: RegistroServicio,
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
				const presupuesto = Servicio.build({
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
				const itemPresupuesto = Cliente.build({
					presupuestoid: presupuestoId,
					CIDPRODUCTO: productoId,
				});

				itemPresupuesto
					.save()
					.then((newCliente) => {
						res.status(200).json(newCliente);
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
				const itemGanancia = Pedido.build({
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
					const itemCantidad = RegistroServicio.build({
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
