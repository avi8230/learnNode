const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');

const ProductImage = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  url: {
    type: DataTypes.STRING
  },
  productId: {
    type: DataTypes.INTEGER
  }
}, {
  // Other model options go here
});

module.exports = ProductImage;