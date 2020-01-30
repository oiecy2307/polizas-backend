import { version } from '../../package.json';
import { Router } from 'express';
import userMethods from './user';
import authMethods from './auth';
import models from '../models';
import { adminPermission } from '../middleware';

export default ({ db }) => {
	let api = Router();
	const {
		userModel,
		ticketModel,
	} = models(db);

	// TO SYNC MODELS WITH DATABASE
	// db.sync({ force: true });

	// MIDDLEWARES
	// api.all('/users/*', adminPermission)
	api.all('/users*', adminPermission)

	// METHODS
	api.use('/users', userMethods(db, userModel));
	api.use('/auth', authMethods(db, userModel));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
};
