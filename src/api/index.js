import { version } from '../../package.json';
import { Router } from 'express';
import userMethods from './user';
import models from '../models';

export default ({ db }) => {
	let api = Router();
	const {
		userModel,
		ticketModel,
	} = models(db);

	// db.sync({ force: true });

	api.use('/users', userMethods(db, userModel));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
};
