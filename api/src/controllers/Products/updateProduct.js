const { Product, Category } = require("../../db");

const updateProduct = async (id, propertys) => {
  const product = await Product.findByPk(id);
  const updatedProduct = await product.update(propertys);

  if (propertys.category) {
    const [category, created] = await Category.findOrCreate({
      where: { name: propertys.category },
    });
    updatedProduct.setCategory(category.id);
  }

  const category = await Category.findByPk(updatedProduct.CategoryId);

  const finalProduct = {
    id,
    name: updatedProduct.name,
    rate: updatedProduct.finalRate,
    description: updatedProduct.description,
    image: updatedProduct.image,
    price: updatedProduct.price,
    discount: updatedProduct.discount,
    stock: updatedProduct.stock,
    category: category.name,
    state: updatedProduct.state,
  };
  return finalProduct;
};

module.exports = updateProduct;
