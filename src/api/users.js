import express from 'express';
import { datastore } from '../lib/util';

export default () => {
	const userRouter = express.Router();
	userRouter.route('/')
		.get((req, res) => {
			const query = datastore
				.createQuery('User')
				.order('lastname');

			datastore
				.runQuery(query)
				.then((results) => {
					console.log('RESULTSSSSS', results);

					const users = results[0];
					console.log('users:');
					users.forEach((user) => {
						const userKey = user[datastore.KEY];
						console.log(userKey.id, user);
					});
					res.status(200).send(users);
				})
				.catch((err) => {
					console.log('ERROR', err);
					res.status(500).send(err);
				});
		});

	userRouter.route('/')
		.post((req, res) => {
			const { body } = req;
			if(!body.name || !body.lastname) res.status(200).send({ message: 'Data incomplete' });

			const kind = 'User';
			const userKey = datastore.key(kind);
			const newUser = {
				key: userKey,
				data: [
					{
						name: 'name',
						value: req.body.name,
					},
					{
						name: 'lastname',
						value: req.body.lastname,
					},
				],
			};

			datastore
				.save(newUser)
				.then((response) => {
					console.log('RESPONSE', response);
					console.log('SAVED', newUser);
					res.status(200).send(newUser);
				})
				.catch((err) => {
					console.log('ERROR', err);
					res.status(500).send(err);
				})

		})

	userRouter.route('/:id')
		.get((req, res) => {
			res.json({ message: req.params.id });
		});

	return userRouter;
}
