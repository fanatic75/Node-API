/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cost_types', {
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      primaryKey:true,

    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
  
  }, {

    timestamps:false,

    freezeTableName:true,
    tableName: 'cost_types'
  });
};
