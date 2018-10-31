import express from 'express';
import { datastore } from '../lib/util';

export default () => {
	const userRouter = express.Router();

	// GET ALL USERS
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

	// GET ONE USER
	userRouter.route('/:id')
		.get((req, res) => {
			const userKey = datastore.key(['User', Number(req.params.id)]);
			const query = datastore
				.createQuery('User')
				.filter('__key__', '=', userKey)
				.limit(1);

				datastore
					.runQuery(query)
					.then((response) => {
						console.log('RESPONSEEEE', response);
						// The response is an array that contains in [0] the results and in [1] extra information
						const results = response[0];
						if (!results.length) res.status(412).send({ message: 'User not found' });
						const user = results[0];
						res.status(200).send(user);
					})
					.catch(err => {
						console.error('ERROR:', err);
						res.status(500).send(err);
					});
		});

	// CREATE A NEW USE
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

		});


	// DELETE AN USER
	userRouter.route('/:id')
		.delete((req, res) => {
			const transaction = datastore.transaction();
			const userKey = datastore.key(['User', Number(req.params.id)]);

			transaction
				.run()
				.then(() => transaction.delete(userKey))
				.then(() => {
					return transaction.commit();
				})
				.then((result) => {
					console.log('resultresultresult', result);
					res.status(200).send({ message: 'User deleted' });
				})
				.catch((e) => {
					console.log(e);
					res.status(500).send(e);
					transaction.rollback();
				});

		})

	// UPDATE AN USER
	userRouter.route('/:id')
		.patch((req, res) => {
			const { body } = req;
			if (!body.name) res.status(412).send({
				message: 'Incomplete data',
			});

			const transaction = datastore.transaction();
			const userKey = datastore.key(['User', Number(req.params.id)]);
			let finalUser = {};

			transaction
				.run()
				.then(() => transaction.get(userKey))
				.then((results) => {
					console.log('RESULTSSSS', results);
					const user = results[0];
					user.name = body.name;
					transaction.save({
						key: userKey,
						data: user,
					});
					finalUser = user;
					return transaction.commit();
				})
				.then((result) => {
					console.log('resultresultresult', result);
					res.status(200).send(finalUser);
				})
				.catch((e) => {
					console.log(e);
					res.status(500).send(e);
					transaction.rollback();
				});
		});

	return userRouter;
}
