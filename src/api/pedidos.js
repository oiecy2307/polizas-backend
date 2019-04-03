import express from 'express';

const nombresServicios = [
	'Balata delanteras',
	'Balata traseras',
	'Disco nuevo',
	'Tambor nuevo',
	'Bomba de frenos',
	'Cilindro de rueda',
	'Líquido',
	'Herrajes',
	'Rectificado disco',
	'Rectificado tambor',
	'Bujías',
	'Aceite',
	'Filtro gasolina',
	'Filtro aceite',
	'Filtro aire',
	'Presurisado',
	'CARBUCLINK',
	'ANTICONGELANTE',
	'Amortiguadores delanteros',
	'Amortiguadores traseros',
	'Base amortiguadores delanteros',
	'Base amortiguadores traseros',
	'Bieletas',
	'Terminales',
	'Rótula inferior',
	'Rótula superior',
	'Tornillo estabilizador delantero',
	'Tornillo estabilizador trasero',
	'Bujes superior',
	'Horquilla inferior',
	'Horquilla superior',
	'Goma barra estabilizadora',
	'Goma cremallera',
	'Buje inferior grande',
	'Buje inferior chico',
	'Maza',
	'Balero doble',
];

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

	router.route('/servicios-auto/:id')
		.get((req, res) => {
			const id = req.params.id;
			RegistroServicio.findAll({
				where: {
					idVehiculo: id,
				},
			})
			.then((servicios) => {
				servicios.reverse();
				const frenos = [];
				for (let i = 1; i <= 18; i++) {
					const freno = servicios.find((f) => f.idServicio === i);
					if (freno) {
						frenos.push({
							value: i,
							nombre: nombresServicios[i - 1],
							cantidad: freno.cantidad,
							noParte: freno.numeroParte,
							precio: freno.precio,
							manoObra: freno.manoObra,
							activado: true,
						});
					}
					else {
						frenos.push({
							value: i,
							nombre: nombresServicios[i - 1],
							cantidad: '',
							noParte: '',
							precio: '',
							manoObra: '',
							activado: false,
						});
					}
				}
				const suspensiones = [];
				for (let i = 19; i <= 37; i++) {
					const suspension = servicios.find((f) => f.idServicio === i);
					if (suspension) {
						suspensiones.push({
							value: i,
							nombre: nombresServicios[i - 1],
							cantidad: suspension.cantidad,
							noParte: suspension.numeroParte,
							precio: suspension.precio,
							manoObra: suspension.manoObra,
							activado: true,
						});
					}
					else {
						suspensiones.push({
							value: i,
							nombre: nombresServicios[i - 1],
							cantidad: '',
							noParte: '',
							precio: '',
							manoObra: '',
							activado: false,
						});
					}
				}
				res.status(200).send({
					frenos,
					suspensiones,
				});
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
				servicios,
				otros,
				cambioAceite,
				afinacion,
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
				.then(([vehiculo]) => {
					const registro = Pedido.build({
						idVehiculo: vehiculo.id,
						idCliente: cliente.id,
						fecha: new Date(),
						placa,
						manoObraTotal,
						factura,
						folio,
						total,
						otros,
						cambioAceite,
						afinacion,
					});
					registro.save().then(() => {
						RegistroServicio
						.bulkCreate(servicios
							.filter((servicio) => servicio.activado && servicio.cantidad && servicio.noParte && servicio.precio)
							.map((servicio) => ({
								idVehiculo: vehiculo.id,
								idServicio: servicio.value,
								idPedido: registro.id,
								numeroParte: servicio.noParte,
								manoObra: servicio.manoObra,
								precio: servicio.precio,
								cantidad: servicio.cantidad,
						})))
						.then((servicios) => {
							res.status(200).send({
								registro,
								servicios,
							});
						});
					});
				});
			})
			.catch((err) => {
        res.status(500).send(err);
      });
		});

		return router;
};
