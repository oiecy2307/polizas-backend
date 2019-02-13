import express from 'express';

export default (sequelize, model) => {
	const router = express.Router();

	// GET ALL PRODUCTS
	router.route('/')
		.get((req, res) => {
      model.findAll()
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
		});

	// GET ONE USER
	router.route('/:id')
		.get((req, res) => {
		});

	// CREATE A NEW USE
	router.route('/')
		.post((req, res) => {

		});


	// DELETE AN USER
	router.route('/:id')
		.delete((req, res) => {

		});

	// UPDATE AN USER
	router.route('/:id')
		.patch((req, res) => {
		
		});

	return router;
};
