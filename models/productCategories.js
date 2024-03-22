const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const Category = require('./category')

const ProductCategories = sequelize.define('ProductCategories', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {

});

// One to Many
ProductCategories.belongsTo(Category, {
    foreignKey: 'id',
    targetKey: 'categoryId'
});

module.exports = ProductCategories;