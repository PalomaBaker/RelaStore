const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Tag'
  }
);

Tag.associate = (models) => {
    // Tag belongs to many Product through ProductTag
    Tag.belongsToMany(models.Product, {
      through: models.ProductTag,
      foreignKey: 'tag_id',
    });
  };
  
module.exports = Tag;
