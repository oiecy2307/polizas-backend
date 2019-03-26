import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import Sequelize from 'sequelize';
import path from 'path';

let app = express();
app.server = http.createServer(app);

app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
//  apply to all requests
app.use(limiter);

app.use(helmet());

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders,
}));

app.use(bodyParser.json({
	limit : config.bodyLimit,
}));

app.use(express.static(`${__dirname}/builds`));
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/css`));

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`);
  console.log(`${__dirname}/builds/home.min.js`);

});

console.log(`${__dirname}/public/index.html`);

app.get('/', (req, res) => {
  res.status(200).render(path.join(`${__dirname}/public/index.html`));
});

app.get('/a', (req, res) => {
  res.status(200).sendFile(path.join(`${__dirname}/builds/home.min.js`));
});

app.get('/get-databases', (req, res) => {
  const sequelize = new Sequelize('master', 'sa', '123', {
		host: 'localhost',
		dialect: 'mssql',
		operatorsAliases: false,
		port: 50827,

		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	});

	sequelize
  .authenticate()
  .then(() => {
    sequelize.query("select * from sys.databases WHERE name NOT IN ('master', 'tempdb', 'model', 'msdb', 'ADD_Catalogos') and name like 'ad_%';").spread((results) => {
      // Results will be an empty array and metadata will contain the number of affected rows.
      res.status(200).json(results);
      sequelize.close();
    });
  })
  .catch((err) => {
    res.status(500).send('Unable to connect to the database:', err);
  });
})

app.get('/connect/:database', (req, res) => {
  // connect to db
  initializeDb(req.params.database, (db) => {
    // internal middleware
    app.use(middleware({ config, db }));
    // api router
    app.use('/api', api({ config, db }));
  });
  res.status(200).send('Good');
});

export default app;
