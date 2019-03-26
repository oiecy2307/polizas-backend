'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _presupuesto = require('./presupuesto');

var _presupuesto2 = _interopRequireDefault(_presupuesto);

var _initModels2 = require('../models/initModels');

var _initModels3 = _interopRequireDefault(_initModels2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	var _initModels = (0, _initModels3.default)(db),
	    presupuestoModel = _initModels.presupuestoModel,
	    productoModel = _initModels.productoModel,
	    itemPresupuestoModel = _initModels.itemPresupuestoModel,
	    itemGananciaEstimadaModel = _initModels.itemGananciaEstimadaModel,
	    itemCantidadEstimadaModel = _initModels.itemCantidadEstimadaModel;

	var presupuestoApi = (0, _presupuesto2.default)(db, productoModel, presupuestoModel, itemPresupuestoModel, itemGananciaEstimadaModel, itemCantidadEstimadaModel);

	// mount the facets resource
	api.use('/users', (0, _users2.default)({ config: config, db: db }));

	api.use('/productos', presupuestoApi);

	// perhaps expose some API metadata at the root
	api.get('/', function (req, res) {
		res.json({ version: _package.version });
	});

	return api;
};
//# sourceMappingURL=index.js.map