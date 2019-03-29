import { version } from '../../package.json';
import { Router } from 'express';
import pedidos from './pedidos';
import initModels from '../models/initModels';

export default ({ config, db }) => {
	let api = Router();
	const {
		vehiculoModel,
    servicioModel,
    clienteModel,
    pedidoModel,
    registroServicioModel,
	} = initModels(db);

	const pedidosApi = pedidos(
		db,
		vehiculoModel,
    servicioModel,
    clienteModel,
    pedidoModel,
    registroServicioModel
	);

	api.use('/pedidos', pedidosApi);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
};
