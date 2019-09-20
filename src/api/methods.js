import express from 'express';

// export default (sequelize, Vehiculo) => {
export default (sequelize, User, Event, Assistant, Talk) => {
	const router = express.Router();

	router.route('/new-user')
		.post((req, res) => {
			const {
				email,
				password,
				type,
				name,
			} = req.body;
			User.findOne({ where: { email } })
			.then((userResponse) => {
				if (userResponse) {
					res.status(200).json(userResponse);
					return;
				}
				const user = User.build({
					email,
					password,
					type,
					name,
				});
				user.save()
				.then((result) => {
					res.status(200).json(result);
				})
				.catch((err) => {
					res.status(500).send(err);
				});
			})
		});

	router.route('/new-event')
		.post((req, res) => {
			const {
				topic,
				date,
				scheduleStart,
				scheduleEnd,
				address,
				diary,
				talks,
			} = req.body;
			const event = Event.build({
				topic,
				date,
				scheduleStart,
				scheduleEnd,
				address,
				diary,
				talks,
			});
			event.save()
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => {
				res.status(500).send(err);
			});
		});

	router.route('/events')
		.get((req, res) => {
			Event.findAll({
				where: {
					active: 1,
				},
			})
			.then((events) => {
				res.status(200).json(events);
			})
			.catch((err) => {
				res.status(500).send(err);
			});
		});

	router.route('/delete-event/:id')
		.patch((req, res) => {
			const { id } = req.params;

			Event.findByPk(id)
			.then((event) => {
				event.active = 0;
				event
				.save()
				.then(() => {
					res.status(200).json(event);
				})
				.catch((err) => {
					res.status(500).send(err);
				});
			});
		});

	router.route('/event/:id')
		.patch((req, res) => {
			const { id } = req.params;

			Event.findByPk(id)
			.then((event) => {
				for (const [key, value] of Object.entries(req.body)) {
					event[key] = value;
				}
				event
				.save()
				.then(() => {
					res.status(200).json(event);
				})
				.catch((err) => {
					res.status(500).send(err);
				});
			});
		});


		router.route('/assistants/:userId')
			.get((req, res) => {
				const { userId } = req.params;
				Assistant.findAll({
					where: {
						user: userId,
					},
				})
				.then((assistants) => {
					res.status(200).json(assistants);
				})
				.catch((err) => {
					res.status(500).send(err);
				});
			});

		router.route('/assistants')
			.post((req, res) => {
				const {
					user,
					event,
				} = req.body;
				const assistant = Assistant.build({
					user,
					event,
				});
				assistant.save()
				.then((result) => {
					res.status(200).json(result);
				})
				.catch((err) => {
					res.status(500).send(err);
				});
			});

		router.route('/talk')
			.post((req, res) => {
				const {
					user,
					userName,
					email,
					title,
					aboutTalk,
					aboutYou,
					twitter,
					linkedin,
					facebook,
				} = req.body;
				const talk = Talk.build({
					user,
					userName,
					email,
					title,
					aboutTalk,
					aboutYou,
					twitter,
					linkedin,
					facebook,
				});
				talk.save()
				.then((result) => {
					res.status(200).json(result);
				})
				.catch((err) => {
					res.status(500).send(err);
				});
			});

		router.route('/talks')
			.get((req, res) => {
				Talk.findAll()
				.then((talks) => {
					res.status(200).json(talks);
				})
				.catch((err) => {
					res.status(500).send(err);
				});
			})

		return router;
};
