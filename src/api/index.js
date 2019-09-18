import { version } from '../../package.json';
import { Router } from 'express';
import methods from './methods';
import initModels from '../models/initModels';

export default ({ db }) => {
	let api = Router();
	const {
		userModel,
		eventModel,
		assistanModel,
		talkModel,
	} = initModels(db);

	const methodsApi = methods(
		db,
		userModel,
		eventModel,
		assistanModel,
		talkModel
	);

	api.use('/', methodsApi);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
};
