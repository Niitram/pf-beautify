const { Category, Product } = require("../../db");

const postFavorite = async (clientId, productId) => {
  const product = await Product.findByPk(productId);
  product.addClient(clientId);

  const productCategory = await Category.findByPk(product.CategoryId);

  const finalProduct = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    discount: product.discount,
    category: productCategory.name,
    stock: product.stock,
    rate: product.finalRate,
    state: product.state,
  };
  return finalProduct;
};

module.exports = postFavorite;
