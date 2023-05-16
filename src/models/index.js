import user from './user';
import poliza from './poliza';
import inventario from './inventario';

export default (sequelize) => {
  const userModel = user(sequelize);
  const polizaModel = poliza(sequelize);
  const inventarioModel = inventario(sequelize);


  polizaModel.belongsTo(userModel);
  polizaModel.belongsTo(inventarioModel);
  //inventarioModel.hasOne(polizaModel);
  sequelize.sync();


  return {
    userModel,
    polizaModel,
    inventarioModel,
  };
}
