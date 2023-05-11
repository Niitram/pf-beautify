const { Product, Client } = require("../../db");

const deleteFavorite = async (productId, clientId) => {
  const product = await Product.findByPk(productId);
  await product.removeClient(clientId);
  return product;
};

module.exports = deleteFavorite;
