const { Product, Category } = require("../../db");

const getProductById = async (id) => {
  const product = await Product.findByPk(id, { include: { model: Category } });

  const newProduct = {
    id,
    name: product.name,
    description: product.description,
    image: product.image,
    price: product.price,
    discount: product.discount,
    stock: product.stock,
    state: product.state,
    rate: product.finalRate,
    category: product.Category.name,
  };

  return newProduct;
};

module.exports = getProductById;
