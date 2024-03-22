const { DataTypes } = require('sequelize');
const ProductImage = require('../models/productimages');
const ProductCategories = require('./productCategories');
const sequelize = require('../utils/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true  // unique + index
    },
    name: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.TEXT
    },
    quantity: {
        type: DataTypes.INTEGER
    }
}, {

});

// One to Many
Product.hasMany(ProductImage, {
    foreignKey: 'productId'
});

// One to Many
Product.hasMany(ProductCategories, {
    foreignKey: 'productId'
});

module.exports = Product;