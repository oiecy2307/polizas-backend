'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var nombresServicios = ['Balata delanteras', 'Balata traseras', 'Disco nuevo', 'Tambor nuevo', 'Bomba de frenos', 'Cilindro de rueda', 'Líquido', 'Herrajes', 'Rectificado disco', 'Rectificado tambor', 'Bujías', 'Aceite', 'Filtro gasolina', 'Filtro aceite', 'Filtro aire', 'Presurisado', 'CARBUCLINK', 'ANTICONGELANTE', 'Amortiguadores delanteros', 'Amortiguadores traseros', 'Base amortiguadores delanteros', 'Base amortiguadores traseros', 'Bieletas', 'Terminales', 'Rótula inferior', 'Rótula superior', 'Tornillo estabilizador delantero', 'Tornillo estabilizador trasero', 'Bujes superior', 'Horquilla inferior', 'Horquilla superior', 'Goma barra estabilizadora', 'Goma cremallera', 'Buje inferior grande', 'Buje inferior chico', 'Maza', 'Balero doble'];

exports.default = function (sequelize, Vehiculo, Servicio, Cliente, Pedido, RegistroServicio) {
	var router = _express2.default.Router();

	// Métodos get all
	router.route('/vehiculos').get(function (req, res) {
		Vehiculo.findAll().then(function (products) {
			res.status(200).json(products);
		}).catch(function (err) {
			res.status(500).send(err);
		});
	});

	router.route('/servicios').get(function (req, res) {
		Servicio.findAll().then(function (servicios) {
			res.status(200).json(servicios);
		}).catch(function (err) {
			res.status(500).send(err);
		});
	});

	router.route('/clientes').get(function (req, res) {
		Cliente.findAll().then(function (clientes) {
			res.status(200).json(clientes);
		}).catch(function (err) {
			res.status(500).send(err);
		});
	});

	router.route('/pedidos').get(function (req, res) {
		var _req$query = req.query,
		    skip = _req$query.skip,
		    filter = _req$query.filter,
		    value = _req$query.value;

		var pedido = {
			include: [{
				model: Vehiculo
			}, {
				model: Cliente
			}],
			limit: 20,
			order: [['fecha', 'DESC']]
		};
		if (skip) pedido.offset = parseInt(skip);
		if (filter && value) {
			if (filter === 'vehiculo') {
				pedido.include[0].where = {
					nombre: _defineProperty({}, sequelize.Op.like, '%' + value + '%')
				};
			} else if (filter === 'cliente') {
				pedido.include[1].where = _defineProperty({}, sequelize.Op.or, [{
					nombre: _defineProperty({}, sequelize.Op.like, '%' + value + '%')
				}, {
					telefono: _defineProperty({}, sequelize.Op.like, value + '%')
				}]);
			} else {
				pedido.where = _defineProperty({}, filter, _defineProperty({}, sequelize.Op.like, '%' + value + '%'));
			}
		}
		Pedido.findAndCountAll(pedido).then(function (response) {
			res.status(200).json({
				pedidos: response.rows,
				count: response.count
			});
		}).catch(function (err) {
			res.status(500).send(err);
		});
	});

	router.route('/registroservicios').get(function (req, res) {
		RegistroServicio.findAll().then(function (registros) {
			res.status(200).json(registros);
		}).catch(function (err) {
			res.status(500).send(err);
		});
	});

	router.route('/servicios-pedido/:id').get(function (req, res) {
		var id = req.params.id;
		RegistroServicio.findAll({
			where: {
				idPedido: id
			}
		}).then(function (servicios) {
			res.status(200).send(servicios);
		}).catch(function (err) {
			res.status(500).send(err);
		});
	});

	router.route('/servicios-auto/:id').get(function (req, res) {
		var id = req.params.id;
		RegistroServicio.findAll({
			where: {
				idVehiculo: id
			}
		}).then(function (servicios) {
			servicios.reverse();
			var frenos = [];

			var _loop = function _loop(i) {
				var freno = servicios.find(function (f) {
					return f.idServicio === i;
				});
				if (freno) {
					frenos.push({
						value: i,
						nombre: nombresServicios[i - 1],
						cantidad: freno.cantidad,
						noParte: freno.numeroParte,
						precio: freno.precio,
						manoObra: freno.manoObra,
						activado: true
					});
				} else {
					frenos.push({
						value: i,
						nombre: nombresServicios[i - 1],
						cantidad: '',
						noParte: '',
						precio: '',
						manoObra: '',
						activado: false
					});
				}
			};

			for (var i = 1; i <= 18; i++) {
				_loop(i);
			}
			var suspensiones = [];

			var _loop2 = function _loop2(i) {
				var suspension = servicios.find(function (f) {
					return f.idServicio === i;
				});
				if (suspension) {
					suspensiones.push({
						value: i,
						nombre: nombresServicios[i - 1],
						cantidad: suspension.cantidad,
						noParte: suspension.numeroParte,
						precio: suspension.precio,
						manoObra: suspension.manoObra,
						activado: true
					});
				} else {
					suspensiones.push({
						value: i,
						nombre: nombresServicios[i - 1],
						cantidad: '',
						noParte: '',
						precio: '',
						manoObra: '',
						activado: false
					});
				}
			};

			for (var i = 19; i <= 37; i++) {
				_loop2(i);
			}
			res.status(200).send({
				frenos: frenos,
				suspensiones: suspensiones
			});
		}).catch(function (err) {
			res.status(500).send(err);
		});
	});

	router.route('/nueva-orden').post(function (req, res) {
		var _req$body = req.body,
		    nombreCliente = _req$body.nombreCliente,
		    telefono = _req$body.telefono,
		    nombreVehiculo = _req$body.nombreVehiculo,
		    placa = _req$body.placa,
		    manoObraTotal = _req$body.manoObraTotal,
		    factura = _req$body.factura,
		    folio = _req$body.folio,
		    total = _req$body.total,
		    servicios = _req$body.servicios,
		    otros = _req$body.otros,
		    cambioAceite = _req$body.cambioAceite,
		    afinacion = _req$body.afinacion,
		    costoOtros = _req$body.costoOtros;

		Cliente.findOrCreate({
			where: {
				nombre: nombreCliente
			},
			defaults: {
				nombre: nombreCliente,
				telefono: telefono
			}
		}).then(function (_ref) {
			var _ref2 = _slicedToArray(_ref, 2),
			    cliente = _ref2[0],
			    clientCreated = _ref2[1];

			if (!clientCreated && cliente.dataValues.telefono !== telefono) {
				cliente.update({
					telefono: telefono
				});
			}
			Vehiculo.findOrCreate({
				where: {
					nombre: nombreVehiculo
				},
				defaults: {
					nombre: nombreVehiculo
				}
			}).then(function (_ref3) {
				var _ref4 = _slicedToArray(_ref3, 1),
				    vehiculo = _ref4[0];

				var registro = Pedido.build({
					idVehiculo: vehiculo.id,
					idCliente: cliente.id,
					fecha: new Date(),
					placa: placa,
					manoObraTotal: manoObraTotal,
					factura: factura,
					folio: folio,
					total: total,
					otros: otros,
					cambioAceite: cambioAceite,
					afinacion: afinacion,
					costoOtros: costoOtros
				});
				registro.save().then(function () {
					RegistroServicio.bulkCreate(servicios.filter(function (servicio) {
						return servicio.activado && servicio.cantidad && servicio.noParte && servicio.precio;
					}).map(function (servicio) {
						return {
							idVehiculo: vehiculo.id,
							idServicio: servicio.value,
							idPedido: registro.id,
							numeroParte: servicio.noParte,
							manoObra: servicio.manoObra,
							precio: servicio.precio,
							cantidad: servicio.cantidad
						};
					})).then(function (servicios) {
						res.status(200).send({
							registro: registro,
							servicios: servicios
						});
					});
				});
			});
		}).catch(function (err) {
			res.status(500).send(err);
		});
	});

	return router;
};
//# sourceMappingURL=pedidos.js.map