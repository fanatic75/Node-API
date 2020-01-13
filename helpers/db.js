const config = require("../config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.database, config.user, config.password, {
  operatorAliases:false,
  host: 'localhost',
  dialect: 'mysql',
});
   
   sequelize.authenticate()
   .then(()=>{
     console.log("connected to db successfully");

   })
   .catch((err)=>{
    console.error("Unable to connect to db "+ err);
   })

module.exports = sequelize;
