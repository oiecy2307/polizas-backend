'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _methods = require('./methods');

var _methods2 = _interopRequireDefault(_methods);

var _initModels2 = require('../models/initModels');

var _initModels3 = _interopRequireDefault(_initModels2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var db = _ref.db;

	var api = (0, _express.Router)();

	var _initModels = (0, _initModels3.default)(db),
	    userModel = _initModels.userModel,
	    eventModel = _initModels.eventModel,
	    assistanModel = _initModels.assistanModel,
	    talkModel = _initModels.talkModel;

	var methodsApi = (0, _methods2.default)(db, userModel, eventModel, assistanModel, talkModel);

	api.use('/', methodsApi);

	// perhaps expose some API metadata at the root
	api.get('/', function (req, res) {
		res.json({ version: _package.version });
	});

	return api;
};
//# sourceMappingURL=index.js.map