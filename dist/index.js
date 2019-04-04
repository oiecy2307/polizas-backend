'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import rateLimit from 'express-rate-limit';
var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// //  apply to all requests
// app.use(limiter);

app.use((0, _helmet2.default)());

// logger
app.use((0, _morgan2.default)('dev'));

// 3rd party middleware
app.use((0, _cors2.default)({
  exposedHeaders: _config2.default.corsHeaders
}));

app.use(_bodyParser2.default.json({
  limit: _config2.default.bodyLimit
}));

app.use(_express2.default.static(__dirname + '/builds'));
app.use(_express2.default.static(__dirname + '/public'));
app.use(_express2.default.static(__dirname + '/css'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.server.listen(process.env.PORT || _config2.default.port, function () {
  console.log('Started on port ' + app.server.address().port);
});

app.get('/', function (req, res) {
  res.status(200).render(_path2.default.join(__dirname + '/public/index.html'));
});

app.get('/nuevo', function (req, res) {
  res.status(200).render(_path2.default.join(__dirname + '/public/nuevo.html'));
});

(0, _db2.default)(function (db) {
  // internal middleware
  app.use((0, _middleware2.default)({ config: _config2.default, db: db }));
  // api router
  app.use('/api', (0, _api2.default)({ config: _config2.default, db: db }));
});

exports.default = app;
//# sourceMappingURL=index.js.map