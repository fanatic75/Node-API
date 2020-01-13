/* jshint indent: 2 */  

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('costs', {
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      primaryKey:true,

    },
    Amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Cost_Type_ID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      references:{
        model:'cost_types',
        key:"ID"
      }
    },
    Project_ID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      references:{
        model:'projects',
        key:'ID'
      }
    }
  }, {

    timestamps:false,
    freezeTableName:true,
    tableName: 'costs'
  });
};
