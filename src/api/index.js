import { version } from '../../package.json';
import { Router } from 'express';
import users from './users';
import products from './products';
import product from '../models/product';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/users', users({ config, db }));

	api.use('/productos', products(db, product(db)));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
};
