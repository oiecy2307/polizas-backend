'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _pedidos = require('./pedidos');

var _pedidos2 = _interopRequireDefault(_pedidos);

var _initModels2 = require('../models/initModels');

var _initModels3 = _interopRequireDefault(_initModels2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	var _initModels = (0, _initModels3.default)(db),
	    vehiculoModel = _initModels.vehiculoModel,
	    servicioModel = _initModels.servicioModel,
	    clienteModel = _initModels.clienteModel,
	    pedidoModel = _initModels.pedidoModel,
	    registroServicioModel = _initModels.registroServicioModel;

	var pedidosApi = (0, _pedidos2.default)(db, vehiculoModel, servicioModel, clienteModel, pedidoModel, registroServicioModel);

	api.use('/', pedidosApi);

	// perhaps expose some API metadata at the root
	api.get('/', function (req, res) {
		res.json({ version: _package.version });
	});

	return api;
};
//# sourceMappingURL=index.js.map