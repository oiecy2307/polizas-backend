import { Router } from 'express';
import jwt from 'jsonwebtoken';

export const adminPermission = (req, res, next) => {
	try {
		const Authorization = req.headers.authorization;
		if (!Authorization) {
			res.status(401).json({ error: true, message: 'Unauthorized' });
			return;
		}
		const token = Authorization.replace('Bearer ', '');

		const { /*userId, */role } = jwt.verify(token, 'temporal-oscar');
		if (role === 'admin') next();
		else res.status(401).json({ error: true, message: 'Unauthorized else' });
	} catch (e) {
		res.status(401).json({ error: true, message: 'Unauthorized cathc' });
	}
}

export default ({ config, db }) => {
	let routes = Router();

	// add middleware here

	return routes;
};
