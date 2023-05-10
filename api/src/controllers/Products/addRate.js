const { Product, Category } = require("../../db");

const addRate = async (productId, rate) => {
  const oldProduct = await Product.findByPk(productId);
  const oldRates = oldProduct.arrayRates;
  await Product.update(
    { arrayRates: [...oldRates, rate] },
    { where: { id: productId } }
  );
  const product = await Product.findByPk(productId, {
    include: { model: Category },
  });
  const newProduct = {
    id: product.id,
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

module.exports = addRate;
