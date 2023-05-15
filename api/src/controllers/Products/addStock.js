const { Product, Category } = require("../../db");

const addStock = async (id, load) => {
  const product = await Product.findByPk(id, {
    include: { model: Category },
  });
  const newStock = product.stock + load;
  await product.update({ stock: newStock });

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

module.exports = addStock;
