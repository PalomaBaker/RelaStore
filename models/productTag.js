const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ProductTag'
  }
);

ProductTag.associate = (models) => {
    // ProductTag belongs to Product
    ProductTag.belongsTo(models.Product, {
      foreignKey: 'product_id',
    });
  
    // ProductTag belongs to Tag
    ProductTag.belongsTo(models.Tag, {
      foreignKey: 'tag_id',
    });
  };
  
module.exports = ProductTag;
