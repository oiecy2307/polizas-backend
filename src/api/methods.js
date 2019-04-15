import express from 'express';

// export default (sequelize, Vehiculo) => {
export default (sequelize) => {
	const router = express.Router();

	// Métodos get all
	// router.route('/vehiculos')
	// 	.get((req, res) => {
  //     Vehiculo.findAll()
  //     .then((products) => {
  //       res.status(200).json(products);
  //     })
  //     .catch((err) => {
  //       res.status(500).send(err);
  //     });
	// 	});

		return router;
};
