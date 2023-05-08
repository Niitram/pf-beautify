const { Product } = require('../db.js');
const { Op } = require('sequelize');




const getProducts = async (req, res) => {
    try {
        const {name} = req.query;
        const product= name ? await Product.findAll({
            where: {
              name: {
                [Op.iLike]: `%${name}%`
              }
            }}):await Product.findAll()
        return res.status(200).send(product)
    } catch (error) {

    }
};
const createProducts = async (req, res) => {
    try {

    } catch (error) {

    }
};
const deleteProducts = async (req, res) => {
    try {

    } catch (error) {

    }
};
const updateProducts = async (req, res) => {
    try {

    } catch (error) {

    }
};
const getProductById = async (req, res) => {
    try {

    } catch (error) {

    }
};
const updateProductValues = async (req, res) => {
    try {

    } catch (error) {

    }
};

module.exports = {
    getProducts,
    createProducts,
    deleteProducts,
    updateProducts,
    getProductById,
    updateProductValues
}