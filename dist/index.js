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

var _expressRateLimit = require('express-rate-limit');

var _expressRateLimit2 = _interopRequireDefault(_expressRateLimit);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
var limiter = (0, _expressRateLimit2.default)({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
//  apply to all requests
app.use(limiter);

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

app.server.listen(process.env.PORT || _config2.default.port, function () {
  console.log('Started on port ' + app.server.address().port);
  console.log(__dirname + '/builds/home.min.js');
});

app.get('/', function (req, res) {
  res.status(200).render(_path2.default.join(__dirname + '/public/index.html'));
});

app.get('/a', function (req, res) {
  res.status(200).sendFile(_path2.default.join(__dirname + '/builds/home.min.js'));
});

app.get('/get-databases', function (req, res) {
  var sequelize = new _sequelize2.default('master', 'sa', '123', {
    host: 'localhost',
    dialect: 'mssql',
    operatorsAliases: false,
    port: 50827,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

  sequelize.authenticate().then(function () {
    sequelize.query("select * from sys.databases WHERE name NOT IN ('master', 'tempdb', 'model', 'msdb', 'ADD_Catalogos') and name like 'ad_%';").spread(function (results) {
      // Results will be an empty array and metadata will contain the number of affected rows.
      res.status(200).json(results);
      sequelize.close();
    });
  }).catch(function (err) {
    res.status(500).send('Unable to connect to the database:', err);
  });
});

app.get('/connect/:database', function (req, res) {
  // connect to db
  (0, _db2.default)(req.params.database, function (db) {
    // internal middleware
    app.use((0, _middleware2.default)({ config: _config2.default, db: db }));
    // api router
    app.use('/api', (0, _api2.default)({ config: _config2.default, db: db }));
  });
  res.status(200).send('Good');
});

exports.default = app;
//# sourceMappingURL=index.js.map