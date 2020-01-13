/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projects', {
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      primaryKey:true,

    },
    Title: {
      type: DataTypes.STRING(100),
     
      allowNull: true
    }
   
  }, { 
    freezeTableName:true,
      timestamps:false,
    tableName: 'projects'
  });
};
