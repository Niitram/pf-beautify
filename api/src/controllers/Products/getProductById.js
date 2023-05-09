const { Product } = require("../../db");

const getProductById = async (id) => {
  const product = await Product.findByPk(id);
  return product;
};

module.exports = getProductById;
