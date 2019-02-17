import { version } from '../../package.json';
import { Router } from 'express';
import users from './users';
import presupuesto from './presupuesto';
import initModels from '../models/initModels';

export default ({ config, db }) => {
	let api = Router();
	const {
		presupuestoModel,
    productoModel,
    itemPresupuestoModel,
		itemGananciaEstimadaModel,
		itemCantidadEstimadaModel,
	} = initModels(db);

	const presupuestoApi = presupuesto(db, productoModel, presupuestoModel, itemPresupuestoModel, itemGananciaEstimadaModel, itemCantidadEstimadaModel);

	// mount the facets resource
	api.use('/users', users({ config, db }));

	api.use('/productos', presupuestoApi);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
};
