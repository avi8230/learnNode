const Product = require('../models/product');
const ProductImages = require('../models/productimages');
const ProductCategory = require('../models/productCategories');
const Category = require('../models/category');
const sequelize = require('sequelize');
const getRandomRating = () => {
    return Math.floor(Math.random() * 5);
}

const search = async (request, response) => {
    let products = [];
    const searchTerm = request.query.q;
    if (searchTerm !== undefined) {
        // search is active
        products = await Product.findAll({
            where: {
                name: {
                    [sequelize.Op.like]: `%${searchTerm}%`
                },
            },
            include: [
                { model: ProductImages, required: false, attributes: ['url'] },
                {
                    model: ProductCategory,
                    required: false,
                    attributes: [],
                    include: [{
                        model: Category,
                        attributes: ['name']
                    }]
                }
            ],
            raw: true
        })

        products = products.map(p => {
            return { url: p['ProductImages.url'], ...p };
        });

    }
    response.render('products/search', { products, title: 'Search Products' });
}

const getProducts = (request, response) => {

    Product.findAll()
        .then(products => {
            const ratedProducts = products.map(p => {
                p.rating = getRandomRating();
                return p;
            })
            response.render('products/all', { products: ratedProducts });

        }).catch(err => {
            response.render('404');
        })


}

const singleProduct = async (request, response) => {
    const id = request.params.productId;
    const product = await Product.findOne({ where: { id: id }, raw: true });
    if (product) {
        response.render('products/single', product);
    } else {
        response.render('404');
    }

}

module.exports = {
    singleProduct,
    getProducts,
    search
}