import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';
// import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import path from 'path';

let app = express();
app.server = http.createServer(app);

app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// //  apply to all requests
// app.use(limiter);

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

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

app.get('/', (req, res) => {
  res.status(200).render(path.join(`${__dirname}/public/index.html`));
});

app.get('/nuevo', (req, res) => {
  res.status(200).render(path.join(`${__dirname}/public/nuevo.html`));
});

initializeDb((db) => {
  // internal middleware
  app.use(middleware({ config, db }));
  // api router
  app.use('/api', api({ config, db }));
});

export default app;
